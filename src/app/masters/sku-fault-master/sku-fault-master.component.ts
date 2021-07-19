import { Component, OnInit, Input, SimpleChanges, ɵConsole, ViewChild } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ManualEntryService } from '../../app-manualentry.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as _moment from 'moment';
import { default as _rollupMoment, Moment } from 'moment';
import { UtilService } from 'src/app/util.service';
const moment = _rollupMoment || _moment;


interface machinelist {
  machineId: string;
  machineName: string;
  createdDate: Date;
}
@Component({
  selector: 'app-sku-fault-master',
  templateUrl: './sku-fault-master.component.html',
  styleUrls: ['./sku-fault-master.component.scss']
})
export class SkuFaultMasterComponent implements OnInit {

  constructor(private httpClient: HttpClient, private manualentryservice: ManualEntryService,private util: UtilService) { }

  ngOnInit(): void {
    this.createmaster();
    this.createmasterForm();
    this.GetMachineData();
    this.BindDefaultData();
  }

  masterform: FormGroup;
  machine: FormControl;
  public MachineList: machinelist[] = [];
  public filteredMachine = this.MachineList.slice();

  createmaster() {
    this.machine = new FormControl('', Validators.required);
  }
  createmasterForm() {
    this.masterform = new FormGroup({
      machine: this.machine,
    });
  }

  BindDefaultData() {
    this.machine.setValue('RU21005a');
  }

  GetMachineData() {
    this.MachineList = [];
    this.manualentryservice.GetApiURL().subscribe(apipath => {
      console.log(apipath['apithings']);
      let body = {};
      let dataSource = 'MachineDetailsMaster/Services/GetDataTableEntries'
      this.manualentryservice.GetMachineData(apipath['apithings'], dataSource, JSON.stringify(body)).subscribe((machineList: any) => {
        // console.log(machineList['rows'], "machineList");
        var c = machineList['rows'];
        for (let i = 0; i < c.length; i++) {
          const a = c[i];
          const data = {
            machineId: a.Machine_MDS,
            machineName: a.Machine_Name,
            createdDate: new Date(moment(a.timestamp).format("DD MMM YYYY hh:mm a")),
            machineDetails: a.Machine_MDS + ' - ' + a.Machine_Name + ' - ' + a.Customer_Name + '(' + moment(new Date(a.timestamp)).format("DD-MM-YYYY") + ')'
          }
          this.MachineList.push(data);
        }
        this.MachineList.sort(this.util.dynamicSort('createdDate'));
        this.filteredMachine = this.MachineList.slice();
        console.log(this.filteredMachine);
        console.log(this.MachineList, "MachineData");
      });


    });
  }
}
