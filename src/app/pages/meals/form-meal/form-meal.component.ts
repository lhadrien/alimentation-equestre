import { Component, OnInit } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { FeedList } from '../../../entity/feed'
import { FeedService } from '../../../services/feed.service'

@Component({
  selector: 'app-form-meal',
  templateUrl: './form-meal.component.html',
  styleUrls: ['./form-meal.component.scss'],
})
export class FormMealComponent implements OnInit {
  mealForm: FormGroup
  feeds: FeedList = {}

  constructor(private fb: FormBuilder, private feedService: FeedService) {
    // Initialize form group
    this.mealForm = this.fb.group({
      name: ['', Validators.required],
      feedComponents: this.fb.array([]),
    })
  }

  ngOnInit(): void {
    // Fetch feeds, assuming feedService.getAllFeeds() returns an observable of Feed[]
    this.feeds = this.feedService.getFeeds()
  }

  // Getters
  get feedComponents(): FormArray {
    return this.mealForm.get('feedComponents') as FormArray
  }

  // Add a feed component
  addFeedComponent(): void {
    const feedComponent = this.fb.group({
      feedId: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
    })

    this.feedComponents.push(feedComponent)
  }

  // Remove a feed component
  removeFeedComponent(index: number): void {
    this.feedComponents.removeAt(index)
  }

  // Form submission
  onSubmit(): void {
    if (this.mealForm.valid) {
      // You can now send the form value to your backend
      console.log('Meal Form Value', this.mealForm.value)
    }
  }
}
