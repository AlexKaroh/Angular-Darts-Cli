import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stepCounter',
})
export class StepCounterPipe implements PipeTransform {
  transform(value: number): number {
    return value + 1;
  }
}
