import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Widget } from './../../../models/widget.model';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-widget-details',
  templateUrl: './widget-details.component.html',
  styleUrls: ['./widget-details.component.css']
})
export class WidgetDetailsComponent implements OnInit {
  originalName: string;
  selectedWidget: Widget;
  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();
  widgetForm: FormGroup;

  @Input()
  set widget(value: Widget) {
    if (value) {
      this.originalName = value.name;
    }
    this.selectedWidget = Object.assign({}, value);
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.widgetForm = this.fb.group({
      widgetName: [this.selectedWidget.name, Validators.required],
      widgetPrice: [this.selectedWidget.price, Validators.required]
    });
  }
}
