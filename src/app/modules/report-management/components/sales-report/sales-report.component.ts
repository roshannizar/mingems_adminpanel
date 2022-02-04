import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FilterDialogComponent } from '../../modals/filter-dialog/filter-dialog.component';
import { ReportService } from '../../services/report.service';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import * as htmlToPdfmake from 'html-to-pdfmake';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.css']
})
export class SalesReportComponent implements OnInit {

  block = false;
  pdfBlock = false;
  period_end: string;
  period_start: string;
  @ViewChild('salescontent') content: ElementRef;

  constructor(private dialog: MatDialog, private reportService: ReportService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  openDialog() {
    const dialogRef = this.dialog.open(FilterDialogComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (this.reportService.fromDate != null || this.reportService.toDate != null) {
        this.block = true;
        this.reportService.getSalesReport().subscribe(
          (response) => {
            this.block = false;
            this.period_start = this.reportService.fromDate;
            this.period_end = this.reportService.toDate;
          },
          (error) => {
            this.block = false;
            this.toastr.error(error.message, 'Failed to load report');
          }
        )
      }
    });
  }

  savePdf() {
    const pdfTable = this.content.nativeElement;
    const html = htmlToPdfmake(pdfTable.innerHTML);
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).download();
  }
}
