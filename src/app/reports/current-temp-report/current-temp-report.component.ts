import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { WebDataRocksPivot } from '../@webdatarocks/webdatarocks.angular4';
import { ManualEntryService } from '../app-manualentry.service';
import * as _moment from 'moment';
import { default as _rollupMoment, Moment } from 'moment';
const moment = _rollupMoment || _moment;

@Component({
  selector: 'app-current-temp-report',
  templateUrl: './current-temp-report.component.html',
  styleUrls: ['./current-temp-report.component.scss']
})
export class CurrentTempReportComponent implements OnInit {

  @ViewChild("pivot1") child: WebDataRocksPivot;
  currenttemp: FormGroup;
  machine: FormControl;
  date = new FormControl(moment());
  public tempData = [];
  errorText;
  pivotTableReportComplete: boolean = false;
  public DataWithStructure = [];
  constructor(private httpClient: HttpClient, protected dataentryservice: ManualEntryService) { }

  createCurrentTemp() {
    this.machine = new FormControl('', Validators.required);
    this.date = new FormControl('', Validators.required);
  }
  createCurrentTempForm() {
    this.currenttemp = new FormGroup({
      machine: this.machine,
    });
  }

  BindDefaultData() {
    this.machine.setValue('IP21033a');
  }
  ngOnInit(): void {
    this.createCurrentTemp();
    this.createCurrentTempForm();
    this.BindDefaultData();
  }

  PostCurrentTemp(machine) {
    console.log(machine, "machine")
    let MachineData = {
      Machine: "IP21033a"
    }
    this.httpClient.get('configs/api/api_server.json').subscribe(apipath => {
      console.log(apipath['api']);
      // this.dataentryservice.PostMachinedata(apipath['api'],MachineData).subscribe((machinedata:any) => {
      //   console.log("machinedata", machinedata);
      //   this.tempData.push(machinedata.rows);
      //   console.log("tempData", this.tempData);
      // });
    });
  }

  customizeToolbar(toolbar) {
    let tabs = toolbar.getTabs();
    //console.log(tabs);
    toolbar.getTabs = function () {
      // delete tabs[0];
      // delete tabs[1];
      // delete tabs[2];
      // delete tabs[3];
      // delete tabs[4];
      // delete tabs[5];
      // delete tabs[6];
      return tabs;
    }
  }
  
  onReportComplete(): void {
    console.log("*****************************onReportComplete****************************");
    this.BindReportData(this.tempData);
    this.child.webDataRocks.off("reportcomplete");
    this.pivotTableReportComplete = true;
    

  }

  BindReportData(reportData){
    console.log(reportData);
    this.child.webDataRocks.off("reportcomplete");
    var setReportType;
    setReportType= {
      dataSource: {
        data: reportData[0],
      },
    };
    this.child.webDataRocks.setReport(setReportType);

  }
}
