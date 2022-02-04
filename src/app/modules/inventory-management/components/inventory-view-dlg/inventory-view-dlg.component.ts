import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ImageViewDlgComponent } from '../../modals/image-view-dlg/image-view-dlg.component';
import { InventoryModel } from '../../models/inventory-model';

@Component({
  selector: 'app-inventory-view-dlg',
  templateUrl: './inventory-view-dlg.component.html',
  styleUrls: ['./inventory-view-dlg.component.css']
})
export class InventoryViewDlgComponent implements OnInit {

  @Input() inventory = new InventoryModel();
  
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openImageDialog() {
    const dialogRef = this.dialog.open(ImageViewDlgComponent, {
      width: '300px',
      data: this.inventory
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
