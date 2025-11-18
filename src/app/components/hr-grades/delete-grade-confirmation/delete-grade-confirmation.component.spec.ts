import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteGradeConfirmationComponent } from './delete-grade-confirmation.component';

describe('DeleteGradeConfirmationComponent', () => {
  let component: DeleteGradeConfirmationComponent;
  let fixture: ComponentFixture<DeleteGradeConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteGradeConfirmationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteGradeConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
