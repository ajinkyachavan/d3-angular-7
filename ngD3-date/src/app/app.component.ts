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
    // get data
    this.inputArray = this.appService.getDataFromUrl();
    
    this.parseData()
    this.drawChart();
  }

  parseData() {
    if (this.inputArray) {
      this.inputArray.forEach(arr => {
        this.myD3Array.push(arr[0], +arr[1]);
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

    x.domain(d3.extent(this.inputArray, function (d) { return new Date(d['TRANS_DATE']) }));
    y.domain(d3.extent(this.inputArray, function (d) { return +d['TIME_SEC'] }));

    let line = d3.line()
      .x(function (d) { return x(new Date(d['TRANS_DATE'])) })
      .y(function (d) { return y(+d['TIME_SEC']) })
    
    g.append("path")
      .datum(this.inputArray)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)
      .attr("d", line);
  }

}
