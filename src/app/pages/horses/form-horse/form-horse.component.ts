import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { convertToHorseActivity, convertToHorseState, Horse } from "../../../entity/horse";
import { AbstractControl, FormControl, FormGroup, Validators } from "@angular/forms";
import { HorseService } from "../../../services/horse.service";

@Component({
  selector: 'app-form-horse',
  templateUrl: './form-horse.component.html',
  styleUrls: ['./form-horse.component.scss']
})
export class FormHorseComponent implements OnInit {
  @Input()
  horse!: Horse;

  @Input()
  isReadonly: boolean = true;

  @Output()
  deleteHorse = new EventEmitter<Horse>();

  form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    weight: new FormControl('', [
      Validators.min(50),
      Validators.max(1500)
    ]),
    height: new FormControl('', [
      Validators.min(50),
      Validators.max(200)
    ]),
    race: new FormControl('', [
      Validators.maxLength(50),
    ]),
    state: new FormControl(3, [
      Validators.min(1),
      Validators.max(5),
      Validators.required,
    ]),
    activity: new FormControl(1, [
      Validators.required,
    ]),
    age: new FormControl('', [
      Validators.max(50),
      Validators.min(1),
    ])
  });

  constructor(private horseService: HorseService) {}

  ngOnInit(): void {
    console.log(this.horse);
    if (this.horse.name === undefined || this.horse.name === null || this.horse.name === '') {
      this.isReadonly = false;
    }
    this.form.patchValue(this.horse);
  }

  get name(): AbstractControl<any, any> | null { return this.form.get('name'); }

  get weight(): AbstractControl<any, any> | null { return this.form.get('weight'); }

  get height(): AbstractControl<any, any> | null { return this.form.get('height'); }

  get race(): AbstractControl<any, any> | null { return this.form.get('race'); }

  get state(): AbstractControl<any, any> | null { return this.form.get('state'); }

  get activity(): AbstractControl<any, any> | null { return this.form.get('activity'); }

  get age(): AbstractControl<any, any> | null { return this.form.get('age'); }

  formatState(value: number): string {
    switch (value) {
      case 1:
        return 'Très maigre';
      case 2:
        return 'Maigre';
      case 3:
        return 'Normal';
      case 4:
        return 'Gras';
      case 5:
        return 'Obèse';
    }

    return `Erreur`;
  }

  formatActivity(value: number): string {
    switch (value) {
      case 1:
        return 'Tondeuse';
      case 2:
        return 'Peu';
      case 3:
        return 'Beaucoup';
    }

    return `Erreur`;
  }

  async validate() {
    const horse: Horse = new Horse({
      name: String(this.name?.value),
      age: Number(this.age?.value),
      activity: convertToHorseActivity(this.activity?.value),
      height: Number(this.height?.value),
      race: String(this.race?.value),
      state: convertToHorseState(this.state?.value),
      weight: Number(this.weight?.value)
    });
    await this.horseService.saveHorse(horse);
  }

  delete() {
    this.deleteHorse.emit(this.horse)
  }

}
