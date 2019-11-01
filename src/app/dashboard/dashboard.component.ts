import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { DataService } from "./data.service";

declare var google: any; 

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private data: any;

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.dataService.getData().subscribe(data => {
      this.data = data;
      this.init();
    });
  }

  /**
   * Initialize graphic API from google with 1second display delay
   * @return void
   */
  init(): void {
    if ( typeof(google) !== 'undefined' ) {
      google.charts.load( 'current', {'packages': ['corechart']} );
      setTimeout(() => {
        google.charts.setOnLoadCallBack(this.showGraphics());
      }, 1000);
    }
  }

  /**
   * This method is called when the graphic API is initialized
   * Is responsible for calling the methods to generate the graphics
   * 
   * @return void
   */
  showGraphics(): void {
    this.showPieChart();
  }

  /**
   * Show Pi Chart
   * 
   * @return void 
   */
  showPieChart(): void {
    const el = document.getElementById("pie_chart");
    const chart = new google.visualization.PieChart(el);

    chart.draw(this.getDataTable(), this.getOptions());
  }


  /**
   * Create and return the DataTable Object of graphic API
   * is responsible for the definition of graphic data
   * 
   * @return any
   */
  getDataTable(): any {
    const data = new google.visualization.DataTable();

    data.addColumn( 'string', 'Month' );
    data.addColumn( 'number', 'Quantity' );
    data.addRows( this.data );

    return data;
  }

  /**
   * Return graphics options, which includes the title and size of graphics
   * 
   * @return any
   */
  getOptions(): any {
    return {
      'title': 'Number of registers on first semester',
      'width': 400,
      'height': 300
    };
  }

}
