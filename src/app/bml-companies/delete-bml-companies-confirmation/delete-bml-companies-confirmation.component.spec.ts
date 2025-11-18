import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteBmlCompanyConfirmationComponent } from './delete-bml-companies-confirmation.component';

describe('DeleteBmlCompanyConfirmationComponent', () => {
  let component: DeleteBmlCompanyConfirmationComponent;
  let fixture: ComponentFixture<DeleteBmlCompanyConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteBmlCompanyConfirmationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteBmlCompanyConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
