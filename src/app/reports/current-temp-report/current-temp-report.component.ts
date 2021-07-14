import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { WebDataRocksPivot } from '../@webdatarocks/webdatarocks.angular4';
import { ManualEntryService } from '../app-manualentry.service';
import * as _moment from 'moment';
import { default as _rollupMoment, Moment } from 'moment';
const moment = _rollupMoment || _moment;



interface machinelist {
  machineId: string;
  machineName: string;
}
@Component({
  selector: 'app-current-temp-report',
  templateUrl: './current-temp-report.component.html',
  styleUrls: ['./current-temp-report.component.scss']
})
export class CurrentTempReportComponent implements OnInit {

  @ViewChild("pivot1") child: WebDataRocksPivot;
  currenttemp: FormGroup;
  machine: FormControl;
  gotData: boolean = true;
  public tempData = [];
  tempDataDateList;
  parametersList;
  errorText;
  pivotTableReportComplete: boolean = false;
  public DataWithStructure = [];
  public MachineList: machinelist[];
  constructor(private httpClient: HttpClient, protected dataentryservice: ManualEntryService) { }

  createCurrentTemp() {
    this.machine = new FormControl('', Validators.required);

  }
  createCurrentTempForm() {
    this.currenttemp = new FormGroup({
      machine: this.machine,
    });
  }

  BindDefaultData() {
    this.machine.setValue('RC200115a');
  }
  ngOnInit(): void {
    this.createCurrentTemp();
    this.createCurrentTempForm();
    this.GetMachineData();
    this.BindDefaultData();
    this.GetCurrentTemp(this.machine.value);
  }

  GetMachineData() {
    this.MachineList = [];
    this.httpClient.get('configs/api/api_server.json').subscribe(apipath => {
      console.log(apipath['api']);
      let body = {};
      let dataSource = 'MachineDetailsMaster/Services/GetDataTableEntries'
      this.dataentryservice.GetMachineData(apipath['apithings'], dataSource, JSON.stringify(body)).subscribe((machineList: any) => {
        // console.log(machineList['rows'], "machineList");
        var c = machineList['rows'];
        for (let i = 0; i < c.length; i++) {
          const a = c[i];
          const data = {
            machineId: a.Machine_MDS,
            machineName: a.Machine_Name
          }
          this.MachineList.push(data);
        }

        console.log(this.MachineList, "MachineData");
      });

    });
  }
  GetCurrentTemp(machine) {
    this.tempData = [];
    this.gotData = false;
    console.log(machine, "machine")
    let body = {
      "Machine": machine
    }


    console.log(JSON.stringify(body));

    let dataSource = 'current%26TempReport/Services/getCurrentTempReport'
    this.dataentryservice.GetApiURL().subscribe(apipath => {
      console.log(apipath['api']);
      this.dataentryservice.GetMachineData(apipath['apithings'], dataSource, JSON.stringify(body)).subscribe((machinecurrenttemp: any) => {
        //  console.log("machinecurrenttemp", machinecurrenttemp);
        this.tempData.push(machinecurrenttemp.rows);
        console.log("tempData", this.tempData);
        const dates = machinecurrenttemp.rows[0]

        this.tempDataDateList = Object.keys(dates);
        this.tempDataDateList.splice(0, 1);
        console.log(this.tempDataDateList);

        this.parametersList = this.tempData[0].map(value => value.Title);

        this.parametersList.splice(0, 1, "Date");
        console.log(this.parametersList);

        const objectCreation = this.parametersList.reduce((acc, curr) => (acc[curr] = '', acc), {});
        console.log(objectCreation);

        var currentData = [objectCreation];
        console.log(currentData);

        for (let i = 0; i < this.tempDataDateList.length; i++) {
          //currentData[i]['Date'] = this.tempDataDateList[i]
          //console.log(this.tempDataDateList[i]);
          var c = new Object();
          c['Date'] = this.tempDataDateList[i];
          currentData.push(c)
        }
        console.log(currentData);
        this.gotData = true;
      });
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

  BindReportData(reportData) {
    console.log(reportData);
    this.child.webDataRocks.off("reportcomplete");
    var setReportType;
    setReportType = {
      dataSource: {
        data: reportData[0],
      },
    };
    this.child.webDataRocks.setReport(setReportType);

  }
}
