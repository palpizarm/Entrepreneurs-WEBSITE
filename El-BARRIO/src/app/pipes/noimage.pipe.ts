import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noimage'
})
export class NoimagePipe implements PipeTransform {

  // spotify returns an url array list
  transform(image: string): string {
    if (image == '') {
      return 'assets/img/no-image-found.png';
    } else {
      return image;
    }
  }
}