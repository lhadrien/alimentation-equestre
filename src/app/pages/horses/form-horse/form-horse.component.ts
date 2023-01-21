import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { convertToHorseActivity, convertToHorseState, Horse } from '../../../entity/horse'
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms'
import { HorseService } from '../../../services/horse.service'

@Component({
  selector: 'app-form-horse',
  templateUrl: './form-horse.component.html',
  styleUrls: ['./form-horse.component.scss'],
})
export class FormHorseComponent implements OnInit {
  @Input()
  horse!: Horse

  @Input()
  isReadonly: boolean = true

  @Output()
  deleteHorse = new EventEmitter<Horse>()

  @Output()
  createdHorse = new EventEmitter<Horse>()

  isCreated: boolean = false

  form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    weight: new FormControl('', [Validators.min(50), Validators.max(1500), Validators.pattern(/^\d*$/)]),
    height: new FormControl('', [Validators.min(50), Validators.max(200), Validators.pattern(/^\d*$/)]),
    race: new FormControl('', [Validators.maxLength(50)]),
    state: new FormControl(3, [Validators.min(1), Validators.max(5), Validators.required]),
    activity: new FormControl(1, [Validators.required]),
    age: new FormControl('', [Validators.max(50), Validators.min(1), Validators.pattern(/^\d*$/)]),
  })

  constructor(private horseService: HorseService) {}

  ngOnInit(): void {
    console.log(this.horse)
    if (this.horse.name === undefined || this.horse.name === null || this.horse.name === '') {
      this.isReadonly = false
      this.isCreated = false
    } else {
      this.isCreated = true
    }
    this.form.patchValue(this.horse)
  }

  get name(): AbstractControl<any, any> | null {
    return this.form.get('name')
  }

  get weight(): AbstractControl<any, any> | null {
    return this.form.get('weight')
  }

  get height(): AbstractControl<any, any> | null {
    return this.form.get('height')
  }

  get race(): AbstractControl<any, any> | null {
    return this.form.get('race')
  }

  get state(): AbstractControl<any, any> | null {
    return this.form.get('state')
  }

  get activity(): AbstractControl<any, any> | null {
    return this.form.get('activity')
  }

  get age(): AbstractControl<any, any> | null {
    return this.form.get('age')
  }

  formatState(value: number): string {
    switch (value) {
      case 1:
        return 'Très maigre'
      case 2:
        return 'Maigre'
      case 3:
        return 'Normal'
      case 4:
        return 'Gras'
      case 5:
        return 'Obèse'
    }

    return `Erreur`
  }

  formatActivity(value: number): string {
    switch (value) {
      case 1:
        return 'Tondeuse'
      case 2:
        return 'Peu'
      case 3:
        return 'Beaucoup'
    }

    return `Erreur`
  }

  async validate() {
    this.horse.name = String(this.name?.value)
    this.horse.age = Number(this.age?.value)
    this.horse.activity = convertToHorseActivity(this.activity?.value)
    this.horse.height = Number(this.height?.value)
    this.horse.race = String(this.race?.value)
    this.horse.state = convertToHorseState(this.state?.value)
    this.horse.weight = Number(this.weight?.value)
    try {
      const res: boolean = await this.horseService.saveHorse(this.horse)
      if (res) {
        console.log('[validate horseService] Horse validated')
        this.isReadonly = true
        this.createdHorse.emit(this.horse)
      } else {
        console.log('[validate horseService] Horse failed')
      }
    } catch (error) {
      console.warn('Une erreur est survenue', error)
    }
  }

  delete() {
    this.deleteHorse.emit(this.horse)
  }

  edit() {
    this.isReadonly = false
  }
}
