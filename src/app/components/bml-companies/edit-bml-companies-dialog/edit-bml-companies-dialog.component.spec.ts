import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditBmlCompanyDialogComponent } from './edit-bml-companies-dialog.component';

describe('EditBmlCompanyDialogComponent', () => {
  let component: EditBmlCompanyDialogComponent;
  let fixture: ComponentFixture<EditBmlCompanyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditBmlCompanyDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBmlCompanyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
