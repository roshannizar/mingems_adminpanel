import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ResetPasswordComponent } from 'app/auth/components/reset-password/reset-password.component';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-more-products',
    templateUrl: './more-products.component.html',
    styleUrls: ['./more-products.component.css']
})
export class MoreProductsComponent implements OnInit {

    more = [
        { name: 'Supplier', icon: 'local_shipping', path: '/more/supplier', cardcss: 'card-header-supplier', btnname: 'GO' },
        { name: 'Private Codes', icon: 'lock', path: '/more/private-codes', cardcss: 'card-header-code', btnname: 'GO' },
        { name: 'Profile', icon: 'person', path: '/more/profile', cardcss: 'card-header-profile', btnname: 'GO' },
        {
            name: 'Users', icon: 'people_alt', path: '/more/users', cardcss: 'card-header-success',
            btnname: 'GO'
        },
        { name: 'Last Login', icon: 'preview', path: '/more/last-logged', cardcss: 'card-header-danger', btnname: 'GO' },
        {
            name: 'Reset Password', icon: 'pattern', path: 'extra', cardcss: 'card-header-reset',
            btnname: 'GO'
        },
        { name: 'Subscription', icon: 'credit_card_outline', path: '/more/subscription', cardcss: 'card-header-subs', btnname: 'GO' },
        { name: 'Report', icon: 'summarize', path: '/more/report', cardcss: 'card-header-report', btnname: 'GO' },
        { name: 'Database Backup', icon: 'error', path: '', cardcss: '', btnname: 'COMING SOON' },
        { name: 'Notification', icon: 'error', path: '', cardcss: '', btnname: 'COMING SOON' },
        { name: 'Marketing', icon: 'error', path: '', cardcss: '', btnname: 'COMING SOON' },
    ];
    constructor(private router: Router, private dialog: MatDialog, private toastr: ToastrService) { }

    ngOnInit(): void {
    }

    navigateToPath(path: string) {
        if (path !== 'extra' && path !== '') {
            this.router.navigate([path]);
        } else if (path === 'extra') {
            this.openResetModal();
        } else {
            this.toastr.info('Module under development', 'Coming Soon');
        }
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
