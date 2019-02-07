import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import * as d3 from 'd3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  name = 'Angular 6';
  inputArray = [];
  myD3Array = [];

  constructor(
    private appService: AppService
  ) { }

  ngOnInit() {
    this.appService.getDataFromUrl()
      .subscribe(
        (response: any) => {
          // console.log(response);
          this.inputArray = response;
        },
        (error) => {
          console.log(error);
        },
        () => {
          // when observable completes successfully, this block is called
          // since observable is asynchronous, calling function which use data from 
          // result of observable will not work. So use this block/function to call things using result

          // map date and time to normalize for chart
          this.parseData()
          // actual drawing
          this.drawChart();
        }
      )
  }

  parseData() {
    if (this.inputArray) {
      // for each date and time => normalize
      this.inputArray.forEach(arr => {
        this.myD3Array.push([new Date(arr['TRANS_DATE']).getTime(), +arr['TIME_SEC']]);
      });
    }
  }

  drawChart() {
    let svgWidth = 600, svgHeight = 400;
    let margin = { top: 20, right: 20, bottom: 30, left: 50 };
    let width = svgWidth - margin.left - margin.right;
    let height = svgHeight - margin.top - margin.bottom;
    let svg = d3.select('svg')
      .attr('width', svgWidth)
      .attr('height', svgHeight);


    let g = svg.append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")"
      );

    let x = d3.scaleTime().rangeRound([0, width]);
    let y = d3.scaleLinear().rangeRound([height, 0]);
    
    x.domain(d3.extent(this.myD3Array, function (d) { return d[0] }));
    y.domain(d3.extent(this.myD3Array, function (d) { return d[1] }));

    console.log(this.myD3Array)
    let line = d3.line()
      .x(function (d) { return x(d[0]) })
      .y(function (d) { return y(d[1]) })
    
    g.append("path")
      .datum(this.myD3Array)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)
      .attr("d", line);
  }

}
