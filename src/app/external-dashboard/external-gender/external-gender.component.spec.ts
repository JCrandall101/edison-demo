import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalGenderComponent } from './external-gender.component';

describe('ExternalGenderComponent', () => {
  let component: ExternalGenderComponent;
  let fixture: ComponentFixture<ExternalGenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExternalGenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalGenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
