import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit, Input, SimpleChanges, ɵConsole, ViewChild, OnChanges } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ManualEntryService } from '../../app-manualentry.service';
import { TableUtilsService } from '../../table-utils.service';
import { SkuDialogComponent } from './sku-dialog/sku-dialog.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as _moment from 'moment';
import { default as _rollupMoment, Moment } from 'moment';
import { UtilService } from 'src/app/util.service';
const moment = _rollupMoment || _moment;

interface sku {
  key?: string;
  source?: string;
  sourceType?: string;
  timestamp?: string;
  CasesPerPallet?: number;
  ID?: string;
  Machine_Selected?: string;
  Product_Details?: string;
  SKU_Code?: number;
  SKU_Details?: string;
  SKU_RatedSpeed?: number;
  Standard_ChangeOver_Time?: string;
}

@Component({
  selector: 'app-sku',
  templateUrl: './sku.component.html',
  styleUrls: ['./sku.component.scss']
})
export class SkuComponent implements OnChanges {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  //@Input() machine: string
  constructor(private httpClient: HttpClient, private _snackBar: MatSnackBar, public dialog: MatDialog, private manualentryservice: ManualEntryService, private tableutil: TableUtilsService, private util: UtilService) { }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  displayedColumns: string[];// = ['position', 'name', 'weight', 'symbol'];
  gotData: boolean = false;
  vdisplayedColumns: string[];
  public skuData: sku[] = [];
  dataSource: MatTableDataSource<sku>;
  errorText = "";
  noData;
  machineName;

  displayedColumnsAs = {
    key: { 'DN': 'Key', 'visible': true },
    source: { 'DN': 'Source', 'visible': true },
    sourceType: { 'DN': 'Source Type', 'visible': true },
    timestamp: { 'DN': 'Date', 'visible': true },
    CasesPerPallet: { 'DN': 'Cases Per Pallet', 'visible': true },
    ID: { 'DN': 'ID', 'visible': true },
    Machine_Selected: { 'DN': 'Machine Selected', 'visible': true },
    Product_Details: { 'DN': 'Product Details', 'visible': true },
    SKU_Code: { 'DN': 'SKU Code', 'visible': false },
    SKU_Details: { 'DN': 'SKU Details', 'visible': false },
    SKU_RatedSpeed: { 'DN': 'SKU RatedSpeed', 'visible': true },
    Standard_ChangeOver_Time: { 'DN': 'Standard ChangeOver Time', 'visible': true },
  }
  getDisplayedColumns() {
    return this.displayedColumnsAs;
  }




  GetSKUData(machine) {
  this.machineName = machine;
    this.errorText = "";
    this.skuData = [];
    this.gotData = false;
    console.log(machine, "machine");
    let body = {
      "Machine": machine,
    }

    console.log(JSON.stringify(body));

    let dataSource = 'LineSKUmaster/Services/getSKUMastersData'

    this.manualentryservice.GetApiURL().subscribe(apipath => {
      console.log(apipath['api']);
      this.manualentryservice.GetMachineData(apipath['apithings'], dataSource, JSON.stringify(body)).subscribe((skudata: any) => {
        console.log("skudata", skudata);
        var c = skudata.rows;
        //if(c.length != 0){
        for (let i = 0; i < c.length; i++) {
          const data = c[i]

          const allSKUData = {
            key: data.key,
            source: data.source,
            sourceType: data.sourceType,
            timestamp: moment(data.timestamp).format("DD MMM YYYY hh:mm a"),
            CasesPerPallet: data.CasesPerPallet,
            ID: data.ID,
            Machine_Selected: data.Machine_Selected,
            Product_Details: data.Product_Details,
            SKU_Code: data.SKU_Code,
            SKU_Details: data.SKU_Details,
            SKU_RatedSpeed: data.SKU_RatedSpeed,
            Standard_ChangeOver_Time: data.Standard_ChangeOver_Time,
          }
          this.skuData.push(allSKUData);
        }
        console.log("skuData", JSON.stringify(this.skuData));
        this.vdisplayedColumns = [];
        //console.log(this.fgextype[0]);
        if (Object.keys(skudata).length > 0) {
          if (this.skuData.length > 0) {
            for (let i = 0; i < Object.keys(this.skuData[0]).length; i++) {
              this.vdisplayedColumns.push(Object.keys(this.skuData[0])[i]);
              //console.log("function");
            }
            this.vdisplayedColumns.push('star');
            this.gotData = true;
            this.dataSource = new MatTableDataSource(this.skuData);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.displayedColumns = this.vdisplayedColumns;
            this.noData = this.dataSource.filteredData.length;
          }
          else {
            console.log('hide data');
            this.dataSource = new MatTableDataSource(this.skuData);
            this.noData = this.dataSource.filteredData.length;
            this.errorText = "No Records Found";
          }
        }
        else {
          this.gotData = true;
          this.dataSource = null;
          this.displayedColumns = this.vdisplayedColumns;
          this.noData = this.dataSource.filteredData.length;
        }



      });
    });

  }



  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    console.log(this.machineName);
    this.GetSKUData(this.machineName);

  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  DailogAddsku() {
    //console.log('add details');
    const dialogRef = this.dialog.open(SkuDialogComponent, {
      width: '700px',
      height: '500px',
      data: {
        dataKey: {
          machine:  this.machineName,
          title: 'Add SKU',
          button: 'Add',
          key: 'AddSKU'
        }
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed', result);
      if (result !== undefined) {
        this.postSKUData(result);
      }
    });
  }

  DailogUpdatesku(element) {
    //console.log("fuction called");
    //console.log("this is updated: " + JSON.stringify(element));
    const dialogRef = this.dialog.open(SkuDialogComponent, {
      width: '700px',
      height: '500px',
      data: {
        dataKey: {
          machine:  this.machineName,
          rowdata: element,
          title: 'Update Details',
          button: 'Update',
          key: 'Update'
        }
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed', result);
      if (result !== undefined) {
        this.postSKUData(result);
      }

    });
  }

  postSKUData(result) {
    console.log(result, "Result....");
    var T = {};
    var PostData = {};
    if (result !== null) {
      T = {
        ID: result.ID,
        Machine_Selected: result.Machine_Selected,
        SKU_Code: result.SKU_Code,
        SKU_Details: result.SKU_Details,
      }
    }
    let dataSource = 'LineSKUmaster/Services/addSkuInDataTableFromFrontEnd'
    PostData = {
      "datasource": dataSource,
      "input": T 
    }
  
    console.log("Data which is being posted : " + JSON.stringify(PostData));


      this.manualentryservice.GetApiURL().subscribe(apipath => {
      console.log(apipath['apifaultthings']);
      this.manualentryservice.PostFaultData(apipath['apifaultthings'], JSON.stringify(PostData)).subscribe(
        (data: any[]) => {
          //this.GetCycleData(this.machineName);
          console.log(data);
          this.openSnackBar("Success", "Records Added or Updated Successfully");
          this.GetSKUData(this.machineName);
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

  exportTable() {
    this.tableutil.exportArrayToExcel(this.skuData, "SKU_Master", "SKU_Master");
  }
}
