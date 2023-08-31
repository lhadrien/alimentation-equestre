import { ComponentFixture, TestBed } from '@angular/core/testing'

import { FormMealComponent } from './form-meal.component'

describe('MenuComponent', () => {
  let component: FormMealComponent
  let fixture: ComponentFixture<FormMealComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormMealComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(FormMealComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
