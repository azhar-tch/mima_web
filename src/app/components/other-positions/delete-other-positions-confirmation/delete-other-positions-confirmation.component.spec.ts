import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteOtherPositionConfirmationComponent } from './delete-other-positions-confirmation.component';

describe('DeleteOtherPositionConfirmationComponent', () => {
  let component: DeleteOtherPositionConfirmationComponent;
  let fixture: ComponentFixture<DeleteOtherPositionConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteOtherPositionConfirmationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteOtherPositionConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
