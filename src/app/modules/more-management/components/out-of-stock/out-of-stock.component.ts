import { Component, OnInit } from '@angular/core';
import { ProductDescriptionModel } from 'app/modules/product-management/models/product-description-model';
import { ProductDescriptionService } from 'app/modules/product-management/services/product-description.service';
import { ToastrService } from 'ngx-toastr';
import { OutOfStockModel } from '../../models/out-of-stock-model';
import { OutOfStockService } from '../../services/out-of-stock.service';

@Component({
    selector: 'app-out-of-stock',
    templateUrl: './out-of-stock.component.html',
    styleUrls: ['./out-of-stock.component.css']
})
export class OutOfStockComponent implements OnInit {
    block = false;
    products = Array<OutOfStockModel>();
    viewProducts = Array<OutOfStockModel>();
    search = '';
    productDescription = new ProductDescriptionModel();

    constructor(
        private outofstockService: OutOfStockService,
        private productDescriptionService: ProductDescriptionService,
        private toastr: ToastrService
    ) { }

    ngOnInit(): void {
        this.getOutOfStockProducts();
    }

    getOutOfStockProducts(): void {
        this.block = true;
        this.outofstockService.getOutOfStock().subscribe((result) => {
            this.products = result;
            this.viewProducts = result;
            this.block = false;
        }, (error) => {
            this.block = false;
            this.toastr.error(error.message, 'Failed to load products!');
        });
    }

    searchByName(): void {
        if (this.search !== '') {
            this.viewProducts = this.products
            .filter((product) => product?.singleProduct?.name.toLowerCase().match(this.search.toLowerCase()));
        } else {
            this.getOutOfStockProducts();
        }
    }

    addToProduct(product: OutOfStockModel): void {
        // change the product quantity
        product.quantity = 10;
        this.convert(product);

        // call the API
        this.productDescriptionService.moveToOutOfStock(this.productDescription).subscribe((result) => {
            if (result) {
                this.toastr.success(`The product ${product?.singleProduct?.name} is added back to the product list`);
                this.getOutOfStockProducts();
            }
        }, (error) => {
            this.getOutOfStockProducts();
            this.toastr.error(`The product ${product?.singleProduct?.name} could not be added back to the product list`);
        });

    }

    convert(product: OutOfStockModel): void {
        this.productDescription.id = product.id;
        this.productDescription.productId = product.productId;
        this.productDescription.imageUrl = product.imageUrl;
        this.productDescription.name = product.name;
        this.productDescription.unitPrice = product.unitPrice;
        this.productDescription.mrp = product.mrp;
        this.productDescription.quantity = product.quantity;
        this.productDescription.rating = product.rating;
        this.productDescription.salesCount = product.salesCount;
    }
}
