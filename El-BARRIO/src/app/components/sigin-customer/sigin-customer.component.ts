import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImageService } from 'src/app/services/image.service';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-sigin-customer',
  templateUrl: './sigin-customer.component.html',
  styleUrls: ['./sigin-customer.component.css']
})
export class SiginCustomerComponent implements OnInit {

  customer = {
    name: 'Juan Sequiera',
    password1: '1234',
    password2: '1234',
    phone: '54847842',
    id: '11235478',
    mail: 'juan@gmail.com',
    state: 'San Jose',
    city: 'Perez Zeledón',
    direction: '200 m n de la pulperia El pueblo',
    image:''
  }
  loading: boolean = false;
  msgError: string = '';
  errorLogin: boolean = false;
  fileToUpload: File = null;
  public imagePath;
  imgURL: any;
  public message: string;


  constructor(private registerService: RegisterService, private router : Router, private imageService : ImageService) { }

  ngOnInit(): void {
  }

  registerCustomer(registerForm) {
    event.preventDefault();
    if (registerForm.invalid) {
      Object.values(registerForm.controls).forEach((control: any) => {
        control.markAsTouched();

      })
      return;
    }
    this.loading = true;
    if (this.imgURL != '') {
      this.imageService.postImage(this.fileToUpload)
      .subscribe((data:any) => {
        this.customer.image = data.data;
        this.registerService.registerCustomer(registerForm.value)
        .subscribe((data: any) => {
          if (data.code > 0) {
            console.log(data);
            let user = data.data[0];
            localStorage.setItem('user-session', JSON.stringify(user));
            this.router.navigate(['/home']);
          } else {
            this.loading = false;
            this.msgError = data.msg;
            this.errorLogin = true;
          }
        }, (errorService) => {
          console.log(errorService)
        }); 
      })
    } else {
      this.registerService.registerCustomer(registerForm.value)
      .subscribe((data: any) => {
        if (data.code > 0) {
          console.log(data);
          let user = data.data[0];
          localStorage.setItem('user-session', JSON.stringify(user));
          this.router.navigate(['/home']);
        } else {
          this.loading = false;
          this.msgError = data.msg;
          this.errorLogin = true;
        }
      }, (errorService) => {
        console.log(errorService)
      });
    }

    this.loading = false;
  }


  loadImage(files) {
    this.fileToUpload = files.item(0);
    this.preview(files);
    console.log(this.fileToUpload);
  }
 
  preview(files) {
    if (files.length === 0)
      return;
 
    var mimeType = files.item(0).type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Pro favor seleccione una imgaen";
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
