import { Component } from '@angular/core';
import { Horse } from "../../../entity/horse";

@Component({
  selector: 'app-add-horse',
  templateUrl: './add-horse.component.html',
  styleUrls: ['./add-horse.component.scss']
})
export class AddHorseComponent {
  newHorse: any;

  constructor() {
    this.newHorse = new Horse({});
  }
}
