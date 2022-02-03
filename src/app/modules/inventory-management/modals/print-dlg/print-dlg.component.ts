import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { InventoryModel } from '../../models/inventory-model';
import { InventoryService } from '../../services/inventory.service';
@Component({
  selector: 'app-print-dlg',
  templateUrl: './print-dlg.component.html',
  styleUrls: ['./print-dlg.component.css']
})
export class PrintDlgComponent implements OnInit {

  pageNo = false;
  isBlock = false;

  inventory = new InventoryModel();

  constructor(public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: string,
    private inventoryService: InventoryService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getInventoryPurchaseId(this.data);
  }

  getInventoryPurchaseId(id: string) {
    this.isBlock = true;
    this.inventoryService.getInventoryPurchase(id).subscribe(
      (result) => {
        this.inventory = result;
        this.isBlock = false;
      },
      (error) => {
        this.isBlock = false;
        this.toastr.error(error.message, 'Failed to load print dialog');
      }
    );
  }

  movePage() {
    if (this.pageNo) {
      this.pageNo = false;
    } else {
      this.pageNo = true;
    }
  }

  close() {
    this.dialogRef.close();
  }

  print() {
    if (this.pageNo) {
      const printContents = document.getElementById('page-two').innerHTML;
      const popupWin = window.open('', '_blank', 'width=300,height=300');
      popupWin.document.open();
      popupWin.document.write(
        '<html><head></head><body onload="window.print()">' + printContents + '</body></html>');
      popupWin.document.close();
    } else {
      const printContents = document.getElementById('page-one').innerHTML;
      const popupWin = window.open('', '_blank', 'width=300,height=300');
      popupWin.document.open();
      popupWin.document.write(
        '<html><head></head><body onload="window.print()">' + printContents + '</body></html>');
      popupWin.document.close();
    }
  }
}
