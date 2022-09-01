import { Component, OnInit } from '@angular/core';
import { percentage, deleteObject, ref, Storage, uploadBytesResumable } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getDownloadURL } from '@firebase/storage';
import { ICategoryResponce } from 'src/app/shared/interface/category/category';
import { CategoryService } from 'src/app/shared/services/category/category.service';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent implements OnInit {
  public adminCategoryStatus = true;

  public categoryForm!: FormGroup;

  public description!: string;
  public imagePath!: string;

  public adminCategory!: ICategoryResponce[];
  private currentCategoryId = 0;
  public isUploaded = false;
  public editStatus = false;
  public editId!: number;

  public uploadPercent!: number;

  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private storage: Storage
  ) { }

  ngOnInit(): void {
    this.initCategoryForm();
    this.loadCategory();
  }


  initCategoryForm(): void {
    this.categoryForm = this.fb.group({
      id: [null],
      name: [null, Validators.required],
      path: [null, Validators.required],
      imagePath: [this.imagePath, Validators.required]
    })
  }

  loadCategory() {
    this.categoryService.getAll().subscribe(data => {
      this.adminCategory = data
      console.log(data);
    })
  }

  addCategory(): void {

    if (this.editStatus) {
      this.categoryService.update(this.categoryForm.value, this.currentCategoryId).subscribe(() => {
        this.loadCategory();
      })
    } else {
      this.categoryService.create(this.categoryForm.value).subscribe(() => {
        this.loadCategory();
      })
    }
    this.editStatus = false;
    this.categoryForm.reset();
    this.isUploaded = false;
    this.uploadPercent = 0;
  }

  getCategory(): void {
    this.categoryService.getAll().subscribe(data => {
      this.adminCategory
    })
  }

  editCategory(category: ICategoryResponce): void {
    this.categoryForm.patchValue({
      id: category.id,
      name: category.name,
      path: category.path,
      imagePath: category.imagePath
    })
    this.editStatus = true;
    this.currentCategoryId = category.id;
    this.isUploaded = true;
  }

  deleteCategory(category: ICategoryResponce): void {
    this.categoryService.delete(category.id).subscribe(() => {
      this.loadCategory();
    })
  }

  upload(event: any): void {
    const file = event.target.files[0];
    this.uploadFile('images', file.name, file)
      .then(data => {
        this.categoryForm.patchValue({
          imagePath: data
        });
        this.isUploaded = true;
      })
      .catch(err => {
        console.log(err);
      })
  }

  async uploadFile(folder: string, name: string, file: File | null): Promise<string> {
    const path = `${folder}/${name}`;
    let url = '';
    if (file) {
      try {
        const storageRef = ref(this.storage, path);
        const task = uploadBytesResumable(storageRef, file);
        percentage(task).subscribe(data => {
          this.uploadPercent = data.progress
        });
        await task;
        url = await getDownloadURL(storageRef);
      } catch (e: any) {
        console.log(e);
      }
    } else {
      console.log('wrong format');
    }
    return Promise.resolve(url)
  }

  deleteImage(): void {
    const task = ref(this.storage, this.valueByControl('imagePath'));
    deleteObject(task).then(() => {
      console.log('file deleted');
      this.isUploaded = false;
      this.uploadPercent = 0;
      this.categoryForm.patchValue({
        imagePath: null
      })
    })
  }

  valueByControl(control: string): string {
    return this.categoryForm.get(control)?.value;
  }

  changeStatus(): void {
    this.adminCategoryStatus = !this.adminCategoryStatus;
  }

}
