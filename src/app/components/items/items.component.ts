import { Item } from './../../models/item.model';
import { Observable } from 'rxjs/Observable';
import { Gadget } from './../../models/gadget.model';
import { ItemsService } from './../../services/items.service';
import { Store } from '@ngrx/store';
import { AppStore } from './../../models/appstore.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  items: Observable<Array<Item>>;
  selectedItem: Observable<Item>;
  gadget: Observable<Gadget>;

  constructor(
    private itemsService: ItemsService,
    private store: Store<AppStore>
  ) {}
  ngOnInit() {
    this.items = this.itemsService.items;
    this.selectedItem = this.store.select(state => state.selectedItem);
    this.selectedItem.subscribe(v => console.log(v));

    this.itemsService.loadItems();
  }

  resetItem() {
    const emptyItem: Item = { id: null, name: '', description: '' };
    this.store.dispatch({ type: 'SELECT_ITEM', payload: emptyItem });
  }

  selectItem(item: Item) {
    this.store.dispatch({ type: 'SELECT_ITEM', payload: item });
  }

  saveItem(item: Item) {
    this.itemsService.saveItem(item);

    // Generally, we would want to wait for the result of `itemsService.saveItem`
    // before resetting the current item.
    this.resetItem();
  }

  deleteItem(item: Item) {
    this.itemsService.deleteItem(item);

    // Generally, we would want to wait for the result of `itemsService.deleteItem`
    // before resetting the current item.
    this.resetItem();
  }
}
