import { Component, OnDestroy, OnInit } from '@angular/core';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { TranslateService } from '@ngx-translate/core';
import { AxBsDatatableFilterType, BsDatatableComponent, DtActionColumnButton, DtApiResponse, DtColumnItem, DtFilterItem, FilterFormatType, FilterItem, FilterOpType } from 'ax-toolbox';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  radioModel: string = 'Month';

  // lineChart1
  public lineChart1Data: Array<any> = [
    {
      data: [65, 59, 84, 84, 51, 55, 40],
      label: 'Series A'
    }
  ];
  public lineChart1Labels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChart1Options: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips
    },
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent'
        },
        ticks: {
          fontSize: 2,
          fontColor: 'transparent',
        }

      }],
      yAxes: [{
        display: false,
        ticks: {
          display: false,
          min: 40 - 5,
          max: 84 + 5,
        }
      }],
    },
    elements: {
      line: {
        borderWidth: 1
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 4,
      },
    },
    legend: {
      display: false
    }
  };
  public lineChart1Colours: Array<any> = [
    {
      backgroundColor: getStyle('--primary'),
      borderColor: 'rgba(255,255,255,.55)'
    }
  ];
  public lineChart1Legend = false;
  public lineChart1Type = 'line';

  // lineChart2
  public lineChart2Data: Array<any> = [
    {
      data: [1, 18, 9, 17, 34, 22, 11],
      label: 'Series A'
    }
  ];
  public lineChart2Labels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChart2Options: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips
    },
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent'
        },
        ticks: {
          fontSize: 2,
          fontColor: 'transparent',
        }

      }],
      yAxes: [{
        display: false,
        ticks: {
          display: false,
          min: 1 - 5,
          max: 34 + 5,
        }
      }],
    },
    elements: {
      line: {
        tension: 0.00001,
        borderWidth: 1
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 4,
      },
    },
    legend: {
      display: false
    }
  };
  public lineChart2Colours: Array<any> = [
    { // grey
      backgroundColor: getStyle('--info'),
      borderColor: 'rgba(255,255,255,.55)'
    }
  ];
  public lineChart2Legend = false;
  public lineChart2Type = 'line';


  // lineChart3
  public lineChart3Data: Array<any> = [
    {
      data: [78, 81, 80, 45, 34, 12, 40],
      label: 'Series A'
    }
  ];
  public lineChart3Labels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChart3Options: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips
    },
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        display: false
      }],
      yAxes: [{
        display: false
      }]
    },
    elements: {
      line: {
        borderWidth: 2
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
      },
    },
    legend: {
      display: false
    }
  };
  public lineChart3Colours: Array<any> = [
    {
      backgroundColor: 'rgba(255,255,255,.2)',
      borderColor: 'rgba(255,255,255,.55)',
    }
  ];
  public lineChart3Legend = false;
  public lineChart3Type = 'line';


  // barChart1
  public barChart1Data: Array<any> = [
    {
      data: [78, 81, 80, 45, 34, 12, 40, 78, 81, 80, 45, 34, 12, 40, 12, 40],
      label: 'Series A',
      barPercentage: 0.6,
    }
  ];
  public barChart1Labels: Array<any> = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'];
  public barChart1Options: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips
    },
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        display: false,
      }],
      yAxes: [{
        display: false
      }]
    },
    legend: {
      display: false
    }
  };
  public barChart1Colours: Array<any> = [
    {
      backgroundColor: 'rgba(255,255,255,.3)',
      borderWidth: 0
    }
  ];
  public barChart1Legend = false;
  public barChart1Type = 'bar';

  // mainChart

  public mainChartElements = 27;
  public mainChartData1: Array<number> = [];
  public mainChartData2: Array<number> = [];
  public mainChartData3: Array<number> = [];

  public mainChartData: Array<any> = [
    {
      data: this.mainChartData1,
      label: 'Current'
    },
    {
      data: this.mainChartData2,
      label: 'Previous'
    },
    {
      data: this.mainChartData3,
      label: 'BEP'
    }
  ];
  /* tslint:disable:max-line-length */
  public mainChartLabels: Array<any> = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Thursday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  /* tslint:enable:max-line-length */
  public mainChartOptions: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips,
      intersect: true,
      mode: 'index',
      position: 'nearest',
      callbacks: {
        labelColor: function(tooltipItem, chart) {
          return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor };
        }
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        gridLines: {
          drawOnChartArea: false,
        },
        ticks: {
          callback: function(value: any) {
            return value.charAt(0);
          }
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 5,
          stepSize: Math.ceil(250 / 5),
          max: 250
        }
      }]
    },
    elements: {
      line: {
        borderWidth: 2
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      }
    },
    legend: {
      display: false
    }
  };
  public mainChartColours: Array<any> = [
    { // brandInfo
      backgroundColor: hexToRgba(getStyle('--info'), 10),
      borderColor: getStyle('--info'),
      pointHoverBackgroundColor: '#fff'
    },
    { // brandSuccess
      backgroundColor: 'transparent',
      borderColor: getStyle('--success'),
      pointHoverBackgroundColor: '#fff'
    },
    { // brandDanger
      backgroundColor: 'transparent',
      borderColor: getStyle('--danger'),
      pointHoverBackgroundColor: '#fff',
      borderWidth: 1,
      borderDash: [8, 5]
    }
  ];
  public mainChartLegend = false;
  public mainChartType = 'line';

  // social box charts

  public brandBoxChartData1: Array<any> = [
    {
      data: [65, 59, 84, 84, 51, 55, 40],
      label: 'Facebook'
    }
  ];
  public brandBoxChartData2: Array<any> = [
    {
      data: [1, 13, 9, 17, 34, 41, 38],
      label: 'Twitter'
    }
  ];
  public brandBoxChartData3: Array<any> = [
    {
      data: [78, 81, 80, 45, 34, 12, 40],
      label: 'LinkedIn'
    }
  ];
  public brandBoxChartData4: Array<any> = [
    {
      data: [35, 23, 56, 22, 97, 23, 64],
      label: 'Google+'
    }
  ];

  public brandBoxChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public brandBoxChartOptions: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        display: false,
      }],
      yAxes: [{
        display: false,
      }]
    },
    elements: {
      line: {
        borderWidth: 2
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      }
    },
    legend: {
      display: false
    }
  };
  public brandBoxChartColours: Array<any> = [
    {
      backgroundColor: 'rgba(255,255,255,.1)',
      borderColor: 'rgba(255,255,255,.55)',
      pointHoverBackgroundColor: '#fff'
    }
  ];
  public brandBoxChartLegend = false;
  public brandBoxChartType = 'line';

  public random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  constructor(public translate: TranslateService) {
    
  }

  ngOnInit(): void {
    // generate random values for mainChart
    for (let i = 0; i <= this.mainChartElements; i++) {
      this.mainChartData1.push(this.random(50, 200));
      this.mainChartData2.push(this.random(80, 100));
      this.mainChartData3.push(65);
    }
    this.initDtColumns();

   
  }

  ngOnDestroy(): void {
  }
  
  //Ejemplo DataTable
  dtColumns: DtColumnItem<any>[] = [];
  _itemsMock = {total: 3,pageSize: 2, pageIndex:0, items:[
  {id:1,
    field1: 'field1',
    field2: 'field2',
    field3: 'field3',
    field4: 'field4',
    field5: 'field5',
  },
  {id:2,
    field1: 'field1',
    field2: 'field2',
    field3: 'field3',
    field4: 'field4',
    field5: 'field5',
  },
  {id:3,
    field1: 'field1',
    field2: 'field2',
    field3: 'field3',
    field4: 'field4',
    field5: 'field5',
  }
  ]
};
_items = {total: 3,pageSize: 2, pageIndex:0, items:[]};

async dtGetterFn(queryParams: { [param: string]: string }, filters: FilterItem[])
: Promise<any>
{
  console.log(queryParams, filters);
  //Llamada a Servicio con params y filters
  //Ahora todo es mock
  const returnedPagination = {
    pageIndex: parseInt(queryParams.pi),
    pageSize: parseInt(queryParams.ps),
    total: this._itemsMock.items.length
  }
  this._items.items = [];
  const from = returnedPagination.pageIndex * returnedPagination.pageSize;
  const to = from + returnedPagination.pageSize;
  let obj = [];
  for (var i = from; i < to; i++) {
    console.log(i, this._itemsMock.items[i]);
    if(this._itemsMock.items[i] == undefined)break;
    obj.push(this._itemsMock.items[i]);
  }
  //Indicar la paginación devuelta al objecto de la tabla
  this._items.total = returnedPagination.total;
  this._items.pageIndex = returnedPagination.pageIndex;
  this._items.pageSize = returnedPagination.pageSize;
  //Items
  this._items.items = obj;

  return this._items;
}

  private initDtColumns() {

    this.dtColumns = [
      new DtColumnItem().setData({
        thTHeadClass: 'cell-narrow',
        buttons: [
          new DtActionColumnButton<any, string>().setData({
            onClick:(ev:Event, dt:BsDatatableComponent<any>,item:any)=>{
              console.log(ev, item);                         
            },
            iconPreffix: 'fas',
            iconName: 'pencil-alt',
            tooltip: this.translate.instant('EDIT'),
            btnClass: 'btn btn-sm btn-warning text-white rounded',
          }),
        ],
      }),
      new DtColumnItem().setData({
        thTHeadClass: 'cell-narrow',
        buttons: [
          new DtActionColumnButton<any, string>().setData({
            onClick:(ev:Event, dt:BsDatatableComponent<any>, item:any)=>{
              console.log(ev, item);   
            },
            iconPreffix: 'fas',
            iconName: 'trash',
            tooltip: this.translate.instant('DELETE'),
            btnClass: 'btn btn-sm btn-danger text-white rounded',
          }),
        ],
      }),
      new DtColumnItem().setData({
        columnName: 'id',
        field: 'id',
        filter: true,
        sort: true
      }),
      new DtColumnItem().setData({
        columnName: 'field1',
        field: 'field1',
        filter: true,
        sort: true,
        filterItem: new DtFilterItem().setData({
          format: FilterFormatType.Int,
          op: FilterOpType.Eq,
          type: AxBsDatatableFilterType.number
        }),
      }),
      new DtColumnItem().setData({
        columnName: this.translate.instant('field2'),
        field: 'field2',
        fieldDisplay: 'field2',
        isShown: false,
        canChangeIsShown: false,
      }),
      new DtColumnItem().setData({
        columnName: this.translate.instant('field3'),
        field: 'field3',
        fieldDisplay: 'field3',
        sort: true,
      }),
      new DtColumnItem().setData({
        columnName: this.translate.instant('field4'),
        field: 'field4',
        fieldDisplay: 'field4',
        sort:true,
        filter: true,
        filterItem:new DtFilterItem().setData({
          format:FilterFormatType.String,
          type:AxBsDatatableFilterType.text,          
          op:FilterOpType.Cn})
      }),
      new DtColumnItem().setData({
        columnName: this.translate.instant('field5'),
        field: 'field5',
        fieldDisplay: 'field5',
        filter: true,
        sort:true,
        filterItem:new DtFilterItem().setData({
          format:FilterFormatType.Literal,          
          op:FilterOpType.Eq})
      })
    ];
   
  }



}
