import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent  {


  @ViewChild('sidenav') sidenav: MatSidenav;
 
  isExpanded = true;
  showMastersSubmenu: boolean = true;
  showReportsSubmenu: boolean = true;
  showManualEntrySubmenu: boolean = true;
  isShowing = false;
 // showSubSubMenu: boolean = false;



}