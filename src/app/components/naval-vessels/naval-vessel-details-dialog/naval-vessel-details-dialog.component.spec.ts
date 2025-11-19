import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavalVesselDetailsDialogComponent } from './naval-vessel-details-dialog.component';

describe('NavalVesselDetailsDialogComponent', () => {
  let component: NavalVesselDetailsDialogComponent;
  let fixture: ComponentFixture<NavalVesselDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavalVesselDetailsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavalVesselDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
