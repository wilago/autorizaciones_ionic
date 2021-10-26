import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment.prod';


const URL = environment.imgPath;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string): string {
    if (!img) {
      return './assets/no-imagen.jpg';
    }
    const imgUrl = `${ URL }/${ img }`;
    return imgUrl;
  }

}
