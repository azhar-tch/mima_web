import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteAwardConfirmationComponent } from './delete-award-confirmation.component';

describe('DeleteAwardConfirmationComponent', () => {
  let component: DeleteAwardConfirmationComponent;
  let fixture: ComponentFixture<DeleteAwardConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteAwardConfirmationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteAwardConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
