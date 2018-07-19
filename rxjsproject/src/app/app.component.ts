import { Component, OnInit, ViewChild } from '@angular/core';
import { concat, fromEvent, interval, timer, Subscription, noop, Observable, of, from } from 'rxjs';
import { map, filter, shareReplay, tap, delay, zip, concatMap, takeUntil, startWith, share } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  levelOne$: Observable<Pokemon[]>;
  levelTwo$: Observable<Pokemon[]>;


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
    //Fuente de pokemones
    const group1Pokemons$ = from(["Aerodactyl", "Beedrill", "Caterpie"]);
    const group2Pokemons$ = from(["Dragonite", "Ekans", "Flareon"]);
    const group3Pokemons$ = from(["Golbat", "Hitmonchan", "Ivysaur"]);
    const interval$ = timer(3000, 1000);
    
    const allGroups$ = concat(group1Pokemons$, group2Pokemons$, group3Pokemons$).pipe(
      zip(interval$));
      allGroups$.subscribe(console.log);
    
      
    let moment = 0, name = 'pikachu';
    const httpPUTMap$ = this.createHTTPPUTObservable(moment, name)
      .pipe(
        map(response => response['payload']),
        shareReplay()
      );

    this.levelOne$ =
      httpPUTMap$
        .pipe(
          map((response: Pokemon[]) => response.
            filter((pokemon: Pokemon) => pokemon.nivel === 1))
        )

    this.levelTwo$ =
      httpPUTMap$
        .pipe(
          map((response: Pokemon[]) => response.
            filter((pokemon: Pokemon) => pokemon.nivel === 2))
        )

  }

  createHTTPPUTObservable(moment, name) {
    return Observable.create(observer => {
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
  }
}
