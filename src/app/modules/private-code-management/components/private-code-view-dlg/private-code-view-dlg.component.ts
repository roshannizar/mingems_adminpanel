import { Component, Input, OnInit } from '@angular/core';
import { PrivateCodeModel } from '../../models/private-code-model';

@Component({
  selector: 'app-private-code-view-dlg',
  templateUrl: './private-code-view-dlg.component.html',
  styleUrls: ['./private-code-view-dlg.component.css']
})
export class PrivateCodeViewDlgComponent implements OnInit {

  @Input() privateCode = new PrivateCodeModel();
  
  constructor() { }

  ngOnInit(): void {

  }
}
