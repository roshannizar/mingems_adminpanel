import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CustomerModel } from 'app/modules/customer-management/models/customer-model';
import { CustomerService } from 'app/modules/customer-management/services/customer.service';
import { InventoryService } from 'app/modules/inventory-management/services/inventory.service';
import { PaymentViewComponent } from 'app/modules/payment-management/components/payment-view/payment-view.component';
import { PurchaseModel } from 'app/modules/purchase-management/model/purchase-model';
import { PurchaseService } from 'app/modules/purchase-management/services/purchase.service';
import { ToastrService } from 'ngx-toastr';
import { PaymentModalComponent } from '../../modals/payment-modal/payment-modal.component';
import { OrderLine, OrderModel } from '../../models/order-model';

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.css']
})
export class OrderCreateComponent implements OnInit {

  isBlock = false;

  vat = 0;
  discount = 0;
  totalAmount = 0;

  search: string;

  order = new OrderModel();
  products = new Array<PurchaseModel>();
  customers = new Array<CustomerModel>();

  constructor(private productService: InventoryService, private customerService: CustomerService,
    private toastrService: ToastrService, private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.getPurchases();
    this.getCustomers();
  }

  getPurchases() {
    this.isBlock = true;
    this.productService.getInventories().subscribe(
      (result) => {
        this.products = result;
        this.isBlock = false;
      },
      (error) => {
        this.toastrService.error(error.message, 'Failed to load products');
        this.isBlock = false;
      }
    );
  }

  getCustomers() {
    this.isBlock = true;
    this.customerService.getCustomers().subscribe(
      (result) => {
        this.customers = result;
        this.isBlock = false;
      },
      (error) => {
        this.isBlock = false;
        this.toastrService.error(error.message, 'Failed to load customers');
      }
    );
  }

  getTotalPrice(purhcase: PurchaseModel) {
    return purhcase.unitPrice + purhcase.certificateCost + purhcase.exportCost + purhcase.recuttingCost + purhcase.commissionCost;
  }

  onSelectProduct(item: PurchaseModel) {
    const orderLines = new OrderLine();

    orderLines.quantity = 1;
    orderLines.soldPrice = this.getTotalPrice(item);
    orderLines.purchase.name = item.name;
    orderLines.productId = item.id;

    this.order.orderLines.push(orderLines);
    this.calculatePrice();
    this.totalAmount -= this.discount;
    this.totalAmount += this.vat;
  }

  onChangeQuantity(index: number) {
    const item = this.order.orderLines[index];
    item.quantity = parseFloat((<HTMLInputElement>document.getElementById(`quantity${index}`)).value);
    this.order.orderLines[index] = item;
    this.calculatePrice();
    this.totalAmount -= this.discount;
    this.totalAmount += this.vat;
  }

  onChangePrice(index: number) {
    const item = this.order.orderLines[index];
    item.soldPrice = parseFloat((<HTMLInputElement>document.getElementById(`soldPrice${index}`)).value);
    this.order.orderLines[index] = item;
    this.calculatePrice();
    this.totalAmount -= this.discount;
    this.totalAmount += this.vat;
  }

  private calculatePrice() {
    this.totalAmount = 0;
    this.order.orderLines.forEach((item) => {
      this.totalAmount = this.totalAmount + (item.soldPrice * item.quantity);
    });
  }

  onDiscount() {
    if (this.discount !== null) {
      this.calculatePrice();
      if (this.vat !== null) {
        this.totalAmount += this.vat;
      }
      this.totalAmount -= this.discount;
      this.order.discount = this.discount;
    } else {
      this.calculatePrice();
    }
  }

  calculateVat() {
    if (this.vat !== null) {
      this.calculatePrice();
      if (this.discount !== null) {
        this.totalAmount -= this.discount;
      }
      this.totalAmount += this.vat;
      this.order.vat = this.vat;
    } else {
      this.calculatePrice();
    }
  }

  onRemoveProduct(index: number) {
    this.order.orderLines.splice(index, 1);
    this.totalAmount = 0;
    this.calculatePrice();
    this.totalAmount -= this.discount;
    this.totalAmount += this.vat;

    if (this.order.orderLines.length === 0) {
      this.discount = 0;
      this.vat = 0;
      this.totalAmount = 0;
    }
  }

  filterProduct() {
    if (this.search !== '') {
      this.products = this.products.filter(p => p.name.toLowerCase().match(this.search.toLowerCase()));
    } else {
      this.getPurchases();
    }
  }

  openPaymentModal() {
    if (this.order.customerId != null && this.order.orderLines.length !== 0) {
      const dialogRef = this.dialog.open(PaymentModalComponent, {
        width: '400px',
        data: this.order
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === 'refresh') {
          this.router.navigate(['/order']);
        }
      });
    } else if (this.order.customerId == null) {
      this.toastrService.warning('Customer is not selected!, Please select a customer', 'Invalid Data');
    } else {
      this.toastrService.warning('Cart seems empty!', 'Invalid Data');
    }
  }

  onSelectCustomer(event) {
    if (event !== null) {
      this.order.customerId = event;
    } else {
      this.order.customerId = null;
    }
  }
}
