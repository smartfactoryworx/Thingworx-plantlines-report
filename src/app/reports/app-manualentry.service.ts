import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ManualEntryService {

    constructor(private httpClient: HttpClient) {
    }

    GetServerAPIPath(): Observable<object> {

        return this.httpClient.get('./api/api_server.json');
    }

    //GetShiftDetails(URL, lineid): Observable<object> {
    GetShiftDetails(): Observable<any> {
        //console.log(URL + '/api/manual/shift?line_id=' + lineid);
        return this.httpClient.get( '/api/manual/shift');
    }

    //GetPreviousShift(URL): Observable<object> {
    GetPreviousShift(): Observable<object> {
        //console.log(URL + '/api/shift/preshiftcalculation');
        return this.httpClient.get( '/api/shift/preshiftcalculation');
    }

    ConvertToLocalTimezone(inputdate) {
        //console.log(inputdate);
        //console.log(inputdate.toLocaleString("en-US", { timeZone: "Asia/Muscat" }));
        return new Date(inputdate).toLocaleString("en-US", { timeZone: "Asia/Muscat" });
    }
    //GetEquipmentdata(lineid, URL, type): Observable<object> {
    GetEquipmentdata(): Observable<any> {
        //console.log(URL + '/api/manual/equipment/' + lineid + '?type=' + type);
        //return this.httpClient.get(URL + '/api/manual/equipment/' + lineid + '?type=' + type);
        // return this.httpClient.get('/api/manual/equipment/5f0809fdc2b1ce30cc53eb8d?type=all')
        return this.httpClient.get('/api/manual/equipmentNew?type=all');
    }
    //GetEventDataForChart(URL, date, shift, type, lineid): Observable<object> {
    GetEventDataForChart( date, shift, type): Observable<object> {
        //console.log(URL + '/api/trend/shifthistory?date=' + date + '&shift=' + shift + '&type=' + type + '&line_id=' + lineid + '');
        return this.httpClient.get( '/api/trend/shifthistory?date=' + date + '&shift=' + shift + '&type=' + type );
    }
    //GetLineData(URL): Observable<object> {
    GetLineData(): Observable<object> {
        return this.httpClient.get( '/api/manual/company');
    }
    //GetBatchNames(URL, LineID) {
    GetBatchNames() {
        return this.httpClient.get( '/api/manual/batchtrigger');
    }
    GetDatapattern(): Observable<object> {
        return this.httpClient.get('configs/apix/data_pattern.json');
    }
    // GetShiftEndReport(URL, LineID, shiftdate, shiftname): Observable<object> {
    GetShiftEndReport(shiftdate, shiftname): Observable<object> {
        //console.log(URL + '/api/report/shift?line_id=' + LineID + '&shift=' + shiftname + '&date=' + shiftdate);

        return this.httpClient.get( '/api/report/shift?' + '&shift=' + shiftname + '&date=' + shiftdate);
    }
    //GetBatchDetailsForReport(URL, LineID, BatchNo) {
    GetBatchDetailsForReport(BatchNo) {
        //console.log(URL + '/api/report/batch?line_id=' + LineID + '&batch=' + BatchNo);
        return this.httpClient.get( '/api/report/batch?'+ 'batch=' + BatchNo);
      }

}
