import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDutyConfirmationComponent } from './delete-duty-confirmation.component';

describe('DeleteDutyConfirmationComponent', () => {
  let component: DeleteDutyConfirmationComponent;
  let fixture: ComponentFixture<DeleteDutyConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteDutyConfirmationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteDutyConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
