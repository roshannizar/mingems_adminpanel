import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PurchaseModel } from '../../model/purchase-model';
import { PurchaseService } from '../../services/purchase.service';

@Component({
  selector: 'app-purchase-delete',
  templateUrl: './purchase-delete.component.html',
  styleUrls: ['./purchase-delete.component.css']
})
export class PurchaseDeleteComponent implements OnInit {

  isBlock = false;
  name: string;

  @Input() purchase: PurchaseModel;
  @Output() deleted = new EventEmitter();

  constructor(private purchaseService: PurchaseService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.name = this.purchase.name;
  }

  confirmDelete(id: string) {
    this.isBlock = true;
    this.purchaseService.deletePurchase(id).subscribe(
      (result) => {
        this.isBlock = false;
        this.deleted.emit();
        this.toastr.success('Deleted successfully!');
      },
      (error) => {
        this.isBlock = false;
        this.toastr.error(error.message, `Failed to delete ${id}`);
      }
    );
  }
}
