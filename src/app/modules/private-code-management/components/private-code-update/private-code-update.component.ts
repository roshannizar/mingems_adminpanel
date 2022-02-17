import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { PrivateCodeModel } from '../../models/private-code-model';
import { PrivateCodeService } from '../../services/private.code.service';
import { PrivateCodeViewComponent } from '../private-code-view/private-code-view.component';

@Component({
  selector: 'app-private-code-update',
  templateUrl: './private-code-update.component.html',
  styleUrls: ['./private-code-update.component.css']
})
export class PrivateCodeUpdateComponent implements OnInit {

  isBlock = false;

  privateCodeGroup: FormGroup;
  privateCode: PrivateCodeModel;

  constructor(public dialogRef: MatDialogRef<PrivateCodeViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PrivateCodeModel, private fb: FormBuilder,
    private privateCodeService: PrivateCodeService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.createPrivateCode();
    this.patchPrivateCode(this.data);
  }

  createPrivateCode() {
    this.privateCodeGroup = this.fb.group({
      id: [''],
      name: ['', Validators.email],
      priceCode: ['', Validators.required]
    });
  }

  patchPrivateCode(privateCode: PrivateCodeModel) {
    this.privateCodeGroup.patchValue({
      id: privateCode.id,
      name: privateCode.name,
      priceCode: privateCode.priceCode,
      creationDate: privateCode.creationDate,
      modificationDate: privateCode.modificationDate
    });
  }

  onUpdate() {
    this.isBlock = true;
    this.privateCode = Object.assign({}, this.privateCode, this.privateCodeGroup.value);
    this.privateCodeService.updatePrivateCode(this.privateCode).subscribe(
      (result) => {
        this.isBlock = false;
        this.close('refresh');
        this.toastr.success('Private code updated successfully!', 'Updated');
      },
      (error) => {
        this.isBlock = false;
        this.toastr.error(error.message, 'Failed to update private code');
      }
    );
  }

  close(response: string) {
    this.dialogRef.close(response);
  }
}
