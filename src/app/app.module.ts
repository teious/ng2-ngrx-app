import { widgets } from './stores/widgets.store';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

import {items} from './stores/items.store';
import {selectedItem} from './stores/selectedItem.store';
import {selectedWidget} from './stores/selectedWidget.store';

import { AppComponent } from './app.component';
import { WidgetsComponent } from './components/widgets/widgets.component';
import { WidgetsListComponent } from './components/widgets/widgets-list/widgets-list.component';
import { WidgetDetailsComponent } from './components/widgets/widget-details/widget-details.component';
import { ItemsComponent } from './components/items/items.component';
import { ItemDetailsComponent } from './components/items/item-details/item-details.component';
import { ItemsListComponent } from './components/items/items-list/items-list.component';

import {GadgetService} from './services/gadget.service';
import { ItemsService } from './services/items.service';
import { WidgetsService } from './services/widgets.service';

@NgModule({
  declarations: [
    AppComponent,
    WidgetsComponent,
    WidgetsListComponent,
    WidgetDetailsComponent,
    ItemsComponent,
    ItemDetailsComponent,
    ItemsListComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot([
      {path: '',            component: ItemsComponent },
      {path: 'items',      component: ItemsComponent},
      {path: 'widgets',    component: WidgetsComponent},
      {path: '*',           component: ItemsComponent }
    ]),
    StoreModule.forRoot({
      items: items,
      selectedItem: selectedItem,
      selectedWidget: selectedWidget,
      widgets: widgets
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    })
  ],
  providers: [
    GadgetService,
    ItemsService,
    WidgetsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
