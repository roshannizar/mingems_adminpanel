import { Component, OnInit } from '@angular/core';
import { UserModel } from 'app/modules/user-management/models/user-model';
import { UserService } from 'app/modules/user-management/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-last-logged',
  templateUrl: './last-logged.component.html',
  styleUrls: ['./last-logged.component.css']
})
export class LastLoggedComponent implements OnInit {

  block = false;
  users = new Array<UserModel>();

  constructor(private userService: UserService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getLastLogged();
  }

  getLastLogged() {
    this.block = true;
    this.userService.getLastLogged().subscribe(
      (result) => {
        this.users = result;
        this.block = false;
      },
      (error) => {
        this.block = false;
        this.toastr.error(error.message, 'Failed to load user details!');
      }
    );
  }
}
