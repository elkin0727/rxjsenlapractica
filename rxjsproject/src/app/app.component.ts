import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  seconds = 0;

  ngOnInit() {
    //stream indefinido
    document.getElementById('saveButton').addEventListener('click', evt => {
      console.log('click: ', evt);
      // stream con un complete, no vuelve a emitir
      setTimeout(() => {
        console.log('Tiene un fin');
        // stream indefinido
        setInterval(() => {
          this.seconds++;
          console.log(this.seconds);
        }, 1000);

      }, 3000);
    });




  }
}
