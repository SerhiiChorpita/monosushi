import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ImageService } from 'src/app/shared/image/image.service';
import { ICategoryResponse } from 'src/app/shared/interface/category/category';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { IProductResponse } from '../../shared/interface/products/products'
import { ProductService } from '../../shared/services/product/product.service'

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent implements OnInit {
  public productStorage: Array<IProductResponse> = [];
  public adminCategories: Array<ICategoryResponse> = [];

  public productForm!: FormGroup;
  public currentProductId!: number | string;

  public isUploaded = false;
  public uploadPercent = 0;

  public editStatus = false;

  public isOpen = false;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private productService: ProductService,
    private imageService: ImageService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.initProductForm();
    this.loadCategories();
    this.loadProduct();
  }

  initProductForm(): void {
    this.productForm = this.fb.group({
      category: [null, Validators.required],
      path: [null, Validators.required],
      name: [null, Validators.required],
      ingredients: [null, Validators.required],
      weight: [null, Validators.required],
      price: [null, Validators.required],
      imagePath: [null, Validators.required],
      count: [1]
    })
  }

  loadCategories() {
    this.categoryService.getAllFirebase().subscribe(data => {
      this.adminCategories = data as ICategoryResponse[],
        this.productForm.patchValue({
          category: this.adminCategories[0].id
        })
    })
  }

  loadProduct() {
    this.productService.getAllFirebase().subscribe(data => {
      this.productStorage = data as IProductResponse[];
    })
  }

  addProduct(): void {
    if (this.editStatus) {
      this.productService.updateFirebase(this.productForm.value, this.currentProductId as string).then(() => {
        this.loadProduct();
        this.isOpen = false;
        this.editStatus = false;
        this.toastr.success('Product successfully updated')
      })
    } else {
      this.productService.createFirebase(this.productForm.value).then(() => {
        this.loadProduct();
        this.isOpen = false;
        this.editStatus = false;
        this.toastr.success('Product successfully created')
      })
    }
  }

  editProduct(product: IProductResponse): void {
    this.productForm.patchValue({
      category: product.category,
      path: product.category.path,
      name: product.name,
      ingredients: product.ingredients,
      weight: product.weight,
      price: product.price,
      imagePath: product.imagePath,
    })
    this.isOpen = true;
    this.editStatus = true;
    this.isUploaded = true;
    this.currentProductId = product.id;
  }

  deleteProduct(product: IProductResponse): void {
    this.productService.deleteFirebase(product.id as string).then(() => {
      this.loadProduct();
      this.toastr.success('Product successfully deleted');
    })
  }

  upload(event: any): void {
    const file = event.target.files[0];
    this.imageService.uploadFile('images', file.name, file)
      .then(data => {
        this.productForm.patchValue({
          imagePath: data
        })
        this.isUploaded = true
      })
      .catch(e => console.log(e))
  }

  deleteImage(): void {
    this.imageService.deleteUploadFile(this.valueByControl('imagePath'))
      .then(() => {
        this.isUploaded = false;
        this.uploadPercent = 0;
        this.productForm.patchValue({
          imagePath: null
        })
      })
      .catch(e => console.log(e))
  }

  toggleOpenForm(): void {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.initProductForm()
    }

  }

  valueByControl(control: string): string {
    return this.productForm.get(control)?.value;
  }
}
