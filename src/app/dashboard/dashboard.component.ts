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
    this.show3dPieChart();
    this.showBarChart();
    this.showLineChart();
    this.showColumnChart();
    this.showDonutChart();
  }

  /**
   * Show Pie Chart
   * 
   * @return void 
   */
  showPieChart(): void {
    const el = document.getElementById("pie_chart");
    const chart = new google.visualization.PieChart(el);

    chart.draw(this.getDataTable(), this.getOptions());
  }

  /**
   * Show 3d Pie Chart
   * 
   * @return void
   */
  show3dPieChart(): void {
    const el = document.getElementById("3d_pie_chart");
    const chart = new google.visualization.PieChart(el);
    const options = this.getOptions();

    options['is3D'] = true;

    chart.draw(this.getDataTable(), this.getOptions(), options );
  }

  /**
   * Show Donut Chart
   * 
   * @return void
   */
  showDonutChart(): void {
    const el = document.getElementById("donut_chart");
    const chart = new google.visualization.PieChart(el);
    const options = this.getOptions();

    options['pieHole'] = 0.4;

    chart.draw(this.getDataTable(), this.getOptions(), options );
  }

  /**
   * Show Bar Chart
   * 
   * @return void
   */
  showBarChart(): void {
    const el = document.getElementById("bar_chart");
    const chart = new google.visualization.BarChart(el);

    chart.draw(this.getDataTable(), this.getOptions() );
  }

  /**
   * Show Line Chart
   * 
   * @return void
   */
  showLineChart(): void {
    const el = document.getElementById("line_chart");
    const chart = new google.visualization.LineChart(el);

    chart.draw(this.getDataTable(), this.getOptions() );
  }

  /**
   * Show Column Chart
   * 
   * @return void
   */
  showColumnChart(): void {
    const el = document.getElementById("column_chart");
    const chart = new google.visualization.ColumnChart(el);

    chart.draw(this.getDataTable(), this.getOptions() );
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
