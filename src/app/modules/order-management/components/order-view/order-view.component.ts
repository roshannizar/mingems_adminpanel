import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { OrderModel } from '../../models/order-model';
import { OrderStatusEnum } from '../../models/order-status-enum';
import { PaymentMethodEnum } from '../../models/payment-method-enum';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { OrderTentativeDialogComponent } from '../../modal/order-tentative-dialog/order-tentative-dialog.component';
import { ResponseModel } from 'app/shared/models/response-model';

@Component({
    selector: 'app-order-view',
    templateUrl: './order-view.component.html',
    styleUrls: ['./order-view.component.css']
})
export class OrderViewComponent implements OnInit {

    block = false;
    display = false;
    orderStatusBlock = false;
    selectedOrderStatus = 0;
    search: string;
    orders = new ResponseModel<OrderModel>();
    order = new OrderModel();

    constructor(private orderService: OrderService, private toastr: ToastrService, private dialog: MatDialog) {
    }

    ngOnInit(): void {
        this.getOrders(0, 1);
    }

    pageEvent(event: any) {
        this.getOrders(this.selectedOrderStatus, event.pageIndex + 1);
    }

    getOrders(status: number, pageNo: number) {
        this.block = true;
        this.orderService.getOrders(status, pageNo).subscribe(
            (result) => {
                this.selectedOrderStatus = status;
                this.orders = result;
                this.block = false;
            },
            (error) => {
                this.block = false;
                this.toastr.error(error.message, 'Contact the vendor');
            }
        );
    }

    openDialog(order: OrderModel) {
        const dialogRef = this.dialog.open(OrderTentativeDialogComponent, {
            width: '1200px',
            data: order
        });

        dialogRef.afterClosed().subscribe(result => {
            this.getOrders(0, 1);
            this.selectedOrderStatus = 0;
        });
    }

    getOrderStatus(status: number): string {
        if (status === OrderStatusEnum.Pending) {
            return 'Pending';
        } else if (status === OrderStatusEnum.Approved) {
            return 'Approved';
        } else if (status === OrderStatusEnum.Delivered) {
            return 'Delivered';
        } else if (status === OrderStatusEnum.Rejected) {
            return 'Rejected';
        } else {
            return 'Unknown Status'
        }
    }

    getPaymentMethod(method: number): string {
        if (method === PaymentMethodEnum['Cash On Delivery']) {
            return 'Cash On Delivery';
        } else if (method === PaymentMethodEnum['Visa and Master']) {
            return 'Visa and Master';
        } else if (method === PaymentMethodEnum.CEFTS) {
            return 'CEFTS';
        } else if (method === PaymentMethodEnum['Q Pay Code']) {
            return 'Q Pay Code';
        } else {
            return 'Not defined'
        }
    }

    getOrderStatusClass(status: number): string {
        let base_class = 'font-italic ';
        if (status === OrderStatusEnum.Pending) {
            base_class += 'text-warning';
        } else if (status === OrderStatusEnum.Approved) {
            base_class += 'text-primary';
        } else if (status === OrderStatusEnum.Delivered) {
            base_class += 'text-success';
        } else if (status === OrderStatusEnum.Rejected) {
            base_class += 'text-danger';
        } else {
            base_class += 'text-dark'
        }
        return base_class;
    }

    getStatusButtonClass(status: number): string {
        let className = '';
        if (status === OrderStatusEnum.Pending) {
            className = 'btn btn-sm btn-primary mx-3';
        } else if (status === OrderStatusEnum.Approved) {
            className = 'btn btn-sm btn-success mx-3';
        }
        return className;
    }

    getStatusButtonText(status: number): string {
        let text = '';
        if (status === OrderStatusEnum.Pending) {
            text = 'Approve';
        } else if (status === OrderStatusEnum.Approved) {
            text = 'Deliver';
        }
        return text;
    }

    openSideNav(order: OrderModel): void {
        this.order = order;
        this.display = true;
    }

    closeSideNav(): void {
        this.display = false;
    }

    updateOrderStatus(id: string) {
        this.orderStatusBlock = true;
        this.orderService.updateOrderStatus(id).subscribe(
            (result) => {
                this.orderStatusBlock = false;
                this.toastr.success('Order status update successfully', 'Order status');
            },
            (error) => {
                this.orderStatusBlock = false;
                this.toastr.error(error.message, 'Failed to update');
            }
        );
    }

    searchByEmail() {
        if (this.search !== '' || this.search !== undefined) {
            this.orders.data = this.orders.data.filter(o => o.orderRef.includes(this.search));
            if (this.orders.data.length === 0) {
                this.toastr.warning('We are working on deep search functionality, your records might be in the database', 'No worries');
            }
        } else {
            this.getOrders(this.selectedOrderStatus, 1);
        }
    }
}
