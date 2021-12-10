import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DeliveryChargeModel} from '../../models/delivery-charge-model';
import {ToastrService} from 'ngx-toastr';
import {DeliveryChargeService} from '../../services/delivery-charge.service';

@Component({
  selector: 'app-delivery-location-create',
  templateUrl: './delivery-location-create.component.html',
  styleUrls: ['./delivery-location-create.component.css']
})
export class DeliveryLocationCreateComponent implements OnInit {
  deliveryCreateForm: FormGroup;
  deliveryCharge: DeliveryChargeModel;
  @Output() created = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private deliveryChargeService: DeliveryChargeService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.deliveryCreateForm = this.fb.group({
      city: ['', Validators.required],
      amount: ['', Validators.required]
    });
  }

  onCreateDeliveryCharge(): void {
    this.deliveryCharge = Object.assign({}, this.deliveryCharge, this.deliveryCreateForm.value);
    console.log('delivery Charge: ' + JSON.stringify(this.deliveryCharge));
    this.deliveryChargeService.createDeliveryCharge(this.deliveryCharge).subscribe((result) => {
      if (result) {
        this.created.emit();
        this.toastr.success('delivery charge added successfully!', 'Success');
      }
    }, (error) => {
      this.toastr.error(error.message, 'Error');
    });
  }

}
