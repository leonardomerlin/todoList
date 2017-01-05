import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { Ng2BootstrapModule, DropdownModule, PopoverModule } from 'ng2-bootstrap/ng2-bootstrap';
import { SecurityModule } from '@demoiselle/security';

import { NotificationService } from './notification.service';
import { LoginService } from '../login/shared/login.service';
import { UserDropdownComponent } from './top-nav/user-dropdown.component';
import { SidebarMenuComponent } from './sidebar-menu/sidebar-menu.component';
import { TopNavComponent } from './top-nav/top-nav.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    Ng2BootstrapModule.forRoot(),
    DropdownModule.forRoot(),
    PopoverModule.forRoot()
  ],
  declarations: [SidebarMenuComponent, TopNavComponent, UserDropdownComponent],
  providers: [
    NotificationService,
    LoginService
  ],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    Ng2BootstrapModule,
    SecurityModule,

    SidebarMenuComponent,
    TopNavComponent,
    UserDropdownComponent
  ]
})
export class SharedModule { }
