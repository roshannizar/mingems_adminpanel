import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AuthModel, LinkModel } from './models/auth-model';
import { AuthResetService } from './services/auth-reset.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  display = false;
  forgotForm: FormGroup;
  authForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  })
  authModel = new AuthModel();
  block = false;
  resetBlock = false;
  linkModel = new LinkModel();
  redirectName = 'SIGN IN';

  constructor(private fb: FormBuilder, private router: Router,
    private authService: AuthService, private toastr: ToastrService, private authresetService: AuthResetService) { }

  ngOnInit(): void {
    this.createLoginForm();
    this.createForgotPassword();
  }

  createLoginForm() {
    this.authForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  createForgotPassword() {
    this.forgotForm = this.fb.group({
      Email: ['', Validators.required]
    })
  }

  openModal() {
    this.display = true;
  }

  closeModal() {
    this.display = false;
  }

  login() {
    this.block = true;
    this.authModel = Object.assign({}, this.authModel, this.authForm.value);
    this.authService.authentication(this.authModel).subscribe(
      (result) => {
        this.block = false;
        this.redirectName = 'REDIRECTING TO DASHBOARD, PLEASE WAIT ...';
        localStorage.setItem('session', result.message.replace('Bearer ', ''));
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        this.toastr.error(error.message, 'Invalid Credentials!');
        this.redirectName = 'SIGN IN';
        this.block = false;
      }
    )
  }

  resetPassword() {
    this.resetBlock = true;
    this.linkModel = Object.assign({}, this.linkModel, this.forgotForm.value);
    this.authresetService.resetPasswordLink(this.linkModel).subscribe(
      (result) => {
        this.toastr.success('Password Reset link has been sent to your email, Please check your email');
        this.resetBlock = false;
        this.closeModal();
      },
      (error) => {
        this.toastr.error(error.message, 'Failed to reset password');
        this.resetBlock = false;
      }
    )
  }
}
