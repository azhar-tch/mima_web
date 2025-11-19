import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonnelAllowanceDetailsDialogComponent } from './personnel-allowance-details-dialog.component';

describe('PersonnelAllowanceDetailsDialogComponent', () => {
  let component: PersonnelAllowanceDetailsDialogComponent;
  let fixture: ComponentFixture<PersonnelAllowanceDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonnelAllowanceDetailsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonnelAllowanceDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
