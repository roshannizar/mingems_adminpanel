import { Component, OnInit } from '@angular/core';
import {DeliveryChargeService} from '../../services/delivery-charge.service';
import {DeliveryChargeModel} from '../../models/delivery-charge-model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delivery-location-view',
  templateUrl: './delivery-location-view.component.html',
  styleUrls: ['./delivery-location-view.component.css']
})
export class DeliveryLocationViewComponent implements OnInit {
  block = false;
  display = false;
  isUpdate = false;
  isDelete = false;
  fullDeliveryCharge = false;
  deliveryCharges = Array<DeliveryChargeModel>();
  viewDeliveryCharges = Array<DeliveryChargeModel>();
  deliveryCharge = new DeliveryChargeModel();
  heading_text = '';
  search = '';

  constructor(
    private deliveryChargeService: DeliveryChargeService, private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getDeliveryCharges();
  }

  closeModal() {
    this.display = false;
    this.deliveryCharge = null;
    this.isUpdate = false;
    this.isDelete = false;
  }

  openCreateModal() {
    this.heading_text = 'Create Delivery Charge';
    this.deliveryCharge = null;
    this.display = true;
    this.isDelete = false;
    this.isUpdate = false;
  }

  openDeliveryChargeModal(deliveryCharge: DeliveryChargeModel) {
    this.display = true;
    this.heading_text = 'View Delivery Charge';
    this.deliveryCharge = deliveryCharge;
    console.log(this.deliveryCharge);
    this.fullDeliveryCharge = true;
    this.isUpdate = false;
    this.isDelete = false;
  }

  openDeliveryChargeEdit(deliveryCharge: DeliveryChargeModel): void {
    this.heading_text = 'Update Delivery Charge';
    this.deliveryCharge = deliveryCharge;
    this.fullDeliveryCharge = false;
    this.isUpdate = true;
    this.isDelete = false;
    this.display = true;
  }

  openDeliveryDeleteModal(deliveryCharge: DeliveryChargeModel): void {
    this.deliveryCharge = deliveryCharge;
    this.display = true;
    this.fullDeliveryCharge = false;
    this.heading_text = 'Delete Delivery Charge';
    this.isDelete = true;
    this.isUpdate = false;
  }

  getDeliveryCharges(): void {
    this.block = true;
    this.deliveryChargeService.getDeliveryCharges().subscribe((result) => {
      if (result.length > 0) {
        this.deliveryCharges = result;
        this.viewDeliveryCharges = result;
        this.block = false;
      }
    }, (error) => {
      this.block = false;
      this.toastr.error(error.message, 'Failed to load deliveries');
    });
  }

  filterDeliveryCharges() {
    if (this.search !== '') {
      this.viewDeliveryCharges = this.deliveryCharges.filter(del => del.city.toLowerCase().match(this.search.toLowerCase()));
    } else {
      this.getDeliveryCharges();
    }
  }

  reload(): void {
    this.closeModal();
    this.getDeliveryCharges();
  }

}
