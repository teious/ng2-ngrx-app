import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';


import { AppStore } from '../models/appstore.model';
import { Gadget } from '../models/gadget.model';
import { Item } from '../models/item.model';
import { Widget } from '../models/widget.model';
import 'rxjs/add/observable/combineLatest';

@Injectable()
export class GadgetService {
  gadget: Observable<Gadget>;
  items: Observable<Array<Item>>;
  widgets: Observable<Array<Widget>>;

  constructor(private store: Store<AppStore>) {
    this.gadget = Observable.combineLatest(
      store.select('items'),
      store.select('widgets'),
      (items: Item[] = [], widgets: Widget[] = []) => {
        return {
          items: [...items],
          widgets: [...widgets]
        };
      }
    );

    this.gadget.subscribe(c => console.log('GadgetService.gadget', c));
  }
}
