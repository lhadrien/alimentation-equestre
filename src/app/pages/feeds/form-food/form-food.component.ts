import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Food } from '../../../entity/food'
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms'
import { FoodService } from '../../../services/food.service'

@Component({
  selector: 'app-form-food',
  templateUrl: './form-food.component.html',
  styleUrls: ['./form-food.component.scss'],
})
export class FormFoodComponent {
  @Input()
  food!: Food

  @Output()
  deleteFood = new EventEmitter<Food>()

  @Output()
  createdFood = new EventEmitter<Food>()

  isCreated: boolean = false

  isReadonly: boolean = true

  constructor(private foodService: FoodService) {}

  form: FormGroup = new FormGroup({
    foodName: new FormControl('', Validators.required),
    brand: new FormControl('', [Validators.maxLength(50)]),
    price: new FormControl('', [Validators.min(0), Validators.max(1000), Validators.pattern(/^\d*\.?\d*$/)]),
    weight: new FormControl('', [Validators.min(0.1), Validators.max(1000), Validators.pattern(/^\d*\.?\d*$/)]),
    ratio: new FormControl('', [Validators.min(0.01), Validators.max(100), Validators.pattern(/^\d*\.?\d*$/)]),
  })

  get foodName(): AbstractControl<any, any> | null {
    return this.form.get('foodName')
  }
  get brand(): AbstractControl<any, any> | null {
    return this.form.get('brand')
  }
  get price(): AbstractControl<any, any> | null {
    return this.form.get('price')
  }
  get weight(): AbstractControl<any, any> | null {
    return this.form.get('weight')
  }
  get ratio(): AbstractControl<any, any> | null {
    return this.form.get('foodName')
  }

  async validate() {
    this.food.name = String(this.foodName?.value)
    this.food.brand = String(this.brand?.value)
    this.food.price = Number(this.price?.value)
    this.food.weight = Number(this.weight?.value)
    this.food.ratio = Number(this.ratio?.value)
    try {
      const res: boolean = await this.foodService.saveFood(this.food)
      if (res) {
        console.log('[validate foodService] Food validated')
        this.isReadonly = true
        this.createdFood.emit(this.food)
      } else {
        console.log('[validate horseService] Horse failed')
      }
    } catch (error) {
      console.log('[validate foodService] Food failed')
    }
  }

  delete() {
    this.deleteFood.emit(this.food)
  }

  edit() {
    this.isReadonly = false
  }
}
