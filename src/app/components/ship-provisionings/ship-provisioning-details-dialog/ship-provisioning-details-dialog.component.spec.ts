import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShipProvisioningDetailsDialogComponent } from './ship-provisioning-details-dialog.component';

describe('ShipProvisioningDetailsDialogComponent', () => {
  let component: ShipProvisioningDetailsDialogComponent;
  let fixture: ComponentFixture<ShipProvisioningDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShipProvisioningDetailsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShipProvisioningDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
