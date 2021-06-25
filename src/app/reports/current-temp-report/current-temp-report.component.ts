import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ManualEntryService } from '../app-manualentry.service';

@Component({
  selector: 'app-current-temp-report',
  templateUrl: './current-temp-report.component.html',
  styleUrls: ['./current-temp-report.component.scss']
})
export class CurrentTempReportComponent implements OnInit {

  currenttemp: FormGroup;
  machine: FormControl;
  errorText;
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
      "Machine": "IP21033a"
    }
    this.httpClient.get('configs/api/api_server.json').subscribe(apipath => {
      console.log(apipath['api']);
      this.dataentryservice.PostMachinedata(apipath['api'], MachineData).subscribe(machinedata => {
        console.log(machinedata, "machinedata");
      });
    });
  }
}
