import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit, Input, SimpleChanges, ɵConsole, ViewChild, OnChanges } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ManualEntryService } from '../../app-manualentry.service';
import { TableUtilsService } from '../../table-utils.service';
import * as jspreadsheet from 'jspreadsheet-ce';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as _moment from 'moment';
import { default as _rollupMoment, Moment } from 'moment';
import { UtilService } from 'src/app/util.service';
import { FaultDialogComponent } from './fault-dialog/fault-dialog.component';
const moment = _rollupMoment || _moment;

interface faultTableData {
  ID?: string;
  FaultCode?: number;
  FaultDescription?: string;
}

interface fault {
  key?: string;
  source?: string;
  sourceType?: string;
  timestamp?: string;
  FaultCode?: number;
  FaultDescription?: string;
  ID?: string;
  Machine_Selected?: string;
  typeSelected?: string;
}
@Component({
  selector: 'app-fault',
  templateUrl: './fault.component.html',
  styleUrls: ['./fault.component.scss']
})
export class FaultComponent implements OnChanges {

  machineName: any;
  table: any;
  //FaultPostData = [];
  constructor(private httpClient: HttpClient, private _snackBar: MatSnackBar, private manualentryservice: ManualEntryService, private tableutil: TableUtilsService, private util: UtilService) { }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }


  gotData: boolean = false;
  public faultData: fault[] = [];
  public FaultTableData: faultTableData[] = [];
  errorText;
  noData;


  GetfaultData(machine) {
    this.machineName = machine;
    this.FaultTableData = [];
    this.gotData = false;
    console.log(machine, "machine");
    let body = {
      "Machine": machine,
    }
    console.log(JSON.stringify(body));
    let dataSource = 'MachineFaultMaster/Services/getFaultMastersData'

    this.manualentryservice.GetApiURL().subscribe(apipath => {
      console.log(apipath['api']);
      this.manualentryservice.GetMachineData(apipath['apithings'], dataSource, JSON.stringify(body)).subscribe((faultdata: any) => {
        console.log("faultdata", faultdata);
        var c = faultdata.rows;
        for (let i = 0; i < c.length; i++) {
          const data = c[i]
          const allFaultData = {
            ID: data.ID,
            FaultCode: data.FaultCode,
            FaultDescription: data.FaultDescription,
          }
          this.FaultTableData.push(allFaultData);
        }
        console.log("FaultTableData", this.FaultTableData);
        this.jexcelGridView();
        this.gotData = true;
      });
    });
  }

  jexcelGridView() {
    //jexcel(this.spreadsheet.nativeElement.innerHTML = '');
    document.getElementById('spreadsheet').innerHTML = '';
    this.table = jspreadsheet(document.getElementById('spreadsheet'), {
      data: this.FaultTableData,
      search: true,
      pagination: 20,
      paginationOptions: [20, 40, 60],
      allowExport: true,
      tableHeight: '800px',
      defaultColWidth: 150,
      contextMenu: true,
      allowInsertRow: true,
      allowInsertColumn: false,
      button: true,
      rowResize: true,
      columnDrag: true,
      colHeaders: ['ID', 'Fault Code', 'Fault Description'],
      columns: [
        { type: 'hidden', width: 300, readOnly: false },
        { type: 'text', width: 150, readOnly: false },
        { type: 'tex', width: 600, readOnly: false },
      ],
      // insertRow:this.Addnewrow,

      onchange: this.onchange,
      // onafterchange:this.UT,
      // handler:this.handler,
      // onselection: this.selected,
      // updateTable:this.UT
    });
    // console.log(jexcel(this.spreadsheet.nativeElement.headers));
    // jexcel(this.spreadsheet.nativeElement.headers.style.backgroundColor ='red');
  }
  onchange(instance, cell, x, y, value, cellName) {
    console.log("onchange called");
    console.log(instance, "instance");
    console.log(cell, "cell");
    console.log(this.table);
    console.log(x, "column number");
    console.log(y, "row number");
    console.log(value, "value");
    console.log(cellName, "cellName");

    console.log('New change on cell ' + jspreadsheet.getColumnNameFromId([4, y]) + ' to: ' + value + '');
    // instance.td
    // instance.thead.firstElementChild.children[x].style.backgroundColor = "red";
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    console.log(this.machineName);
    this.GetfaultData(this.machineName);
  }

  postfaultData() {
    console.log(this.machineName);
    console.log(this.table.getData());

    let faultDetails;
    faultDetails = this.table.getData();
    console.log(faultDetails.length);
    let ID = faultDetails.map(function (x) {
      return x[0];
    });
    // console.log(date, "date");
    let FaultCode = faultDetails.map(function (x) {
      return x[1];
    });
    let FaultDescription = faultDetails.map(function (x) {
      return x[2];
    });

    if (this.machineName !== null) {
      for (let i = 0; i <= faultDetails.length - 1; i++) {
        const T = {
          "ID": ID[i],
          "Machine_Selected": this.machineName,
          "FaultCode": FaultCode[i],
          "FaultDescription": FaultDescription[i]
        }
        console.log(JSON.stringify(T), "FaultPostData");
        let dataSource = 'MachineFaultMaster/Services/addFaultsInDataTableFromFrontEnd'
        this.manualentryservice.GetApiURL().subscribe(apipath => {
          console.log(apipath['api']);
          this.manualentryservice.GetMachineData(apipath['apithings'], dataSource, JSON.stringify(T)).subscribe(
            (data: any[]) => {
              console.log(data);
              // this.GetfaultData(this.machineName);
              this.openSnackBar("Success", "Records Added or Updated Successfully");
            },
            (error: HttpErrorResponse) => {
              //console.log(error);
              if (error.status >= 400) {
                this.openSnackBar("Validation", error.error);
              }
              else {
                this.openSnackBar("Error", error.error);
              }
            });
        });
      }

    }



  }

  exportTable() {
    this.tableutil.exportArrayToExcel(this.faultData, "Fault_Master", "Fault_Master");
  }
}

