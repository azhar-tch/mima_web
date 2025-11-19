import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommercialShipDetailsDialogComponent } from './commercial-ship-details-dialog.component';

describe('CommercialShipDetailsDialogComponent', () => {
  let component: CommercialShipDetailsDialogComponent;
  let fixture: ComponentFixture<CommercialShipDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommercialShipDetailsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommercialShipDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
