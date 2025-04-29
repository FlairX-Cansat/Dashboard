import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { DataService } from '../../services/data.service';
import Chart, { ChartData, ChartItem } from 'chart.js/auto';
import { MissionData } from '../../interfaces/mission-data';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-graph-page',
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    CommonModule,
    BaseChartDirective
  ],
  templateUrl: './graph-page.component.html',
  styleUrl: './graph-page.component.scss'
})
export class GraphPageComponent implements OnInit {
  @ViewChildren(BaseChartDirective) chartRefs: QueryList<BaseChartDirective> | undefined;
  selectedMission = "";
  missions: string[] = [];
  missionData: MissionData[] = [];
  tempGraphData: ChartData<'line', number[], string> = {
    datasets: [{
      label: 'Température',
      data: []
    }]
  };
  tempGraphLabel: string[] = [];
  tempGraphYData: number[] = [];

  pressureGraph: ChartData<'line', number[], string> = {
    datasets: [{
      label: 'Pression',
      data: []
    }]
  };

  altitudeGraph: ChartData<'line', number[], string> = {
    datasets: [{
      label: 'Altitude',
      data: []
    }]
  };

  stdParticuleData: ChartData<'line', number[], string> = {
    datasets: [{
      label: 'PM1(STD, ug/m3)',
      data: []
    },
    {
      label: 'PM2.5(STD, ug/m3)',
      data: []
    },
    {
      label: 'PM10(STD, ug/m3)',
      data: []
    }
  ]
  };

  atmParticuleData: ChartData<'line', number[], string> = {
    datasets: [{
      label: 'PM1(ATM, ug/m3)',
      data: []
    },
    {
      label: 'PM2.5(ATM, ug/m3)',
      data: []
    },
    {
      label: 'PM10(ATM, ug/m3)',
      data: []
    }
  ]
  };

  updateMission(event: any) {
    this.data.getData(this.selectedMission);
  }

  ngOnInit() {
    this.data.missions$.subscribe(missions => {
      this.missions = missions;
    });

    this.data.data$.subscribe(missionData => {
      this.missionData = missionData;
      this.tempGraphLabel = this.missionData.map(data => data.date.toLocaleString('fr-FR', { timeStyle: 'medium' }));
      this.tempGraphYData = this.missionData.map(data => Number(data.temperature));

      this.tempGraphData = {
        labels: this.tempGraphLabel,
        datasets: [{
          label: 'Température',
          data: this.tempGraphYData
        }]
      }

      this.pressureGraph = {
        labels: this.tempGraphLabel,
        datasets: [{
          label: 'Pression',
          data: this.missionData.map(data => Number(data.pression))
        }]
      };

      this.altitudeGraph = {
        labels: this.tempGraphLabel,
        datasets: [{
          label: 'Altitude',
          data: missionData.map(data => Number(data.altitude))
        }]
      };

      this.stdParticuleData = {
        labels: this.tempGraphLabel,
        datasets: [{
          label: 'PM1(STD, ug/m3)',
          data: missionData.map(data => Number(data.PM_STD_1))
        },
        {
          label: 'PM2.5(STD, ug/m3)',
          data: missionData.map(data => Number(data.PM_STD_2_5))
        },
        {
          label: 'PM10(STD, ug/m3)',
          data: missionData.map(data => Number(data.PM_STD_10))
        }
      ]
      };

      this.atmParticuleData = {
        labels: this.tempGraphLabel,
        datasets: [{
          label: 'PM1(ATM, ug/m3)',
          data: missionData.map(data => Number(data.PM_ATM_1))
        },
        {
          label: 'PM2.5(ATM, ug/m3)',
          data: missionData.map(data => Number(data.PM_ATM_2_5))
        },
        {
          label: 'PM10(ATM, ug/m3)',
          data: missionData.map(data => Number(data.PM_ATM_10))
        }
      ]
      };
      
      this.cdr.detectChanges();
      this.chartRefs?.forEach(chart => {
        chart.update();
      })
    });
    this.data.getMissions();
  }

  constructor(private data: DataService, private cdr: ChangeDetectorRef) { }
}
