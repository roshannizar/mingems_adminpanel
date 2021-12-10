import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SliderModel, SliderProductModel } from '../../models/slider-model';
import { SliderProductService } from '../../services/slider-product.service';
import { SliderService } from '../../services/slider.service';

@Component({
  selector: 'app-slider-create',
  templateUrl: './slider-create.component.html',
  styleUrls: ['./slider-create.component.css']
})
export class SliderCreateComponent implements OnInit {

  @Output() notify: EventEmitter<any> = new EventEmitter();
  productBlock = false;
  display = false;
  previewDisplay = false;
  imageBlock = false;
  imageUploadSuccess = false;
  sliderBlock = false;

  sliderProduct: Array<SliderProductModel>;
  slider: SliderModel;
  sliderForm: FormGroup;
  file: File;
  filePath: string;

  constructor(private sliderService: SliderService, private fb: FormBuilder,
    private toastr: ToastrService, private sliderProductService: SliderProductService) { }

  ngOnInit(): void {
    this.createSliderForm();
    this.loadProducts();
  }

  createSliderForm() {
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

  onSaveSlider() {
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
