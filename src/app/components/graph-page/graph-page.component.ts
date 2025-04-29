import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { DataService } from '../../services/data.service';
import Chart, { ChartData, ChartItem, ChartOptions } from 'chart.js/auto';
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

  tempGraphOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false
    },
    plugins: {
      title: {
        display: true,
        text: 'Température',
        font: {
          size: 18,
          weight: 'bold'
        }
      },
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 12
          },
          boxWidth: 20
        }
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: context => `Température : ${context?.formattedValue}°C`
        }
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Heure',
          font: {
            size: 14
          },
        },
        ticks: {
          maxRotation: 45,
          minRotation: 45
        },
        grid: {
          display: false
        }
      },
      y: {
        title: {
          display: true,
          text: 'Température (°C)',
          font: {
            size: 14
          }
        },
        grid: {
          color: 'rgba(0,0,0,0.05)'
        }
      }
    }
  }

  pressureGraphOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false
    },
    plugins: {
      title: {
        display: true,
        text: 'Pression',
        font: {
          size: 18,
          weight: 'bold'
        }
      },
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 12
          },
          boxWidth: 20
        }
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: context => `Pression : ${context?.formattedValue}hPa`
        }
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Heure',
          font: {
            size: 14
          },
        },
        ticks: {
          maxRotation: 45,
          minRotation: 45
        },
        grid: {
          display: false
        }
      },
      y: {
        title: {
          display: true,
          text: 'Pression (hPa)',
          font: {
            size: 14
          }
        },
        grid: {
          color: 'rgba(0,0,0,0.05)'
        }
      }
    }
  }

  altitudeGraphOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false
    },
    plugins: {
      title: {
        display: true,
        text: 'Altitude',
        font: {
          size: 18,
          weight: 'bold'
        }
      },
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 12
          },
          boxWidth: 20
        }
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: context => `Altitude : ${context?.formattedValue}m`
        }
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Heure',
          font: {
            size: 14
          },
        },
        ticks: {
          maxRotation: 45,
          minRotation: 45
        },
        grid: {
          display: false
        }
      },
      y: {
        title: {
          display: true,
          text: 'Altitude (m)',
          font: {
            size: 14
          }
        },
        grid: {
          color: 'rgba(0,0,0,0.05)'
        }
      }
    }
  }

  stdParticulesGraphOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false
    },
    plugins: {
      title: {
        display: true,
        text: 'Particules (STD)',
        font: {
          size: 18,
          weight: 'bold'
        }
      },
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 12
          },
          boxWidth: 20
        }
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: context => `${context.dataset.label} : ${context?.formattedValue}ug/m3`
        }
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Heure',
          font: {
            size: 14
          },
        },
        ticks: {
          maxRotation: 45,
          minRotation: 45
        },
        grid: {
          display: false
        }
      },
      y: {
        title: {
          display: true,
          text: 'Particules (ug/m3)',
          font: {
            size: 14
          }
        },
        grid: {
          color: 'rgba(0,0,0,0.05)'
        }
      }
    }
  }

  atmParticulesGraphOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false
    },
    plugins: {
      title: {
        display: true,
        text: 'Particules (ATM)',
        font: {
          size: 18,
          weight: 'bold'
        }
      },
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 12
          },
          boxWidth: 20
        }
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: context => `${context.dataset.label} : ${context?.formattedValue}ug/m3`
        }
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Heure',
          font: {
            size: 14
          },
        },
        ticks: {
          maxRotation: 45,
          minRotation: 45
        },
        grid: {
          display: false
        }
      },
      y: {
        title: {
          display: true,
          text: 'Particules (ug/m3)',
          font: {
            size: 14
          }
        },
        grid: {
          color: 'rgba(0,0,0,0.05)'
        }
      }
    }
  }

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
          label: 'PM1',
          data: missionData.map(data => Number(data.PM_STD_1))
        },
        {
          label: 'PM2.5',
          data: missionData.map(data => Number(data.PM_STD_2_5))
        },
        {
          label: 'PM10',
          data: missionData.map(data => Number(data.PM_STD_10))
        }
      ]
      };

      this.atmParticuleData = {
        labels: this.tempGraphLabel,
        datasets: [{
          label: 'PM1',
          data: missionData.map(data => Number(data.PM_ATM_1))
        },
        {
          label: 'PM2.5',
          data: missionData.map(data => Number(data.PM_ATM_2_5))
        },
        {
          label: 'PM10',
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
