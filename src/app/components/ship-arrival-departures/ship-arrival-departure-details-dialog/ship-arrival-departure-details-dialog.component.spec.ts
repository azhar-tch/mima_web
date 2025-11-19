import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShipArrivalDepartureDetailsDialogComponent } from './ship-arrival-departure-details-dialog.component';

describe('ShipArrivalDepartureDetailsDialogComponent', () => {
  let component: ShipArrivalDepartureDetailsDialogComponent;
  let fixture: ComponentFixture<ShipArrivalDepartureDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShipArrivalDepartureDetailsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShipArrivalDepartureDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
