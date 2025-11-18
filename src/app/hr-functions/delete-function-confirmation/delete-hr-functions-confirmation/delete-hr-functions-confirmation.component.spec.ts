import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteHrFunctionConfirmationComponent } from './delete-hr-functions-confirmation.component';

describe('DeleteHrFunctionConfirmationComponent', () => {
  let component: DeleteHrFunctionConfirmationComponent;
  let fixture: ComponentFixture<DeleteHrFunctionConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteHrFunctionConfirmationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteHrFunctionConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
