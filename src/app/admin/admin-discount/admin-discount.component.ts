import { Component, OnInit } from '@angular/core';
import { percentage, deleteObject, ref, Storage, uploadBytesResumable } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getDownloadURL } from '@firebase/storage';
import { IDiscountResponce } from 'src/app/shared/interface/disount/discount';
import { DiscountService } from 'src/app/shared/services/disount/discount.service';

@Component({
  selector: 'app-admin-discount',
  templateUrl: './admin-discount.component.html',
  styleUrls: ['./admin-discount.component.scss']
})
export class AdminDiscountComponent implements OnInit {
  public adminDiscountStatus = true;

  public discountForm!: FormGroup;

  public description!: string;
  public imagePath!: string;

  public adminDiscounts!: IDiscountResponce[];
  private currentDiscountId = 0;
  public isUploaded = false;
  public editStatus = false;
  public editId!: number;

  public currentDate!: string;

  public uploadPercent!: number;

  constructor(
    private discountService: DiscountService,
    private fb: FormBuilder,
    private storage: Storage
  ) { }

  ngOnInit(): void {
    this.initDiscountsForm();
    this.loadDiscounts();
  }

  getDate() {
    let newDate = new Date;
    let mm = newDate.getMonth() + 1;
    let yy = newDate.getFullYear();
    if (mm < 10) {
      this.currentDate = `0${mm}.${yy}`;
    } else {
      this.currentDate = `${mm}.${yy}`;
    }
  }

  initDiscountsForm(): void {
    this.getDate();
    this.discountForm = this.fb.group({
      date: [this.currentDate],
      name: [null, Validators.required],
      header: [null, Validators.required],
      description: [null, Validators.required],
      imagePath: [this.imagePath, Validators.required]
    })
    console.log(this.imagePath);

  }

  loadDiscounts() {
    this.discountService.getAll().subscribe(data => {
      this.adminDiscounts = data
      console.log(data);
    })
  }

  addDiscount(): void {
    if (this.editStatus) {
      this.discountService.update(this.discountForm.value, this.currentDiscountId).subscribe(() => {
        this.loadDiscounts();
      })
    } else {
      this.discountService.create(this.discountForm.value).subscribe(() => {
        this.loadDiscounts();
      })
    }
    this.editStatus = false;
    this.discountForm.reset();
    this.isUploaded = false;
    this.uploadPercent = 0;
  }

  getDiscount(): void {
    this.discountService.getAll().subscribe(data => {
      this.adminDiscounts
    })
  }

  editDiscount(discount: IDiscountResponce): void {
    this.discountForm.patchValue({
      date: this.currentDate,
      name: discount.name,
      header: discount.header,
      description: discount.description,
      imagePath: discount.imagePath
    })
    this.editStatus = true;
    this.currentDiscountId = discount.id;
    this.isUploaded = true;
  }

  deleteDiscount(discount: IDiscountResponce): void {
    this.discountService.delete(discount.id).subscribe(() => {
      this.loadDiscounts();
    })
  }

  upload(event: any): void {
    const file = event.target.files[0];
    this.uploadFile('images', file.name, file)
      .then(data => {
        this.discountForm.patchValue({
          imagePath: data
        });
        console.log(data);

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
      this.discountForm.patchValue({
        imagePath: null
      })
    })
  }

  valueByControl(control: string): string {
    return this.discountForm.get(control)?.value;
  }

  changeStatus(): void {
    this.adminDiscountStatus = !this.adminDiscountStatus;
  }



}
