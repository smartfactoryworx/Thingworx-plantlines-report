import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Router } from '@angular/router';
import { AppHttpheadersService } from './app-httpheaders.service';

@Injectable({
    providedIn: 'root'
})
export class ManualEntryService {
    path;
    public lineId;
    public lineName;
    constructor(private httpClient: HttpClient, private router: Router, private httpHeadersService: AppHttpheadersService) {
    }

    getLineId() {
        let exactLineRoute = '';
        const lineRoute = this.router.url.split('/');
        console.log(lineRoute, lineRoute.length, "Novoppppppp")
        for (let i = 1; i < 6; i++) {
            exactLineRoute += '/' + lineRoute[i]

        }
        console.log(exactLineRoute, 'ghostly');
        return exactLineRoute;
    }
    GetServerAPIPath(): Observable<object> {

        return this.httpClient.get('./api/api_server.json');
    }

    //GetShiftDetails(URL, lineid): Observable<object> {
    GetShiftDetails(): Observable<any> {
        //console.log(URL + '/api/manual/shift?line_id=' + lineid);
        return this.httpClient.get('/api/manual/shift');
    }

    //GetPreviousShift(URL): Observable<object> {
    GetPreviousShift(): Observable<object> {
        //console.log(URL + '/api/shift/preshiftcalculation');
        return this.httpClient.get('/api/shift/preshiftcalculation');
    }

    ConvertToLocalTimezone(inputdate) {
        //console.log(inputdate);
        //console.log(inputdate.toLocaleString("en-US", { timeZone: "Asia/Muscat" }));
        return new Date(inputdate).toLocaleString("en-US", { timeZone: "asia/kolkata" });
    }
    //GetEquipmentdata(lineid, URL, type): Observable<object> {
    GetEquipmentdata(lineId): Observable<any> {
        //console.log(URL + '/api/manual/equipment/' + lineid + '?type=' + type);
        //return this.httpClient.get(URL + '/api/manual/equipment/' + lineid + '?type=' + type);
        // return this.httpClient.get('/api/manual/equipment/5f0809fdc2b1ce30cc53eb8d?type=all')
        return this.httpClient.get('/api/manual/equipmentNew?type=all&line_id=' + lineId);
    }
    //GetEventDataForChart(URL, date, shift, type, lineid): Observable<object> {
    GetEventDataForChart(date, shift, type, lineId): Observable<object> {
        //console.log(URL + '/api/trend/shifthistory?date=' + date + '&shift=' + shift + '&type=' + type + '&line_id=' + lineid + '');
        return this.httpClient.get('/api/trend/shifthistory?date=' + date + '&shift=' + shift + '&type=' + type + '&line_id=' + lineId);
    }
    //GetLineData(URL): Observable<object> {
    GetLineData(): Observable<object> {
        return this.httpClient.get('/api/manual/company');
    }
    //GetBatchNames(URL, LineID) {
    GetBatchNames() {
        return this.httpClient.get('/api/manual/batchtrigger');
    }
    GetDatapattern(): Observable<object> {
        return this.httpClient.get('configs/apix/data_pattern.json');
    }

    GetBatchEndDatapattern(): Observable<object> {
        return this.httpClient.get('configs/apix/batch_end_data_pattern.json');
    }
    GetShiftEndDatapattern(): Observable<object> {
        return this.httpClient.get('configs/apix/shift_end_data_pattern.json');
    }

    // GetShiftEndReport(URL, LineID, shiftdate, shiftname): Observable<object> {
    GetShiftEndReport(shiftdate, shiftname): Observable<object> {
        //console.log(URL + '/api/report/shift?line_id=' + LineID + '&shift=' + shiftname + '&date=' + shiftdate);

        return this.httpClient.get('/api/report/shift?' + '&shift=' + shiftname + '&date=' + shiftdate);
    }
    //GetBatchDetailsForReport(URL, LineID, BatchNo) {
    GetBatchDetailsForReport(BatchNo) {
        //console.log(URL + '/api/report/batch?line_id=' + LineID + '&batch=' + BatchNo);
        return this.httpClient.get('/api/report/batch?' + 'batch=' + BatchNo);
    }

    GetChangeoverData(startdate, enddate): Observable<object> {
        return this.httpClient.get('/api/changeover/changeoverreport?startDate=' + startdate + '&endDate=' + enddate);
    }

    GetFaultwiseData(startdate, enddate, machinestate, duration, lineid): Observable<object> {
        return this.httpClient.get('/api/trend/day_state_wise_report?startDate=' + startdate + '&endDate=' + enddate + '&machine_state=' + machinestate + '&duration=' + duration + '&line_id=' + lineid);
    }

    GetOutputData(startDate, endDate, line_Id): Observable<object> {
        return this.httpClient.get('/api/report/chart?startDate=' + startDate + '&endDate=' + endDate + '&line_id=' + line_Id);
    }

    GetOutputMultilinesData(startDate, endDate): Observable<object> {
        console.log('/api/report/chart?startDate=' + startDate + '&endDate=' + endDate);
        return this.httpClient.get('/api/report/chart?startDate=' + startDate + '&endDate=' + endDate);
    }

    PostShiftEmailData(data): Observable<object> {
        return this.httpClient.post('/api/manual/emailreportdata', data);
    }
    GetChangeoverMultilinesData(): Observable<object> {
        return this.httpClient.get('configs/apix/changeover_multilines_data.json');
    }

    PostMachinedata(URL, data): Observable<object> {
        console.log(URL, data);
        let headers = new HttpHeaders({
            'Accept': 'application/json',
            'appKey': 'a6ad66f8-990f-4c1d-8366-86c143868b5f',
            //'Content-Type': 'application/json',
        }).append('Accept', '*/*')
            .append('Content-Type', 'application/x-www-form-urlencoded')
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', '*')
            .append('Access-Control-Allow-Headers', '*')
            .append('Access-Control-Allow-Credentials', '*')
            .append('Set-Cookie', 'SameSite=None');
            .append('withCredentials', true);
            .append('Set-Cookie', 'SameSite=None');
            .append('Set-Cookie', 'SameSite=None');
            : true, 'access-control-allow-origin': "http://localhost:4500/", 'Content-Type': 'application/json'
        let options = { headers: headers }
        console.log(options);
        //console.log(URL + '/api/sap?token=sfw0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ8', data);
        //return this.httpClient.post(URL + '/api/sap', data, options);
        return this.httpClient.post('http://103.205.66.170:8082/Thingworx/Things/current&TempReport/Services/getCurrentTempReport', data, options);
        //return this.httpHeadersService.post(URL + '/Thingworx/Things/current&TempReport/Services/getCurrentTempReport',data,'Content-Type','Accept','appKey','application/json','application/json','a6ad66f8-990f-4c1d-8366-86c143868b5f');
    }


}
