import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalDashboardComponent } from './external-dashboard.component';

describe('ExternalDashboardComponent', () => {
  let component: ExternalDashboardComponent;
  let fixture: ComponentFixture<ExternalDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExternalDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
