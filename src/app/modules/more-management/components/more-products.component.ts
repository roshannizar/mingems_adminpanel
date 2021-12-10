import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-more-products',
    templateUrl: './more-products.component.html',
    styleUrls: ['./more-products.component.css']
})
export class MoreProductsComponent implements OnInit {

    constructor(private router: Router) { }

    ngOnInit(): void {
    }

    navigateOutOfStock() {
        this.router.navigate(['/more/outofstock']);
    }

    navigateToUsers() {
        this.router.navigate(['/more/users']);
    }

    navigateLastLogged() {
        this.router.navigate(['/more/lastlogged']);
    }

    navigateReport() {
        this.router.navigate(['/more/report']);
    }
}
