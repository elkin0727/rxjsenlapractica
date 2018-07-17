import { Component, OnInit, ViewChild } from '@angular/core';
import { fromEvent, interval, timer, Subscription, noop, Observable } from 'rxjs';

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
        subscriptionInterval = interval$.subscribe(val => this.seconds++);

        setTimeout(() => {
          subscriptionInterval.unsubscribe();
        }, 6000);
        
      },
      noop, 
      () => console.log('completed') // the stream has completed
    );

    //1. construimos y explicamos el contrato de un observable
    const http$ = Observable.create(observer => {
      fetch("Api/pokemons")
        .then(response => { return response.json() })
        .then(body => {
          observer.next(body);
          observer.complete();
        })
        .catch(err => {
          observer.error(err);
        });
    });

    //2. Probamos en la consola si se llama nuestra petición.
    //2.1 No funciona porque hemos definido el template o el molde, aún no hemos creado nada.

    http$.subscribe(
      pokemons => console.log(pokemons),
      noop,
      () => console.log('stream completed')
    );

  }
}
