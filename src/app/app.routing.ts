import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './core/admin-layout/admin-layout.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuardService } from './auth/services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  }, 
  { 
    path: 'login',
    component: AuthComponent,
  },
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuardService],
    children: [{
      path: '',
      loadChildren: './core/admin-layout/admin-layout.module#AdminLayoutModule'
    }]
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: false
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
