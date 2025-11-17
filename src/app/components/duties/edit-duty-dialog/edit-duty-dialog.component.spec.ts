import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDutyDialogComponent } from './edit-duty-dialog.component';

describe('EditDutyDialogComponent', () => {
  let component: EditDutyDialogComponent;
  let fixture: ComponentFixture<EditDutyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditDutyDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDutyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
