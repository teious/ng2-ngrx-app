import { Observable } from 'rxjs/Observable';
import { AppStore } from './../models/appstore.model';
import { Store } from '@ngrx/store';
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Widget } from '../models/widget.model';

const BASE_URL = 'http://localhost:3000/widgets/';
const HEADER = { headers: new Headers({ 'Content-Type': 'application/json' }) };

@Injectable()
export class WidgetsService {
  widgets: Observable<Widget[]>;

  constructor(private http: Http, private store: Store<AppStore>) {
    this.widgets = store.select(state => state.widgets);
  }

  loadWidgets() {
    return this.http
      .get(BASE_URL)
      .map(res => res.json())
      .map(payload => ({ type: 'LOAD_WIDGETS', payload}))
      .subscribe(action => this.store.dispatch(action));
  }
  saveWidget(widget: Widget) {
    widget.id ? this.update(widget) : this.add(widget);
  }
  add(widget: Widget) {
    return this.http
      .post(`${BASE_URL}`, JSON.stringify(widget), HEADER)
      .map(res => res.json())
      .map(payload => ({type: 'CREATE_WIDGET', payload}))
      .subscribe(action => this.store.dispatch(action));
  }

  remove(widget: Widget) {
    return this.http
      .delete(`${BASE_URL}${widget.id}`)
      .subscribe(action =>
         this.store.dispatch({type: 'DELETE_WIDGET', payload: widget })
      );
  }

  update(widget: Widget) {
    return this.http
      .put(`${BASE_URL}${widget.id}`, JSON.stringify(widget), HEADER)
      .subscribe(action =>
        this.store.dispatch({ type: 'UPDATE_WIDGET', payload: widget})
      );
  }

}
