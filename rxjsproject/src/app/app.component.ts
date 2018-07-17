import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  seconds = 0;

  ngOnInit(){
    //stream indefinido
    document.getElementById('saveButton').addEventListener('click', evt => {
      console.log('click: ', evt);
    });

    // stream indefinido
    setInterval(() => {
      this.seconds++;
      console.log(this.seconds); 
    }, 1000);

    // stream con un complete, no vuelve a emitir
    setTimeout(() => {
      console.log('Tiene un fin');
    }, 3000)
  }
}
