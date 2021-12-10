import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DeliveryChargeModel} from '../../models/delivery-charge-model';
import {DeliveryChargeService} from '../../services/delivery-charge.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-delivery-location-update',
  templateUrl: './delivery-location-update.component.html',
  styleUrls: ['./delivery-location-update.component.css']
})
export class DeliveryLocationUpdateComponent implements OnInit {
  deliveryUpdateForm: FormGroup;
  @Input() deliveryCharge: DeliveryChargeModel;
  @Output() updated = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private deliveryChargeService: DeliveryChargeService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.patchForm(this.deliveryCharge);
  }

  createForm(): void {
    this.deliveryUpdateForm = this.fb.group({
      id: ['', Validators.required],
      city: ['', Validators.required],
      amount: ['', Validators.required]
    });
  }

  patchForm(deliveryCharge: DeliveryChargeModel): void {
    this.deliveryUpdateForm.patchValue({
      id: deliveryCharge.id,
      city: deliveryCharge.city,
      amount: deliveryCharge.amount
    });
  }

  onUpdateDeliveryCharge(): void {
    this.deliveryCharge = Object.assign({}, this.deliveryCharge, this.deliveryUpdateForm.value);
    console.log('delivery Charge: ' + JSON.stringify(this.deliveryCharge));
    this.deliveryChargeService.updateDeliveryCharge(this.deliveryCharge).subscribe((result) => {
      if (result) {
        this.updated.emit();
        this.toastr.success('delivery charge updated successfully!', 'Success');
      }
    }, (error) => {
      this.toastr.error(error.message, 'Error');
    });
  }

}
