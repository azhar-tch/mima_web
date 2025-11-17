import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsenceDetailsDialogComponent } from './absence-details-dialog.component';

describe('AbsenceDetailsDialogComponent', () => {
  let component: AbsenceDetailsDialogComponent;
  let fixture: ComponentFixture<AbsenceDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbsenceDetailsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbsenceDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
