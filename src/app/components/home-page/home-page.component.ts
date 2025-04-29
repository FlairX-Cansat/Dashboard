import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { DataService } from '../../services/data.service';
import { MissionData } from '../../interfaces/mission-data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-page',
  imports: [
    MatCardModule,
    CommonModule
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {
  missions: string[] = [];
  lastMissionData: MissionData[] = [];
  selectedMission? = '';
  temperature: number[] = [];
  temperatureMoyenne: number = 0;
  pressure: number[] = [];
  averagePressure: number = 0;
  altitude: number[] = [];
  averageSpeed: number = 0;
  pm1Std: number[] = [];
  pm25Std: number[] = [];
  pm10Std: number[] = [];
  averagePm1Std: number = 0;
  averagePm25Std: number = 0;
  averagePm10Std: number = 0;
  pm1Atm: number[] = [];
  pm25Atm: number[] = [];
  pm10Atm: number[] = [];
  averagePm1Atm: number = 0;
  averagePm25Atm: number = 0;
  averagePm10Atm: number = 0;

  ngOnInit() {
    this.data.data$.subscribe(data => {
      this.lastMissionData = data;
      this.temperature = this.lastMissionData.map(data => Number(data.temperature));
      this.temperature.sort((a, b) => a - b);
      let temperatureSum = 0;
      for (let i = 0; i <= (this.temperature.length - 1); i++) {
        temperatureSum+=this.temperature[i];
      }
      this.temperatureMoyenne = temperatureSum/this.temperature.length;
      this.pressure = this.lastMissionData.map(data => Number(data.pression));
      this.pressure.sort((a, b) => a - b);
      let pressurSum = 0;
      for (let i = 0; i <= (this.pressure.length - 1); i++) {
        pressurSum+=this.pressure[i];
      }
      this.averagePressure = pressurSum/this.pressure.length;
      this.altitude = this.lastMissionData.map(data => Number(data.altitude));
      console.log(this.lastMissionData.at(-1));
      console.log(this.lastMissionData[0]);
      const lastAltitude = this.altitude.at(-1);
      const firstAltitude = this.altitude.at(0);
      const firstDate = this.lastMissionData.at(0)?.date.getTime();
      const lastDate = this.lastMissionData.at(-1)?.date.getTime();
      if (typeof lastAltitude === 'number' && typeof firstAltitude === 'number' && typeof lastDate === 'number' && typeof firstDate === 'number')
      this.averageSpeed = (lastAltitude - firstAltitude)/(lastDate-firstDate);
      this.altitude.sort((a, b) => a - b);
      this.pm1Std = this.lastMissionData.map(data => Number(data.PM_STD_1));
      this.pm25Std = this.lastMissionData.map(data => Number(data.PM_STD_2_5));
      this.pm10Std = this.lastMissionData.map(data => Number(data.PM_STD_10));
      let pm1StdSum = 0;
      let pm25StdSum = 0;
      let pm10StdSum = 0;
      for (let i = 0; i <= (this.pm1Std.length - 1); i++) {
        pm1StdSum+=this.pm1Std[i];
      }
      for (let i = 0; i <= (this.pm25Std.length - 1); i++) {
        pm25StdSum+=this.pm25Std[i];
      }
      for (let i = 0; i <= (this.pm10Std.length - 1); i++) {
        pm10StdSum+=this.pm10Std[i];
      }
      this.averagePm1Std = pm1StdSum/this.pm1Std.length;
      this.averagePm25Std = pm25StdSum/this.pm25Std.length;
      this.averagePm10Std = pm10StdSum/this.pm10Std.length;
      this.pm1Atm = this.lastMissionData.map(data => Number(data.PM_ATM_1));
      this.pm25Atm = this.lastMissionData.map(data => Number(data.PM_ATM_2_5));
      this.pm10Atm = this.lastMissionData.map(data => Number(data.PM_ATM_10));
      let pm1AtmSum = 0;
      let pm25AtmSum = 0;
      let pm10AtmSum = 0;
      for (let i = 0; i <= (this.pm1Atm.length - 1); i++) {
        pm1AtmSum+=this.pm1Atm[i];
      }
      for (let i = 0; i <= (this.pm25Atm.length - 1); i++) {
        pm25AtmSum+=this.pm25Atm[i];
      }
      for (let i = 0; i <= (this.pm10Atm.length - 1); i++) {
        pm10AtmSum+=this.pm10Atm[i];
      }
      this.averagePm1Atm = pm1AtmSum/this.pm1Atm.length;
      this.averagePm25Atm = pm25AtmSum/this.pm25Atm.length;
      this.averagePm10Atm = pm10AtmSum/this.pm10Atm.length;
    });

    this.data.missions$.subscribe(missions => {
      this.missions = missions;
      this.selectedMission = missions.at(-1);
      if (this.selectedMission) {
        this.data.getData(this.selectedMission);
      }
    });

    this.data.getMissions();
  }

  constructor(private data: DataService) { }
}
