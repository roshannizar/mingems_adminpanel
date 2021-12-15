import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css']
})
export class ConfirmationModalComponent implements OnInit {

  error = false;
  isBlock = false;

  item: any;
  appForm: FormGroup;

  @Input() block = false;
  @Input() appName: string;
  @Input() confirmText: string;
  @Output() onConfirm: EventEmitter<any> = new EventEmitter();

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createAppForm();
  }

  createAppForm() {
    this.appForm = this.fb.group({
      name: ['', Validators.required]
    })
  }

  confirm(): void {
    if (this.appName === this.appForm.get('name').value) {
      this.onConfirm.emit(this.item);
      this.error = false;
      this.appForm.reset();
    } else {
      this.error = true;
    }
  }
}
