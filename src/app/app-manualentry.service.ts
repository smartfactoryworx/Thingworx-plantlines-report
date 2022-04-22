import { Injectable } from '@angular/core';
import { Observable, Observer, from, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ManualEntryService {
  path;
  dataLoaded: false;
  // public checkDataLoaded : Observer<Boolean> = new BehaviorSubject(false);

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  getDataLoaded(data) {
    this.dataLoaded = data;
    // this.checkDataLoaded.next(this.dataLoaded);
  }


  GetApiURL() {
    return this.httpClient.get('configs/api/api_server.json');
  }

  GetMachineData(URL, dataSource, body): Observable<object> {
    console.log(URL + dataSource + '&body=' + body);
    return this.httpClient.get(URL + dataSource + '&body=' + body);
  }

  GetMachineRowData(MachineName): Observable<object> {
    //https://capl91gn-lines-postgres.testing.smartfactoryworx.net/api/?machine=PM21176a
    return this.httpClient.get('https://capl91gn-lines-postgres.testing.smartfactoryworx.net/api/machinedata?machine=' + MachineName);
  }

  PostFaultData(URL, data): Observable<object> {
    console.log(URL, data)
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    return this.httpClient.post(URL, data, options);
  }
}
