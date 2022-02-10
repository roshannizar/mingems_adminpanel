import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LinkModel } from 'app/auth/models/auth-model';
import { AuthResetService } from 'app/auth/services/auth-reset.service';
import { MoreProductsComponent } from 'app/modules/more-management/components/more-products.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  isBlock = false;

  linkModel = new LinkModel();

  email: string;

  constructor(private jwtHelper: JwtHelperService, public dialogRef: MatDialogRef<MoreProductsComponent>,
    private toastr: ToastrService, private resetPasswordService: AuthResetService) { }

  ngOnInit(): void {
    this.getEmail();
  }

  getEmail() {
    const token = localStorage.getItem('session');
    const decoded_token = this.jwtHelper.decodeToken(token);
    console.log(decoded_token);
    if (decoded_token?.email) {
      this.email = decoded_token?.email;
    }
  }

  onResetPassword() {
    this.isBlock = true;
    this.linkModel.Email = this.email;
    this.resetPasswordService.resetPasswordLink(this.linkModel).subscribe(
      (result) => {
        this.toastr.success('Password Reset link has been sent to your email, Please check your email');
        this.isBlock = false;
        this.close();
      },
      (error) => {
        this.toastr.error(error.message, 'Failed to reset password');
        this.isBlock = false;
      }
    )
  }

  close() {
    this.dialogRef.close();
  }
}
