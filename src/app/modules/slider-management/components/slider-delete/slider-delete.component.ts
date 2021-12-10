import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SliderModel } from '../../models/slider-model';
import { SliderService } from '../../services/slider.service';

@Component({
  selector: 'app-slider-delete',
  templateUrl: './slider-delete.component.html',
  styleUrls: ['./slider-delete.component.css']
})
export class SliderDeleteComponent implements OnInit {

  message: string;
  name: string;
  block = false;
  @Input() slider: SliderModel;
  @Output() deleted = new EventEmitter();

  constructor(private sliderService: SliderService, private toastr: ToastrService) { }

  ngOnInit(): void {
    console.log(this.slider);
    this.message = `Are you sure that you want to remove ${this.slider.name}`;
    this.name = this.slider.name;
  }

  confirmDelete(id: string) {
    this.block = false;
    this.sliderService.deleteSlider(id).subscribe(
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
