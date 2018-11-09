import { Component, OnInit, ViewChild } from '@angular/core';
import { concat, fromEvent, interval, timer, Subscription, noop, Observable, of, from } from 'rxjs';
import { map, filter, shareReplay, tap, delay, zip, concatMap, exhaustMap, takeUntil, startWith, share } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pokemonsNivel1$: Observable<Pokemon[]>;
  pokemonsNivel2$: Observable<Pokemon[]>;
  ngOnInit() {

    const http$ = this.createObservableHTTPGet('api/pokemons');
    const pokemons$: Observable<Pokemon[]> = http$
      .pipe(
        map(responseHttp => responseHttp['payload']),
        share()
      );
    
    this.pokemonsNivel1$ = pokemons$
      .pipe(
        map((pokemons) => pokemons.filter(pokemon => pokemon.nivel === 1))
      );

    this.pokemonsNivel2$ = pokemons$
      .pipe(
        map((pokemons) => pokemons.filter(pokemon => pokemon.nivel === 2))
      );

    const group1Pokemons$ = from(["Aerodactyl", "Beedrill", "Caterpie"]);
    const group2Pokemons$ = from(["Dragonite", "Ekans", "Flareon"]);
    const group3Pokemons$ = from(["Golbat", "Hitmonchan", "Ivysaur"]);

    const interval$ = interval(1000);
    const evenPokemons$ = concat(group1Pokemons$, group2Pokemons$, group3Pokemons$).
      pipe(
        zip(interval$),
        exhaustMap((pokemonAndCounter) => this.createObservableHTTPPost.apply(this, pokemonAndCounter))
        //,
        //filter((pokemon: Pokemon, counter: number) => counter % 2 === 0)
      );

    ;
    evenPokemons$.subscribe(responseHttpByPokemon => {
      console.log(responseHttpByPokemon);
    });
  }

  /**
   * Utilitarios
   */

  createObservableHTTPGet(url: string) {
    return Observable.create(observer => {
      fetch(url)
        .then(response => {
          if (response.status === 500 || response.status === 504) {
            observer.error('500 || 504 error');
          }
          else {
            return response.json();
          }

        })
        .then(body => {
          observer.next(body);
          observer.complete();
        })
        .catch(err => {
          observer.error(err);
        });
    });
  }

  createObservableHTTPPost(pokemonName: string, counter: number) {
    return from(fetch(`api/pokemon/${counter}/${pokemonName}`, {
      method: 'POST',
      body: JSON.stringify({counter, pokemonName})
    }));
  }
}
