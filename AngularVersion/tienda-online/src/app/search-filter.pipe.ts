import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(items: any[], field:string, searchText: string): any[] {
    if (!items) return [];
    if(!searchText || searchText==="") return items;
    searchText = searchText.toLowerCase();
    return items.filter(it => {
      return it['nombre'].toLowerCase().includes(searchText);
    });
  }

}
