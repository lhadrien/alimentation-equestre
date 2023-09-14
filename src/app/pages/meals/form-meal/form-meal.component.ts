import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core'
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Feed, FeedList } from '../../../entity/feed'
import { FeedService } from '../../../services/feed.service'
import { Meal } from '../../../entity/meal'

@Component({
  selector: 'app-form-meal',
  templateUrl: './form-meal.component.html',
  styleUrls: ['./form-meal.component.scss'],
})
export class FormMealComponent implements OnInit, OnChanges {
  @Input()
  meal!: Meal

  @Output()
  deleteMeal = new EventEmitter<Meal>()

  @Output()
  createdMeal = new EventEmitter<Meal>()

  @Input()
  isReadonly: boolean = true

  form: FormGroup
  feeds: Feed[] = []
  isCreated: boolean = false

  constructor(private fb: FormBuilder, private feedService: FeedService) {
    // Initialize form group
    this.form = this.fb.group({
      name: ['', Validators.required],
      feedComponents: this.fb.array([]),
    })
  }

  ngOnInit(): void {
    const feedList: FeedList = this.feedService.getFeeds()
    this.feeds = Object.values(feedList)
    this.updateForm()
  }

  ngOnChanges(): void {
    this.updateForm()
  }

  updateForm() {
    if (this.meal.name === undefined || this.meal.name === null || this.meal.name === '') {
      this.isReadonly = false
      this.isCreated = false
    } else {
      this.isCreated = true
    }
    this.form.patchValue(this.meal)
  }

  // Getters
  get feedComponents(): FormArray {
    return this.form.get('feedComponents') as FormArray
  }

  // Add a feed component
  addFeedComponent(): void {
    const feedComponent = this.fb.group({
      feedId: ['', Validators.required],
      quantity: [
        '',
        [Validators.required, Validators.min(0.001), Validators.max(1000), Validators.pattern(/^\d*\.?\d*$/)],
      ],
      unit: new FormControl('', Validators.required),
    })

    this.feedComponents.push(feedComponent)
  }

  get name(): AbstractControl<any, any> | null {
    return this.form.get('name')
  }

  quantity(formCtrl: AbstractControl): AbstractControl<any, any> | null {
    return formCtrl.get('quantity')
  }

  // Remove a feed component
  removeFeedComponent(index: number): void {
    this.feedComponents.removeAt(index)
  }

  // Form submission
  onSubmit(): void {
    if (this.form.valid) {
      // You can now send the form value to your backend
      console.log('Meal Form Value', this.form.value)
    }
  }

  delete() {
    this.deleteMeal.emit(this.meal)
  }

  edit() {
    this.isReadonly = false
  }
}
