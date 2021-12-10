import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SliderModel, SliderProductModel } from '../../models/slider-model';
import { SliderProductService } from '../../services/slider-product.service';
import { SliderService } from '../../services/slider.service';

@Component({
  selector: 'app-slider-update',
  templateUrl: './slider-update.component.html',
  styleUrls: ['./slider-update.component.css']
})
export class SliderUpdateComponent implements OnInit {

  @Output() notify: EventEmitter<any> = new EventEmitter();
  @Input() slider: SliderModel;
  productBlock = false;
  display = false;
  previewDisplay = false;
  imageBlock = false;
  imageUploadSuccess = false;
  sliderBlock = false;

  sliderProduct: Array<SliderProductModel>;
  sliderForm: FormGroup;
  file: File;
  filePath: string;

  sliderId: string;

  constructor(private sliderService: SliderService, private fb: FormBuilder,
    private toastr: ToastrService, private sliderProductService: SliderProductService) { }

  ngOnInit(): void {
    this.createSliderForm();
    this.loadProducts();
    this.patchSlider(this.slider);
  }

  createSliderForm() {
    this.previewDisplay = true;
    this.imageUploadSuccess = true;
    this.sliderForm = this.fb.group({
      name: ['', Validators.required],
      imageUrl: ['', Validators.required],
      productId: [''],
    });
  }

  openModal() {
    this.display = true;
  }

  closeModal() {
    this.display = false;
  }

  loadProducts() {
    this.productBlock = true;
    this.sliderProductService.getSliderProducts().subscribe(
      (result) => {
        this.sliderProduct = result;
        this.productBlock = false;
      },
      (error) => {
        this.productBlock = false;
        this.toastr.error(error.message, 'Failed to load products');
      }
    );
  }

  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.file = file;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.filePath = reader.result as string;
        this.previewDisplay = true;
      };
    }
  }

  uploadImage() {
    this.imageBlock = true;
    this.sliderService.uploadImage(this.file).subscribe(
      (result) => {
        this.filePath = result.image;
        this.sliderForm.get('imageUrl').setValue(result.image);
        this.imageBlock = false;
        this.imageUploadSuccess = true;
        this.toastr.success('Image uploaded successfully!');
      },
      (error) => {
        this.imageBlock = false;
        this.imageUploadSuccess = true;
        this.toastr.error('Failed', 'Failed to upload the image!');
      }
    );
  }

  removeImage() {
    this.imageUploadSuccess = false;
  }

  patchSlider(slider: SliderModel) {
    this.sliderForm.patchValue({
      id: slider.id,
      imageUrl: slider.imageUrl,
      name: slider.name,
      productId: slider.productId
    })
  }

  onUpdateSlider() {
    this.sliderBlock = true;
    this.slider = Object.assign({}, this.slider, this.sliderForm.value);
    this.sliderService.createSlider(this.slider).subscribe(
      (result) => {
        this.sliderBlock = false;
        this.display = false;
        this.previewDisplay = false;
        this.sliderForm.reset();
        this.notify.emit();
        this.toastr.success('Promotion Created Successfully!', 'Success');
      },
      (error) => {
        this.sliderBlock = false;
        this.previewDisplay = false;
        this.toastr.error(error.message, 'Failed to create promotion!');
      }
    );
  }

}
