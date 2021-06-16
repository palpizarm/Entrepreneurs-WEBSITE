import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/services/home.service';
import { ImageService } from 'src/app/services/image.service';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  loading: boolean = false;
  item: any = {
    name: '',
    description: '',
    precio: '',
    category: '',
    image: ''
  };
  fileToUpload: File = null;
  public imagePath;
  imgURL: any;
  public message: string;
  categories: any[] = [];

  constructor(private itemService: ItemsService, private imageService: ImageService, private categoryService: HomeService, private router:Router) {
    this.categoryService.getAllCategories()
    .subscribe((data: any) => {
      if (data.code > 0) {
        this.categories = data.data;
      }
    }, error => {
      console.log(error);
    })
  }

  ngOnInit(): void {
  }

  registerItem(itemForm) {
    if (itemForm.invalid) {
      Object.values(itemForm.controls).forEach((control: any) => {
        control.markAsTouched();
      })
      return;
    }
    let id_shop = (JSON.parse(localStorage.getItem('session'))).id_shop;
    this.itemService.registerItem(this.item.category,id_shop,itemForm.value.name,itemForm.value.description,itemForm.value.price,'')
      .subscribe((data:any) => {
        if (data.code > 0) {
          this.router.navigate(['/profileInformation']);
        }
      }, (error) => {
        console.log(error);
      })
  }

  loadImage(files) {
    this.fileToUpload = files.item(0);
    this.preview(files);
    console.log(this.fileToUpload);
  }


  uploadFileToActivity() {
    this.imageService.postImage(this.fileToUpload)
      .subscribe(data => {
        // do something, if upload success
      }, (error) => {
        console.log(error);
      });
  }

  preview(files) {
    if (files.length === 0)
      return;

    var mimeType = files.item(0).type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }

}
