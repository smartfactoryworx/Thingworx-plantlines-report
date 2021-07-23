import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  lastUpdated: any;

  constructor(private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.lastUpdated = this.datePipe.transform(new Date(), 'dd-MMM-yyyy hh:mm:ss')
  }


}
