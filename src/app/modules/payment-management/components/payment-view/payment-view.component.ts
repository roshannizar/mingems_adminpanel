import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SubscriptionModel } from '../../models/subscription-model';
import { SubscriptionService } from '../../services/subscription.service';

@Component({
  selector: 'app-payment-view',
  templateUrl: './payment-view.component.html',
  styleUrls: ['./payment-view.component.css']
})
export class PaymentViewComponent implements OnInit {

  isBlock = false;
  subscriptions = new Array<SubscriptionModel>();

  constructor(private subscriptionService: SubscriptionService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getSubscriptions();
  }

  getSubscriptions() {
    this.isBlock = true;
    this.subscriptionService.getSubscriptions().subscribe(
      (result) => {
        this.subscriptions = result;
        this.isBlock = false;
      },
      (error) => {
        this.isBlock = false;
        this.toastr.error(error.message, 'Failed to load subscriptions');
      }
    );
  }
}
