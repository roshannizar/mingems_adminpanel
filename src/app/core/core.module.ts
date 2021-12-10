import { NgModule } from "@angular/core";
import { SharedModule } from "app/shared/shared.module";
import { FooterComponent } from "./layouts/footer/footer.component";
import { FooterModule } from "./layouts/footer/footer.module";
import { NavbarComponent } from "./layouts/navbar/navbar.component";
import { NavbarModule } from "./layouts/navbar/navbar.module";
import { SidebarComponent } from "./layouts/sidebar/sidebar.component";
import { SidebarModule } from "./layouts/sidebar/sidebar.module";

@NgModule({
    imports: [
        SharedModule
    ],
    exports: [
        NavbarModule,
        SidebarModule,
        FooterModule
    ]
})
export class CoreModule { }