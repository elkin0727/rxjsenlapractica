import { Component, OnInit, ViewChild } from '@angular/core';
import { fromEvent, interval, timer } from 'rxjs';

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

    //1. Comportamiento indefinido
    const interval$ = interval(1000); 
    //Un observable es solo como un template, un molde, solo explicar como queremos que se comporte

    //2. tomar el molde y un stream que se comporte tal cual
    interval$.subscribe(val => console.log("stream 1 ", val));

    //3. Crear un observable de eventos del boton
    const click$ = fromEvent(document.getElementById('saveButton'), 'click');

    //4. Crear la instancia
    click$.subscribe(evt => console.log(evt));

  }
}
