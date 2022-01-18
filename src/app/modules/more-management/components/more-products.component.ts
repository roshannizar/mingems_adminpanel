import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ResetPasswordComponent } from 'app/auth/components/reset-password/reset-password.component';

@Component({
    selector: 'app-more-products',
    templateUrl: './more-products.component.html',
    styleUrls: ['./more-products.component.css']
})
export class MoreProductsComponent implements OnInit {

    constructor(private router: Router, private dialog: MatDialog) { }

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

    openResetModal() {
        const dialogRef = this.dialog.open(ResetPasswordComponent, {
            width: '400px',
            data: null
        });

        dialogRef.afterClosed().subscribe(result => {
        });
    }
}
