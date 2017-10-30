import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalConnectionsComponent } from './external-connections.component';

describe('ExternalConnectionsComponent', () => {
  let component: ExternalConnectionsComponent;
  let fixture: ComponentFixture<ExternalConnectionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExternalConnectionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalConnectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
