import { Component, Input, OnInit } from '@angular/core';
import { SliderModel } from '../../models/slider-model';

@Component({
  selector: 'app-slider-view-dlg',
  templateUrl: './slider-view-dlg.component.html',
  styleUrls: ['./slider-view-dlg.component.css']
})
export class SliderViewDlgComponent implements OnInit {

  @Input() slider: SliderModel;
  constructor() { }

  ngOnInit(): void {
  }

}
