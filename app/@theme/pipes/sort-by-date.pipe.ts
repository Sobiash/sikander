import {Pipe, PipeTransform} from '@angular/core';
import {Parcel} from '../../models/Parcel';

@Pipe({
    name: 'ngxSortByDate',
})
export class SortByDatePipe implements PipeTransform {
    transform(value: Parcel[]): Parcel[] {
        return value.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());
    }
}
