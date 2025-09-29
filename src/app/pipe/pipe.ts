import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'negrito'
})
export class NegritoPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    // Converte \n em <br> e *palavra* em <strong>palavra</strong>
    return value
      .replace(/\n/g, '<br>')
      .replace(/\*(.*?)\*/g, '<strong>$1</strong>');
  }
}
