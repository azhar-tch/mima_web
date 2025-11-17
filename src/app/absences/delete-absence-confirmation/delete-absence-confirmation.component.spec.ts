import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAbsenceConfirmationComponent } from './delete-absence-confirmation.component';

describe('DeleteAbsenceConfirmationComponent', () => {
  let component: DeleteAbsenceConfirmationComponent;
  let fixture: ComponentFixture<DeleteAbsenceConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteAbsenceConfirmationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteAbsenceConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
