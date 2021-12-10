import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SliderModel } from '../../models/slider-model';
import { SliderService } from '../../services/slider.service';

@Component({
  selector: 'app-slider-view',
  templateUrl: './slider-view.component.html',
  styleUrls: ['./slider-view.component.css']
})
export class SliderViewComponent implements OnInit {

  sliders: Array<SliderModel>;
  block = false;
  display = false;
  isUpdate = false;
  isDelete = false;
  slider = new SliderModel();
  heading_text: string;
  fullSlider = false;
  search: string;

  constructor(private toastr: ToastrService, private sliderService: SliderService) { }

  ngOnInit(): void {
    this.getSliders();
  }

  getSliders() {
    this.block = true;
    this.sliderService.getSliders().subscribe(
      (result) => {
        this.sliders = result;
        this.block = false;
      },
      (error) => {
        this.block = false;
        this.toastr.error('Failed to load slider');
      }
    );
  }

  openCreateModal() {
    this.heading_text = 'Create Slider';
    this.slider = null;
    this.display = true;
    this.isDelete = false;
    this.isUpdate = false;
  }

  closeModal() {
    this.display = false;
    this.slider = null;
    this.isUpdate = false;
    this.isDelete = false;
  }

  openSliderModal(slider: SliderModel) {
    this.display = true;
    this.heading_text = 'View Slider';
    this.slider = slider;
    this.fullSlider = true;
    this.isUpdate = false;
    this.isDelete = false;
  }

  openSliderEdit(slider: SliderModel) {
    this.slider = slider;
    this.display = true;
    this.fullSlider = false;
    this.isUpdate = true;
    this.isDelete = false;
    this.heading_text = 'Edit Slider Details';
  }

  updateModal(): void {
    this.closeModal();
    this.getSliders();
  }

  deleteSlider(id: string) {
    this.block = true;
    this.sliderService.deleteSlider(id).subscribe(
      (result) => {
        this.block = false;
        this.display = false;
        this.toastr.success('Deleted Successfully!', 'Success');
        this.getSliders();
      },
      (error) => {
        this.block = false;
        this.toastr.error(error.message, 'Failed');
      }
    );
  }

  openDeleteModal(slider: SliderModel) {
    this.isDelete = true;
    this.slider = slider;
    this.display = true;
    this.isUpdate = false;
    this.heading_text = `Delete ${slider.name}`;
  }

  completedModal() {
    this.closeModal();
    this.getSliders();
  }

  filterSlider() {
    if (this.search !== '') {
      this.sliders = this.sliders.filter(p => p.name.toLowerCase().match(this.search.toLowerCase()));
    } else {
      this.getSliders();
    }
  }
}
