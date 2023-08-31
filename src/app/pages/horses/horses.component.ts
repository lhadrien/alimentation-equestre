import { Component } from '@angular/core'
import { HorseService } from '../../services/horse.service'
import { Horse, HorseList } from '../../entity/horse'

@Component({
  selector: 'app-horses',
  templateUrl: './horses.component.html',
  styleUrls: ['./horses.component.scss'],
})
export class HorsesComponent {
  public horses: HorseList
  public displayNewHorse: boolean = false

  constructor(private horseService: HorseService) {
    this.horses = this.horseService.getHorses()
  }

  addHorse(): void {
    if (this.displayNewHorse) {
      return
    }
    const horse: Horse = new Horse({})
    this.horses[horse.id] = horse
    this.displayNewHorse = true
  }

  deleteHorse(horse: Horse) {
    this.horseService.deleteHorse(horse).then()
    delete this.horses[horse.id]
  }

  addHorseToList(horse: Horse) {
    this.displayNewHorse = false
  }
}
