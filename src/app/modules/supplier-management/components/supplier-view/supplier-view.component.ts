import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { SupplierModel } from '../../models/supplier-model';
import { SupplierService } from '../../services/supplier.service';
import { SupplierCreateComponent } from '../supplier-create/supplier-create.component';
import { SupplierUpdateComponent } from '../supplier-update/supplier-update.component';

@Component({
  selector: 'app-supplier-view',
  templateUrl: './supplier-view.component.html',
  styleUrls: ['./supplier-view.component.css']
})
export class SupplierViewComponent implements OnInit {

  isBlock = false;
  isDelete = false;
  isDisplay = false;


  search: string;
  heading_text: string;

  suppliers = new Array<SupplierModel>();
  supplier = new SupplierModel();

  constructor(private toastr: ToastrService, private supplierService: SupplierService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getSuppliers();
  }

  getSuppliers() {
    this.isBlock = true;
    this.supplierService.getSuppliers().subscribe(
      (result) => {
        this.suppliers = result;
        this.isBlock = false;
      },
      (error) => {
        this.isBlock = false;
        this.toastr.error(error.message, 'Failed to load suppliers');
      }
    );
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(SupplierCreateComponent, {
      width: '800px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'refresh') {
        this.getSuppliers();
      }
    });
  }

  openUpdateDialog(model: SupplierModel) {
    const dialogRef = this.dialog.open(SupplierUpdateComponent, {
      width: '800px',
      data: model
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'refresh') {
        this.getSuppliers();
      }
    });
  }

  closeModal() {
    this.isDisplay = false;
    this.supplier = null;
    this.isDelete = false;
  }

  openViewModal(supplier: SupplierModel) {
    this.isDisplay = true;
    this.heading_text = 'View Supplier';
    this.supplier = supplier;
  }

  openDeleteModal(supplier: SupplierModel) {
    this.isDelete = true;
    this.supplier = supplier;
    this.isDisplay = true;
    this.heading_text = `Delete ${supplier.name}`;
  }

  refresh(): void {
    this.closeModal();
    this.getSuppliers();
  }

  searchSupplier() {
    if (this.search !== '') {
      const tempSupplier = this.suppliers.filter(s => s.name.toLowerCase().match(this.search.toLowerCase()));

      if (tempSupplier.length === 0) {
        this.suppliers = this.suppliers.filter(s => s.city.toLowerCase().match(this.search.toLowerCase()));
      } else {
        this.suppliers = tempSupplier;
      }
    } else {
      this.getSuppliers();
    }
  }
}
