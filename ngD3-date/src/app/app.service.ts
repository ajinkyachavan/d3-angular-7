import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { delay, mapTo, tap, switchMap } from 'rxjs/operators';
import * as d3 from 'd3';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  dateLineChart1 = [{ "TRANS_DATE": "2018-12-10", "TIME_SEC": 19.34 }, { "TRANS_DATE": "2018-12-11", "TIME_SEC": 17.23 }, { "TRANS_DATE": "2018-12-12", "TIME_SEC": 16.37 }, { "TRANS_DATE": "2018-12-13", "TIME_SEC": 14.08 }, { "TRANS_DATE": "2018-12-14", "TIME_SEC": 18.02 }, { "TRANS_DATE": "2018-12-16", "TIME_SEC": 10.64 }, { "TRANS_DATE": "2018-12-17", "TIME_SEC": 18.17 }, { "TRANS_DATE": "2018-12-18", "TIME_SEC": 23.15 }, { "TRANS_DATE": "2018-12-19", "TIME_SEC": 11.95 }, { "TRANS_DATE": "2018-12-20", "TIME_SEC": 11.71 }, { "TRANS_DATE": "2018-12-21", "TIME_SEC": 12.38 }, { "TRANS_DATE": "2018-12-24", "TIME_SEC": 8.33 }, { "TRANS_DATE": "2018-12-26", "TIME_SEC": 13.51 }, { "TRANS_DATE": "2018-12-27", "TIME_SEC": 10.86 }, { "TRANS_DATE": "2018-12-28", "TIME_SEC": 11.55 }, { "TRANS_DATE": "2018-12-31", "TIME_SEC": 13.17 }, { "TRANS_DATE": "2019-01-02", "TIME_SEC": 45.41 }, { "TRANS_DATE": "2019-01-03", "TIME_SEC": 18.81 }, { "TRANS_DATE": "2019-01-04", "TIME_SEC": 20.69 }, { "TRANS_DATE": "2019-01-05", "TIME_SEC": 8.00 }, { "TRANS_DATE": "2019-01-07", "TIME_SEC": 17.09 }, { "TRANS_DATE": "2019-01-08", "TIME_SEC": 15.27 }, { "TRANS_DATE": "2019-01-09", "TIME_SEC": 17.04 }, { "TRANS_DATE": "2019-01-10", "TIME_SEC": 13.16 }, { "TRANS_DATE": "2019-01-11", "TIME_SEC": 16.22 }, { "TRANS_DATE": "2019-01-14", "TIME_SEC": 14.41 }, { "TRANS_DATE": "2019-01-15", "TIME_SEC": 18.50 }, { "TRANS_DATE": "2019-01-16", "TIME_SEC": 25.03 }, { "TRANS_DATE": "2019-01-17", "TIME_SEC": 13.35 }, { "TRANS_DATE": "2019-01-18", "TIME_SEC": 16.51 }, { "TRANS_DATE": "2019-01-20", "TIME_SEC": 4.79 }, { "TRANS_DATE": "2019-01-21", "TIME_SEC": 12.81 }, { "TRANS_DATE": "2019-01-22", "TIME_SEC": 15.59 }, { "TRANS_DATE": "2019-01-23", "TIME_SEC": 16.09 }, { "TRANS_DATE": "2019-01-24", "TIME_SEC": 12.54 }, { "TRANS_DATE": "2019-01-25", "TIME_SEC": 14.48 }, { "TRANS_DATE": "2019-01-26", "TIME_SEC": 6.26 }, { "TRANS_DATE": "2019-01-27", "TIME_SEC": 5.26 }, { "TRANS_DATE": "2019-01-28", "TIME_SEC": 10.61 }, { "TRANS_DATE": "2019-01-29", "TIME_SEC": 11.34 }, { "TRANS_DATE": "2019-01-30", "TIME_SEC": 14.53 }, { "TRANS_DATE": "2019-01-31", "TIME_SEC": 13.09 }, { "TRANS_DATE": "2019-02-01", "TIME_SEC": 19.96 }, { "TRANS_DATE": "2019-02-04", "TIME_SEC": 19.04 }, { "TRANS_DATE": "2019-02-05", "TIME_SEC": 19.33 }, { "TRANS_DATE": "2019-02-06", "TIME_SEC": 11.66 }, { "TRANS_DATE": "2019-02-07", "TIME_SEC": 10.15 }];
  dateLineChart2 = [];
  cubeLineChart = [[1, 1], [2, 8], [3, 27], [4, 81]];
  lineCharts = {};

  constructor(
    private http: HttpClient
  ) { }

  getDataFromUrl() {

    return of(null).pipe(
      tap(() => {
        d3.csv('../assets/sample-data.csv').then((data) => {
          console.log(data)
          this.dateLineChart2 = data;
          
          this.lineCharts =
          {
            'dateLineChart': this.dateLineChart1,
            'dateLineChart2': this.dateLineChart2,
            'cubeLineChart': this.cubeLineChart,
          };
        })
      }),
      delay(500),
      switchMap(() => {
        console.log(this.lineCharts)
        return of(this.lineCharts)
      })
    );
    // return this.http.get('https://jsonplaceholder.typicode.com/posts/1/comments');
  }

}