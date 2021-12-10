import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PromotionModel } from '../../models/promotion-model';
import { PromotionService } from '../../services/promotion.service';

@Component({
  selector: 'app-promotion-delete',
  templateUrl: './promotion-delete.component.html',
  styleUrls: ['./promotion-delete.component.css']
})
export class PromotionDeleteComponent implements OnInit {

  message: string;
  name: string;
  block = false;
  @Input() promotion: PromotionModel;
  @Output() deleted = new EventEmitter();

  constructor(private promotionService: PromotionService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.message = `Are you sure that you want to remove ${this.promotion.description}`;
    this.name = this.promotion.description;
  }

  confirmDelete(id: string) {
    this.block = false;
    this.promotionService.deletePromotion(id).subscribe(
        (result) => {
          this.block = false;
          this.deleted.emit();
          this.toastr.success('Delete successfully!');
        },
        (error) => {
          this.block = false;
          this.toastr.error(error.message, `Failed to delete ${id}`);
        }
    );
  }
}
