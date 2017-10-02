import { Item } from './../../../models/item.model';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {
  originalName: string;
  selectedItem: Item;
  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();

  @Input()
  set item(value: Item) {
    if (value) {
      this.originalName = value.name;
    }
    this.selectedItem = Object.assign({}, value);
  }

  constructor() {}

  ngOnInit() {}
}
