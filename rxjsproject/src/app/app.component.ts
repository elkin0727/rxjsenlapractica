import { Component, OnInit, ViewChild } from '@angular/core';
import { concat, fromEvent, interval, timer, Subscription, noop, Observable, of } from 'rxjs';

import { map, filter, shareReplay, tap } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  // 1. Add lists where save the filer pokemons
  levelOne$: Observable<Pokemon[]>;
  levelTwo$: Observable<Pokemon[]>;

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

    //EXAMPLE TWO

    const http$: Observable<Pokemon[]> = this.createHttpObservable('Api/pokemons');

    const pokemons$ = http$
      .pipe(
        tap(() => console.log("HTTP Executed")),
        map(res => res["payload"]),
        shareReplay()
      );

    this.levelOne$ = pokemons$
      .pipe(
        map(pokemons => pokemons
          .filter(pokemon => pokemon.nivel === 1))
      );

    this.levelTwo$ = pokemons$
      .pipe(
        map(pokemons => pokemons
          .filter(pokemon => pokemon.nivel === 2))
      );


    //EXAMPLE THREE
    const obs1$:Observable<number> = of(1,2,3);
    const obs2$:Observable<number> = of(4,5,6);
    const obs3$:Observable<number> = of(7,8,9);
    const result$ = concat(obs1$, obs2$, obs3$);
    result$.subscribe(console.log);
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
