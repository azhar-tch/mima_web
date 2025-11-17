import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteUnitConfirmationComponent } from './delete-unit-confirmation.component';

describe('DeleteUnitConfirmationComponent', () => {
  let component: DeleteUnitConfirmationComponent;
  let fixture: ComponentFixture<DeleteUnitConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteUnitConfirmationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteUnitConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
