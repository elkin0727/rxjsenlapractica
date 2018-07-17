import { Component, OnInit, ViewChild } from '@angular/core';
import { fromEvent, interval, timer, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  seconds = 0;

  ngOnInit() {
    const interval$ = timer(3000, 1000);
    const click$ = fromEvent(document.getElementById('saveButton'), 'click');
    let subscriptionInterval: Subscription;

    click$.subscribe(
      evt => {
        console.log(evt);
        subscriptionInterval = interval$.subscribe(val => this.seconds++);

        setTimeout(() => {
          subscriptionInterval.unsubscribe();
        }, 6000);
        
      },
      err => console.log(err), // example, fetch error when get info from backend
      () => console.log('completed') // the stream has completed
    );
    
  }
}
