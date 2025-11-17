import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDutyDialogComponent } from './add-duty-dialog.component';

describe('AddDutyDialogComponent', () => {
  let component: AddDutyDialogComponent;
  let fixture: ComponentFixture<AddDutyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDutyDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDutyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
