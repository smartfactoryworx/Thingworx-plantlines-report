import { Injectable } from '@angular/core';
import { Observable, Observer, from } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
    providedIn: 'root'
})
export class ManualEntryService {
    path;

    constructor(private httpClient: HttpClient, private router: Router) {
    }


    GetApiURL(){
        return  this.httpClient.get('configs/api/api_server.json');
    }

    GetMachineData(URL, dataSource, body): Observable<object> {
        console.log(URL + dataSource + '&body=' + body);
        return this.httpClient.get(URL + dataSource + '&body=' + body);
    }



}
