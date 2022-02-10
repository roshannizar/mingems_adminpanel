import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PurchaseModel } from 'app/modules/purchase-management/model/purchase-model';
import { ToastrService } from 'ngx-toastr';
import { SearchModel } from '../../models/search-model';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search-view',
  templateUrl: './search-view.component.html',
  styleUrls: ['./search-view.component.css']
})
export class SearchViewComponent implements OnInit {

  isBlock = false;
  isSearch = false;

  searchGroup: FormGroup;

  name: string;
  weight: string;
  barcode: string;
  unitPrice: string;
  measurement: string;
  investorName: string;
  investorRefId: string;

  searchModel = new SearchModel();

  purchases = new Array<PurchaseModel>();

  constructor(private fb: FormBuilder, private toastr: ToastrService, private searchService: SearchService) { }

  ngOnInit(): void {
  }

  showFilter() {
    if (this.isSearch) {
      this.isSearch = false;
    } else {
      this.isSearch = true;
    }
  }

  getPurchases() {
    this.isBlock = true;
    this.purchases = null;
    this.searchModel
    .setValue(this.name, this.weight, this.barcode, this.unitPrice, this.measurement, this.investorName, this.investorRefId);
    this.searchService.getSearchInventories(this.searchModel).subscribe(
      (result) => {
        this.purchases = result;
        this.isBlock = false;
      },
      (error) => {
        this.isBlock = false;
        this.toastr.error(error.message, 'Failed to load search query');
      }
    );
  }
}
