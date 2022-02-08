import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { ReactiveFormsModule } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SharedModule } from 'app/shared/shared.module';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';



@NgModule({
  declarations: [AuthComponent, ResetPasswordComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [AuthComponent]
})
export class AuthModule { }
