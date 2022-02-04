import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserProfileModel } from '../../models/user-profile-model';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {

  hide = false;
  isBlock = false;

  userGroup: FormGroup;

  user = new UserProfileModel();

  constructor(private toastr: ToastrService, private profileService: ProfileService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createUser();
    this.getMetaData();
  }

  createUser() {
    this.userGroup = this.fb.group({
      firstName: ['', Validators.required],
      lastName: [''],
    });
  }

  patchUser(userModel: UserProfileModel) {
    this.userGroup.patchValue({
      firstName: userModel.firstName,
      lastName: userModel.lastName
    });
  }

  getMetaData() {
    this.isBlock = true;
    this.profileService.getMetaData().subscribe(
      (result) => {
        this.user = result;
        this.patchUser(this.user);
        this.isBlock = false;
      },
      (error) => {
        this.isBlock = false;
        this.toastr.error(error.message, 'Failed to load user meta data');
      }
    );
  }

  getUserRole() {
    return this.user?.role === 0 ? 'Admin' : 'Customer';
  }

  onEnableEdit() {
    this.hide = true;
  }

  onDisableEdit() {
    this.hide = false;
  }
}
