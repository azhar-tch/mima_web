import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditHrFunctionDialogComponent } from './edit-hr-functions-dialog.component';

describe('EditHrFunctionDialogComponent', () => {
  let component: EditHrFunctionDialogComponent;
  let fixture: ComponentFixture<EditHrFunctionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditHrFunctionDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditHrFunctionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
