import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) { }


  postImage(fileToUpload: File) {
    const url = 'http://localhost:9001/uploads';
    const formData: FormData = new FormData();
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    formData.append('file', fileToUpload, fileToUpload.name);
    console.log(formData);
    return this.http.post(url, formData, {headers:headers});
  }

}
