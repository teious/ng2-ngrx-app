import { Store } from '@ngrx/store';
import { AppStore } from './../../models/appstore.model';
import { WidgetsService } from './../../services/widgets.service';
import { Widget } from './../../models/widget.model';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.css']
})
export class WidgetsComponent implements OnInit {
  widgets: Observable<Widget[]>;
  selectedWidget: Observable<Widget>;

  constructor(
    private _widgetsService: WidgetsService,
    private _store: Store<AppStore>
  ) {}

  ngOnInit() {
    this.selectedWidget = this._store.select(state => state.selectedWidget);

    this.widgets = this._widgetsService.widgets;

    this._widgetsService.loadWidgets();
  }
  selectWidget(widget) {
    this._store.dispatch({ type: 'SELECT_WIDGET', payload: widget });
  }
  saveWidget(widget) {
    console.log('widget', widget);
    this._widgetsService.add(widget);
  }

  deleteWidget(widget: Widget) {
    this._widgetsService.remove(widget);

    // Generally, we would want to wait for the result of `itemsService.deleteItem`
    // before resetting the current item.
    this.resetWidget();
  }

  resetWidget() {
    const emptyWidget: Widget = { id: null, name: '', price: 0 };
    this._store.dispatch({ type: 'SELECT_WIDGET', payload: emptyWidget });
  }
}
