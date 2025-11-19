import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SecurityAgencyDetailsDialogComponent } from './security-agency-details-dialog.component';

describe('SecurityAgencyDetailsDialogComponent', () => {
  let component: SecurityAgencyDetailsDialogComponent;
  let fixture: ComponentFixture<SecurityAgencyDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecurityAgencyDetailsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecurityAgencyDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
