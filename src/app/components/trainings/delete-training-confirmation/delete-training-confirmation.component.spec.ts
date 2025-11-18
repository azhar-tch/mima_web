import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteTrainingConfirmationComponent } from './delete-training-confirmation.component';

describe('DeleteTrainingConfirmationComponent', () => {
  let component: DeleteTrainingConfirmationComponent;
  let fixture: ComponentFixture<DeleteTrainingConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteTrainingConfirmationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteTrainingConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
