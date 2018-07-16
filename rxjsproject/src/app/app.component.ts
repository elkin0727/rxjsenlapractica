import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  seconds = 0;

  ngOnInit(){
    setInterval(() => {
      this.seconds++;
      console.log(this.seconds); // indefinido
    }, 1000);

    setTimeout(() => {
      console.log('Tiene un fin');
    }, 3000)
  }

  onKeyPress(inputValue: KeyboardEvent){
    console.log(inputValue); // indefinido
  }

  saveForm(event: MouseEvent){
    console.log(event); // indefinido
  }
}
