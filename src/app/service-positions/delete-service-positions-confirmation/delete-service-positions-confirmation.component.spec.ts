import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteServicePositionConfirmationComponent } from './delete-service-positions-confirmation.component';

describe('DeleteServicePositionConfirmationComponent', () => {
  let component: DeleteServicePositionConfirmationComponent;
  let fixture: ComponentFixture<DeleteServicePositionConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteServicePositionConfirmationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteServicePositionConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
