import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(AdminLayoutRoutes)
  ],
  declarations: [
  ]
})

export class AdminLayoutModule {}
