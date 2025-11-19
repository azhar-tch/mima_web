import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShipIncidentDetailsDialogComponent } from './ship-incident-details-dialog.component';

describe('ShipIncidentDetailsDialogComponent', () => {
  let component: ShipIncidentDetailsDialogComponent;
  let fixture: ComponentFixture<ShipIncidentDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShipIncidentDetailsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShipIncidentDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
