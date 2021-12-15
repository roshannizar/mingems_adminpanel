import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SupplierModel } from '../../models/supplier-model';
import { SupplierService } from '../../services/supplier.service';

@Component({
  selector: 'app-supplier-delete',
  templateUrl: './supplier-delete.component.html',
  styleUrls: ['./supplier-delete.component.css']
})
export class SupplierDeleteComponent implements OnInit {

  isBlock = false;
  name: string;

  @Input() supplier: SupplierModel;
  @Output() deleted = new EventEmitter();

  constructor(private supplierService: SupplierService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.name = this.supplier.name;
  }

  confirmDelete(id: string) {
    this.isBlock = true;
    this.supplierService.deleteSupplier(id).subscribe(
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
