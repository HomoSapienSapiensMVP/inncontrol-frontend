import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-search-content',
  templateUrl: './search-content.component.html',
  styleUrl: './search-content.component.css'
})
export class SearchContentComponent {

  searchController: FormControl;

  constructor() {
    this.searchController = new FormControl('');
  }

  @Input() options:{title: string}[] | undefined;
  @Output() search = new EventEmitter<string>();
  @Output() optionSelected = new EventEmitter<any>();


  onSearch() {
    const value = this.searchController.value;
    console.log('Searching for: ', value);
    this.search.emit(value);
  }

  onSelect(title: string){
    // @ts-ignore
    const value = title;
    console.log('Option selected: ', value);
    this.optionSelected.emit(value);
  }




}
