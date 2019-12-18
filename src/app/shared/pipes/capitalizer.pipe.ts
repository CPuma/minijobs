import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizer'
})
export class CapitalizerPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return null;
  }

}
