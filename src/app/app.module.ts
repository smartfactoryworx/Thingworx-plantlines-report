import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { CurrentTempReportComponent } from './reports/current-temp-report/current-temp-report.component';
import { ReportsComponent } from './reports/reports.component';
import { ReportsModule } from './reports/reports.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
