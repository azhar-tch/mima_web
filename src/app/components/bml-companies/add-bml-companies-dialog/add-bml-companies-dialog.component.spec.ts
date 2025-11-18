import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddBmlCompanyDialogComponent } from './add-bml-companies-dialog.component';

describe('AddBmlCompanyDialogComponent', () => {
  let component: AddBmlCompanyDialogComponent;
  let fixture: ComponentFixture<AddBmlCompanyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddBmlCompanyDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBmlCompanyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
