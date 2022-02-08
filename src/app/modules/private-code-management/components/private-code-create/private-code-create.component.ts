import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { PrivateCodeModel } from '../../models/private-code-model';
import { PrivateCodeService } from '../../services/private.code.service';
import { PrivateCodeViewComponent } from '../private-code-view/private-code-view.component';

@Component({
  selector: 'app-private-code-create',
  templateUrl: './private-code-create.component.html',
  styleUrls: ['./private-code-create.component.css']
})
export class PrivateCodeCreateComponent implements OnInit {

  isBlock = false;

  privateCode: PrivateCodeModel;
  privateCodeGroup: FormGroup;

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<PrivateCodeViewComponent>,
    private privateCodeService: PrivateCodeService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.createPrivateCode();
  }

  createPrivateCode() {
    this.privateCodeGroup = this.fb.group({
      name: ['', Validators.required],
      priceCode: ['', Validators.required]
    });
  }

  onSave() {
    this.isBlock = true;
    this.privateCode = Object.assign({}, this.privateCode, this.privateCodeGroup.value);
    this.privateCodeService.createPrivateCode(this.privateCode).subscribe(
      (result) => {
        this.isBlock = false;
        this.close('refresh');
        this.toastr.success('Private code created successfully!', 'Success');
      },
      (error) => {
        this.isBlock = false;
        this.toastr.error(error.message, 'Failed to save private code');
      }
    );
  }

  close(response: string) {
    this.dialogRef.close(response);
  }
}
