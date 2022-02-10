import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { PrivateCodeModel } from '../../models/private-code-model';
import { PrivateCodeService } from '../../services/private.code.service';
import { PrivateCodeCreateComponent } from '../private-code-create/private-code-create.component';
import { PrivateCodeUpdateComponent } from '../private-code-update/private-code-update.component';

@Component({
  selector: 'app-private-code-view',
  templateUrl: './private-code-view.component.html',
  styleUrls: ['./private-code-view.component.css']
})
export class PrivateCodeViewComponent implements OnInit {

  isBlock = false;
  isDelete = false;
  isDisplay = false;


  search: string;
  heading_text: string;

  privateCodes = new Array<PrivateCodeModel>();
  privateCode = new PrivateCodeModel();

  constructor(private toastr: ToastrService, private privateCodeService: PrivateCodeService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getPrivateCodes();
  }

  getPrivateCodes() {
    this.isBlock = true;
    this.privateCodeService.getPrivateCodes().subscribe(
      (result) => {
        this.privateCodes = result;
        this.isBlock = false;
      },
      (error) => {
        this.isBlock = false;
        this.toastr.error(error.message, 'Failed to load private codes');
      }
    );
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(PrivateCodeCreateComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'refresh') {
        this.getPrivateCodes();
      }
    });
  }

  openUpdateDialog(model: PrivateCodeModel) {
    const dialogRef = this.dialog.open(PrivateCodeUpdateComponent, {
      width: '400px',
      data: model
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'refresh') {
        this.getPrivateCodes();
      }
    });
  }

  closeModal() {
    this.isDisplay = false;
    this.privateCode = null;
    this.isDelete = false;
  }

  openViewModal(privateCode: PrivateCodeModel) {
    this.isDisplay = true;
    this.heading_text = 'View Private Code';
    this.privateCode = privateCode;
  }

  openDeleteModal(privateCode: PrivateCodeModel) {
    this.isDelete = true;
    this.privateCode = privateCode;
    this.isDisplay = true;
    this.heading_text = `Delete ${privateCode.name}`;
  }

  refresh(): void {
    this.closeModal();
    this.getPrivateCodes();
  }

  searchPrivateCode() {
    if (this.search !== '') {
      this.privateCodes = this.privateCodes.filter(s => s.name.toLowerCase().match(this.search.toLowerCase()));
    } else {
      this.getPrivateCodes();
    }
  }
}
