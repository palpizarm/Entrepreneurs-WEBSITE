import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';
import { RegisterService } from 'src/app/services/register.service';

declare var $: any;

@Component({
  selector: 'app-sigin-seller',
  templateUrl: './sigin-seller.component.html',
  styleUrls: ['./sigin-seller.component.css']
})
export class SiginSellerComponent implements OnInit {
  customer = {
    name: '',
    password1: '',
    password2: '',
    phone: '',
    id: '',
    mail: '',
    state: '',
    city: '',
    direction: '',
    shopName: '',
    shopDescription: ''
  }
  errorLogin: boolean = false;
  msgError: string = '';
  loading: boolean = false;
  successMsg: string = '';

  /* Images */
  fileToUploadU: File = null;
  fileToUploadE: File = null;
  public imagePath;
  imgURL: any;
  imgURLE: any;
  public message: string;

  constructor(private registerService: RegisterService, private imageService: ImageService) { }

  ngOnInit(): void {
  }

  register(registerForm) {
    event.preventDefault();
    if (registerForm.invalid) {
      Object.values(registerForm.controls).forEach((control: any) => {
        control.markAsTouched();

      })
      return;
    }
    this.loading = true;
    if (this.imgURL != '' && this.imgURLE != '') {
      var form = new FormData();
      form.append("file", this.fileToUploadU, this.fileToUploadU.name);
      var settings = {
        "url": "http://localhost:9001/uploads",
        "method": "POST",
        "timeout": 0,
        "processData": false,
        "mimeType": "multipart/form-data",
        "contentType": false,
        "data": form
      };

      $.ajax(settings).then((user) => {
        user = JSON.parse(user);
        console.log(user);
        var form = new FormData();
        form.append("file", this.fileToUploadE, this.fileToUploadE.name);
        var settings = {
          "url": "http://localhost:9001/uploads",
          "method": "POST",
          "timeout": 0,
          "processData": false,
          "mimeType": "multipart/form-data",
          "contentType": false,
          "data": form
        };
        $.ajax(settings).then((shop) => {
          shop = JSON.parse(shop);
          console.log(shop);
          this.registerService.registerSeller(registerForm.value, user.data, shop.data)
            .subscribe((data: any) => {
              if (data.code > 0) {
                this.successMsg = data.msg;
                document.getElementById("BtnOpen").click();
                this.loading = false;
              } else {
                this.msgError = data.msg;
                this.errorLogin = true;
                console.log(data);
              }
            }, (errorSevice) => {
              console.log(errorSevice);
              this.loading = false;
            })
        }).catch((err) => {
          console.log(err);
          this.loading = false;
        });
        this.loading = false;
      }).catch((err) => {
        console.log(err);
        this.loading = false;
      })
    }
  }

  loadImage(files) {
        this.fileToUploadU = files.item(0);
        this.preview(files, 1);
      }


  uploadFileToActivity(fileToUpload) {
        this.imageService.postImage(fileToUpload)
          .subscribe(data => {
            // do something, if upload success
          }, (error) => {
            console.log(error);
          });
      }

  preview(files, opt) {
        if(files.length === 0)
      return;

      var mimeType = files.item(0).type;
      if (mimeType.match(/image\/*/) == null) {
        this.message = "Por favor seleccione una imgaen";
        return;
      }

      var reader = new FileReader();
      this.imagePath = files;
      reader.readAsDataURL(files[0]);
      reader.onload = (_event) => {
        if (opt == 1) {
          this.imgURL = reader.result;
        } else {
          this.imgURLE = reader.result;
        }
      }
    }

    loadImageE(files) {
      this.fileToUploadE = files.item(0);
      this.preview(files, 2);
    }

  }
