import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { DataService } from '../../services/data.service';
import { MatTableModule } from '@angular/material/table'
import { MissionData } from '../../interfaces/mission-data';

@Component({
  selector: 'app-data-page',
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatTableModule,
    CommonModule
  ],
  templateUrl: './data-page.component.html',
  styleUrl: './data-page.component.scss',
  providers: [DatePipe]
})
export class DataPageComponent implements OnInit {
  missionName = '';
  missions: string[] = [];
  displayedColumns: string[] = ['Date', 'Température', 'Pression', 'Altitude', 'PM1.0(STD, ug/m3)', 'PM2.5(STD, ug/m3)', 'PM10(STD, ug/m3)', 'PM1.0(ATM, ug/m3)', 'PM2.5(ATM, ug/m3)', 'PM10(ATM, ug/m3)'];
  tableData: MissionData[] = [];

  selectionChanged(event: any) {
    this.data.getData(this.missionName);
  }

  ngOnInit() {
    this.data.missions$.subscribe(missions => {
      this.missions = missions;
    });

    this.data.data$.subscribe(data => {
      this.tableData = data;
    })

    this.data.getMissions();
  }

  constructor(private data: DataService) { }
}
