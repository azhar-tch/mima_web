import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddHrFunctionDialogComponent } from './add-hr-functions-dialog.component';

describe('AddHrFunctionDialogComponent', () => {
  let component: AddHrFunctionDialogComponent;
  let fixture: ComponentFixture<AddHrFunctionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddHrFunctionDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddHrFunctionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
