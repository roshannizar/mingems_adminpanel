import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-ui',
  templateUrl: './loading-ui.component.html',
  styleUrls: ['./loading-ui.component.css']
})
export class LoadingUiComponent implements OnInit {

  @Input() block = false;
  constructor() { }

  ngOnInit(): void {
  }

}
