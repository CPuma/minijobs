import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'upperCaseCustom'
})
export class UpperCaseCustomPipe implements PipeTransform {

  transform(value: object | string): object | any {
		if (typeof value === 'object') {
			Object.keys(value).forEach((k) => {
				if (typeof value[k] == 'string') {
					console.log('string', value[k]);
					value[k] = value[k].toUpperCase();
				}
			});
		} else {
			value = value.toUpperCase();
		}

		return value;
	}

}
