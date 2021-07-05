import { Injectable } from '@angular/core';
import { from, Observable, Observer } from 'rxjs';
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

    PostMachinedata(URL, data): Observable<object> {
        console.log(URL, data);
        let headers = new HttpHeaders({
            'Accept': 'application/json',
            'appKey': 'a6ad66f8-990f-4c1d-8366-86c143868b5f',
            'Content-Type': 'application/json',
        })
        // .append('withCredentials', true);
        // .append('Set-Cookie', 'SameSite=None');
        // .append('Set-Cookie', 'SameSite=None');
        // : true, 'access-control-allow-origin': "http://localhost:4500/", 'Content-Type': 'application/json'
        let options = { headers: headers }
        console.log(options);
        //console.log(URL + '/api/sap?token=sfw0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ8', data);
        //return this.httpClient.post(URL + '/api/sap', data, options);
        return this.httpClient.post('http://103.205.66.170:8082/Thingworx/Things/current&TempReport/Services/getCurrentTempReport', data, options);
        //return this.httpHeadersService.post(URL + '/Thingworx/Things/current&TempReport/Services/getCurrentTempReport',data,'Content-Type','Accept','appKey','application/json','application/json','a6ad66f8-990f-4c1d-8366-86c143868b5f');
    }


    GetMachineData(URL,body)
    {
        //return this.httpClient.get(URL)
        console.log(URL, body);
        console.log('http://localhost:3000/thing?URL=' + URL + '&body=' + body);
        return this.httpClient.get('http://localhost:3000/thing?URL=' + URL + '&body=' + JSON.stringify(body));
    }

}
