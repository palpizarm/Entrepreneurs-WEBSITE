import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noimage'
})
export class NoimagePipe implements PipeTransform {

  // spotify returns an url array list
  transform(images: any): string {
    if (!images) {
      return 'assets/img/no-image-found.png';
    }
    if (images) {
      return images.url;
    } else {
      return 'assets/img/no-image-found.png';
    }
  }
}