import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormHorseComponent } from './form-horse.component';

describe('FormHorseComponent', () => {
  let component: FormHorseComponent;
  let fixture: ComponentFixture<FormHorseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormHorseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormHorseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
