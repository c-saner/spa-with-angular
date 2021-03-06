import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneFormat'
})
export class PhoneFormatPipe implements PipeTransform {

  transform(value: string): any {
    const noFormat: string = value.replace(/ /g, '');
    return noFormat.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4');
  }

}
