import { Component, OnInit, ViewChild } from '@angular/core';
import { fromEvent, interval, timer, Subscription, noop, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  // 1. Add lists where save the filer pokemons
  levelOne: Pokemon[];
  levelTwo: Pokemon[];

  seconds = 0;

  ngOnInit() {
    const interval$ = timer(3000, 1000);
    const click$ = fromEvent(document.getElementById('saveButton'), 'click');
    let subscriptionInterval: Subscription;

    click$.subscribe(
      evt => {
        subscriptionInterval = interval$.subscribe(val => this.seconds++);

        setTimeout(() => {
          subscriptionInterval.unsubscribe();
        }, 6000);

      },
      noop,
      () => console.log('completed') // the stream has completed
    );

    
    const http$ = this.createHttpObservable('Api/pokemons');

    const pokemons$ = http$
      .pipe(
        map(res => res["payload"])
      );

    pokemons$.subscribe(
      pokemons => {
        this.levelOne = pokemons.filter(pokemon => pokemon.nivel == 1);
        this.levelTwo = pokemons.filter(pokemon => pokemon.nivel == 2);
      },
      noop,
      () => console.log('stream completed')
    );
  }

  createHttpObservable(url: string) {
    return Observable.create(observer => {
      fetch(url)
        .then(response => { return response.json() })
        .then(body => {
          observer.next(body);
          observer.complete();
        })
        .catch(err => {
          observer.error(err);
        });
    });
  }
}
