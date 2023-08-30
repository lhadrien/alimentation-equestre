import { ComponentFixture, TestBed } from '@angular/core/testing'

import { FormFeedComponent } from './form-feed.component'

describe('FormFoodComponent', () => {
  let component: FormFeedComponent
  let fixture: ComponentFixture<FormFeedComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormFeedComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(FormFeedComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
