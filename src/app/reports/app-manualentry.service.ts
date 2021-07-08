import { Injectable } from '@angular/core';
import { Observable, Observer, from } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppHttpheadersService } from './app-httpheaders.service';

@Injectable({
    providedIn: 'root'
})
export class ManualEntryService {
    path;

    constructor(private httpClient: HttpClient, private router: Router, private httpHeadersService: AppHttpheadersService) {
    }

    getData(data): Observable<any> {
        return from(
            fetch(
                'http://103.205.66.170:8082/Thingworx/Things/current&TempReport/Services/getCurrentTempReport', // the url you are trying to access
                {
                    headers: {

                        'appKey': 'a6ad66f8-990f-4c1d-8366-86c143868b5f',
                        'Accept': 'application/json',
                    },
                    //credentials: 'include',
                    //body: '{"Machine":"IP20060"}',
                    method: 'POST', // GET, POST, PUT, DELETE
                    mode: 'no-cors' // the most important option
                }
            ));
    }



    GetMachineData(URL, dataSource, body): Observable<object> {
        console.log(URL + dataSource + '&body=' + body);
        return this.httpClient.get(URL + dataSource + '&body=' + body);
    }



}
