import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core'
import { Feed } from '../../../entity/feed'
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms'
import { FeedService } from '../../../services/feed.service'

@Component({
  selector: 'app-form-feed',
  templateUrl: './form-feed.component.html',
  styleUrls: ['./form-feed.component.scss'],
})
export class FormFeedComponent implements OnInit, OnChanges {
  @Input()
  feed!: Feed

  @Output()
  deleteFeed = new EventEmitter<Feed>()

  @Output()
  createdFeed = new EventEmitter<Feed>()

  isCreated: boolean = false

  @Input()
  isReadonly: boolean = true

  constructor(private feedService: FeedService) {}

  form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    brand: new FormControl('', [Validators.maxLength(50)]),
    price: new FormControl('', [Validators.min(0), Validators.max(1000), Validators.pattern(/^\d*\.?\d*$/)]),
    weight: new FormControl('', [Validators.min(0.1), Validators.max(1000), Validators.pattern(/^\d*\.?\d*$/)]),
    ratio: new FormControl('', [Validators.min(0.01), Validators.max(100), Validators.pattern(/^\d*\.?\d*$/)]),
  })

  ngOnInit(): void {
    this.updateForm()
  }

  ngOnChanges(): void {
    this.updateForm()
  }

  updateForm() {
    if (this.feed.name === undefined || this.feed.name === null || this.feed.name === '') {
      this.isReadonly = false
      this.isCreated = false
    } else {
      this.isCreated = true
    }
    this.form.patchValue(this.feed)
  }

  get name(): AbstractControl<any, any> | null {
    return this.form.get('name')
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
    return this.form.get('ratio')
  }

  async validate() {
    this.feed.name = String(this.name?.value)
    this.feed.brand = String(this.brand?.value)
    this.feed.price = Number(this.price?.value)
    this.feed.weight = Number(this.weight?.value)
    this.feed.ratio = Number(this.ratio?.value)
    try {
      const res: boolean = await this.feedService.saveFeed(this.feed)
      if (res) {
        console.log('[validate feedService] Feed validated')
        this.isReadonly = true
        this.createdFeed.emit(this.feed)
      } else {
        console.log('[validate horseService] Horse failed')
      }
    } catch (error) {
      console.log('[validate feedService] Feed failed')
    }
  }

  delete() {
    this.deleteFeed.emit(this.feed)
  }

  edit() {
    this.isReadonly = false
  }
}
