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
    // //stream indefinido
    // document.getElementById('saveButton').addEventListener('click', evt => {
    //   console.log('click: ', evt);
    //   // stream con un complete, no vuelve a emitir
    //   setTimeout(() => {
    //     console.log('Tiene un fin');
    //     // stream indefinido
    //     setInterval(() => {
    //       this.seconds++;
    //       console.log(this.seconds);
    //     }, 1000);

    //   }, 3000);
    // });

    // 5. Menos mal, estamos llenos de "utilitarios" que ya tienen comportamientos que necesitamos
    // y este es solo un ejemplo, vamos a hacer un ejemplo
    const interval$ = timer(3000, 1000);
    const click$ = fromEvent(document.getElementById('saveButton'), 'click');
    let subscriptionInterval: Subscription;


    click$.subscribe(
      evt => {
        console.log(evt);
        subscriptionInterval = interval$.subscribe(val => this.seconds++)

        // 6. Ahora supongamos que el requerimiento cambia un poquito,
        // y el contador debe parar a los 3 segundos. 
        // Aprovechemos para explicar el siguiente concepto del metodo subscribe
        // como su nombre indica así como hay subscribe, podríamos tambien desuscribirnos? si!
        setTimeout(() => {
          subscriptionInterval.unsubscribe();
        }, 6000);
        
      },
      err => console.log(err), // example, fetch error when get info from backend
      () => console.log('completed') // the stream has completed
    );



  }
}
