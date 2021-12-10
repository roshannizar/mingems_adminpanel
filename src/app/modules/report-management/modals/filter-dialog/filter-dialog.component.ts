import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { SalesReportComponent } from '../../components/sales-report/sales-report.component';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-filter-dialog',
  templateUrl: './filter-dialog.component.html',
  styleUrls: ['./filter-dialog.component.css']
})
export class FilterDialogComponent implements OnInit {

  reportForm: FormGroup;

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<SalesReportComponent>,
    private reportService: ReportService) { }

  ngOnInit(): void {
    this.createReportForm();
  }

  createReportForm() {
    this.reportForm = this.fb.group({
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required]
    });
  }

  apply() {
    const fromDateC = new Date(this.reportForm.get('fromDate').value);
    const toDateC = new Date(this.reportForm.get('toDate').value);

    const correctfDate = `${fromDateC.getFullYear()}-${fromDateC.getMonth() + 1}-${fromDateC.getDate()}`;
    const correcttDate = `${toDateC.getFullYear()}-${toDateC.getMonth() + 1}-${toDateC.getDate()}`;

    this.reportService.fromDate = correctfDate;
    this.reportService.toDate = correcttDate;
    this.close();
  }

  close(): void {
    this.dialogRef.close();
  }

}
