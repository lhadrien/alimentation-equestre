import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHorseComponent } from './edit-horse.component';

describe('EditHorseComponent', () => {
  let component: EditHorseComponent;
  let fixture: ComponentFixture<EditHorseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditHorseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditHorseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
