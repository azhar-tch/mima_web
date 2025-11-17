import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRulesConfirmationComponent } from './delete-rules-confirmation.component';

describe('DeleteRulesConfirmationComponent', () => {
  let component: DeleteRulesConfirmationComponent;
  let fixture: ComponentFixture<DeleteRulesConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteRulesConfirmationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteRulesConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
