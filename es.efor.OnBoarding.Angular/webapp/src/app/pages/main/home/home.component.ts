import { Component, forwardRef, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { LabelAndValueExtended, nameof } from 'ax-toolbox';
import { TeamService } from 'src/app/shared/api/services';
import { first } from 'rxjs/operators';
import { Color } from 'ng2-charts';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('fullcalendar') fullcalendar: FullCalendarComponent;
  barChartData: Array<any> = [];
  hours: Array<any> = [];
  parts: Array<any> = [];

  barChartLabels: string[] = [];
  calendarOptions: CalendarOptions;
  eventsModel: any;
  mostrarb: boolean = true;
  i: number = 0;
  
  constructor(
    private teamSV: TeamService,
  ) { }

  ngOnInit() {
    this.barChartLabels = [];
    //this.acTeamListGetterFn();
    //this.acPartListCountGetterFn();

    //calendario
    forwardRef(() => Calendar);

    this.calendarOptions = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      editable: true,
      selectable: true,
      nowIndicator: true,
      firstDay: 1,
      navLinks: true,
      
      headerToolbar: {
        left: 'prevYear,prev,next,nextYear today myCustomButton',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },

      footerToolbar: {
        right: 'prev,next'
      },

      customButtons: {
        myCustomButton: {
          text: 'custom!',
          click: function () {
            alert('clicked the custom button!');
          }
        }
      },

      
      //dateClick: this.handleDateClick.bind(this),
      //eventClick: this.handleEventClick.bind(this),
      //eventDragStop: this.handleEventDragStop.bind(this)
     
    };
  }

  //metodos calendario
  handleDateClick(arg) {
    console.log(arg);
  }

  handleEventClick(arg) {
    console.log(arg);
  }

  handleEventDragStop(arg) {
    console.log(arg);
  }

  updateHeader() {
    this.calendarOptions.headerToolbar = {
      left: 'prev,next myCustomButton',
      center: 'title',
      right: ''
    };
  }

  updateEvents() {
    const nowDate = new Date();
    const yearMonth = nowDate.getUTCFullYear() + '-' + (nowDate.getUTCMonth() + 1);

    this.calendarOptions.events = [{
      title: 'Updaten Event',
      start: yearMonth + '-08',
      end: yearMonth + '-10'
    }];
  }
  //Fin metodos calendario

  //Botones Home
  mostrar(state: boolean): boolean {

    if (this.mostrarb == null) {
      if (state) { this.mostrarb = true; return this.mostrarb }
      else { this.mostrarb = false; return this.mostrarb }

    } else if (this.mostrarb) {
      if (state && this.mostrarb) { this.mostrarb = null; return this.mostrarb }
      else if (!state && !this.mostrarb) { this.mostrarb = null; return this.mostrarb }
      else { this.mostrarb = false; return this.mostrarb }

    } else if (!this.mostrarb) {
      if (state && this.mostrarb) { this.mostrarb = null; return this.mostrarb }
      else if (!state && !this.mostrarb) { this.mostrarb = null; return this.mostrarb }
      else { this.mostrarb = true; return this.mostrarb }
    }
  }
  
  /*Barra
  async acPartListGetterFn() {

    const resp = await this.teamSV.apiTeamListadoTotalesHorasPost$Json().pipe(first()).toPromise();
    
      resp.items.forEach((x)=>{
          console.log(x);   
          console.log(this.barChartLabels)
          this.barChartLabels.push(x.name);
          this.hours.push(x.totalHours)
          this.parts.push(x.totalParts)
        })

        this.barChartData.push(
          {data: this.hours, label: 'Horas'},
          {data: this.parts, label: 'Contador de partes'} 
       );
  }*/
  
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true, 
  };
  public barChartColors: Color[] = [
    { backgroundColor: '#f3a260' }
  ]

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
}

