import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PrivateCodeModel } from '../../models/private-code-model';
import { PrivateCodeService } from '../../services/private.code.service';

@Component({
  selector: 'app-private-code-delete',
  templateUrl: './private-code-delete.component.html',
  styleUrls: ['./private-code-delete.component.css']
})
export class PrivateCodeDeleteComponent implements OnInit {

  isBlock = false;
  name: string;

  @Input() privateCode: PrivateCodeModel;
  @Output() deleted = new EventEmitter();

  constructor(private privateCodeService: PrivateCodeService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.name = this.privateCode.name;
  }

  confirmDelete(id: string) {
    this.isBlock = true;
    this.privateCodeService.deletePrivateCode(id).subscribe(
      (result) => {
        this.isBlock = false;
        this.deleted.emit();
        this.toastr.success('Deleted successfully!');
      },
      (error) => {
        this.isBlock = false;
        this.toastr.error(error.message, `Failed to delete ${id}`);
      }
    );
  }

}
