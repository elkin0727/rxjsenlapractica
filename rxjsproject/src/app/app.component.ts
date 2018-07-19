import { Component, OnInit, ViewChild } from '@angular/core';
import { concat, fromEvent, interval, timer, Subscription, noop, Observable, of, from } from 'rxjs';
import { map, filter, shareReplay, tap, delay, zip, concatMap, takeUntil, startWith } from 'rxjs/operators';

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

    const click$ = fromEvent(document.getElementById('startButton'), 'click');
    click$.subscribe(() => {
      const interval$ = timer(3000, 1000).pipe(tap(console.log));
      interval$.subscribe();
    });

    let moment = 0, name = 'pikachu';

    const $httpPUT = Observable.create(observer => {
      fetch(`api/pokemon/${moment}/${name}`, {
        method: 'PUT'
      }).then(response => {
        return response.json();
      }).then(body => {
        observer.next(body);
        observer.complete();
      }).catch(error => {
        observer.error(error);
      });
    });

    $httpPUT.subscribe();

  }
}
