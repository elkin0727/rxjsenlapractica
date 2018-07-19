import { Component, OnInit, ViewChild } from '@angular/core';
import { concat, fromEvent, interval, timer, Subscription, noop, Observable, of, from } from 'rxjs';
import { map, filter, shareReplay, tap, delay, zip, concatMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit() {
    // document.getElementById('startButton').addEventListener('click', (event) => {
    //   console.log(event);
    //   setTimeout(() => {
    //     console.log('Completed');
    //     let seconds = 0;
    //     setInterval(() => {
    //       console.log(seconds++);
    //     }, 1000);
    //   }, 3000);
    // });

    document.getElementById('startButton').addEventListener('click', (event) => {
      const interval$ = timer(5000, 1000);
      interval$.subscribe(console.log);
    });


    // setTimeout(() => {
    //   interval$.subscribe((value) => console.log(value * 1000));
    // }, 3000)






  }
}
