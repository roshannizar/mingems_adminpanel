import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './core/components/components.module';

import { AppComponent } from './app.component';

import { AdminLayoutComponent } from './core/admin-layout/admin-layout.component';
import { SharedModule } from './shared/shared.module';
import { ToastrModule } from 'ngx-toastr';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@auth0/angular-jwt';
import { ReleaseFeaturesComponent } from './core/dashboard/components/release-features/release-features.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    SharedModule,
    AppRoutingModule,
    AuthModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: false,
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:4200', 'http://placemeapi.azurewebsite.net/']
      },
    })
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    ReleaseFeaturesComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }

export function tokenGetter() {
  return localStorage.getItem('session');
}
