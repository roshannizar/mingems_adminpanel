import { Component, Input, OnInit } from '@angular/core';
import { CategoryModel } from 'app/modules/category-management/models/category-model';

@Component({
  selector: 'app-category-view-dlg',
  templateUrl: './category-view-dlg.component.html',
  styleUrls: ['./category-view-dlg.component.css']
})
export class CategoryViewDlgComponent implements OnInit {

  @Input() category: CategoryModel;

  constructor() { }

  ngOnInit(): void {
  }
}
