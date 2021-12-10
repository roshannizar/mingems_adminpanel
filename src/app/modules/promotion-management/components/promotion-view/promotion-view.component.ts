import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PromotionLinesModel } from '../../models/promotion-lines-model';
import { PromotionModel } from '../../models/promotion-model';
import { PromotionService } from '../../services/promotion.service';
import { CategoryModel } from '../../../product-management/models/category-model';

@Component({
  selector: 'app-promotion-view',
  templateUrl: './promotion-view.component.html',
  styleUrls: ['./promotion-view.component.css']
})
export class PromotionViewComponent implements OnInit {

  block = false;
  display = false;
  isUpdate = false;
  isDelete = false;
  promotions = Array<PromotionModel>();
  viewPromotions = Array<PromotionModel>();
  promotionLines = Array<PromotionLinesModel>();
  promotion = new PromotionModel();
  heading_text: string;
  fullPromotion = false;
  search: string;

  constructor(private promotionService: PromotionService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getPromotions();
  }

  openCreateModal() {
    this.heading_text = 'Create Promotion';
    this.promotion = null;
    this.display = true;
    this.isDelete = false;
    this.isUpdate = false;
  }

  closeModal() {
    this.display = false;
    this.promotion = null;
    this.isUpdate = false;
    this.isDelete = false;
  }

  openPromotionModal(promotion: PromotionModel) {
    this.display = true;
    this.heading_text = 'View Promotion';
    this.promotion = promotion;
    this.fullPromotion = true;
    this.isUpdate = false;
    this.isDelete = false;
  }

  getPromotions() {
    this.block = true;
    this.promotionService.getPromotions().subscribe(
      (result) => {
        this.promotions = result;
        this.viewPromotions = result;
        this.block = false;
      },
      (error) => {
        this.block = false;
        this.toastr.error(error.message, 'Failed to load promotion');
      }
    );
  }

  filterPromotion() {
    if (this.search !== '') {
      this.viewPromotions = this.promotions.filter(p => p.description.toLowerCase().match(this.search.toLowerCase()));
    } else {
      this.getPromotions();
    }
  }

  openPromotionEdit(promotion: PromotionModel) {
    this.promotion = promotion;
    this.display = true;
    this.fullPromotion = false;
    this.isUpdate = true;
    this.isDelete = false;
    this.heading_text = 'Edit Promotion Details';
  }

  updateModal(): void {
    this.closeModal();
    this.getPromotions();
  }

  deleteProduct(id: string) {
    this.block = true;
    this.promotionService.deletePromotion(id).subscribe(
      (result) => {
        this.block = false;
        this.display = false;
        this.toastr.success('Deleted Successfully!', 'Success');
        this.getPromotions();
      },
      (error) => {
        this.block = false;
        this.toastr.error(error.message, 'Failed');
      }
    );
  }

  openDeleteModal(promotion: PromotionModel) {
    this.isDelete = true;
    this.promotion = promotion;
    this.display = true;
    this.isUpdate = false;
    this.heading_text = `Delete ${promotion.description}`;
  }

  completedModal() {
    this.closeModal();
    this.getPromotions();
  }

}
