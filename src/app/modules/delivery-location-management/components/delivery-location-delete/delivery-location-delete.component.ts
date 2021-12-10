import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProductModel} from '../../../product-management/models/product-model';
import {ToastrService} from 'ngx-toastr';
import {DeliveryChargeService} from '../../services/delivery-charge.service';
import {DeliveryChargeModel} from '../../models/delivery-charge-model';

@Component({
  selector: 'app-delivery-location-delete',
  templateUrl: './delivery-location-delete.component.html',
  styleUrls: ['./delivery-location-delete.component.css']
})
export class DeliveryLocationDeleteComponent implements OnInit {


  message: string;
  name: string;
  block = false;
  @Input() deliveryCharge: DeliveryChargeModel;
  @Output() deleted = new EventEmitter();

  constructor(
    private toastr: ToastrService,
    private deliveryChargeService: DeliveryChargeService) { }

  ngOnInit(): void {
    this.message = `Are you sure that you want to remove the delivery charge for the city ${this.deliveryCharge.city}`;
    this.name = this.deliveryCharge.city;
  }

  confirmDelete(id: string) {
    this.block = false;
    this.deliveryChargeService.deleteDeliveryCharge(id).subscribe(
      (result) => {
        this.block = false;
        this.deleted.emit();
        this.toastr.success('Deleted successfully!');
      },
      (error) => {
        this.block = false;
        this.toastr.error(error.message, `Failed to delete ${id}`);
      }
    );
  }
}
