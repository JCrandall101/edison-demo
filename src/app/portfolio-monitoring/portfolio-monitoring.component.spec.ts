import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioMonitoringComponent } from './portfolio-monitoring.component';

describe('PortfolioMonitoringComponent', () => {
  let component: PortfolioMonitoringComponent;
  let fixture: ComponentFixture<PortfolioMonitoringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortfolioMonitoringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
