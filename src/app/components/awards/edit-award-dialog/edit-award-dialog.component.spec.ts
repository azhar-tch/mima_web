import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditAwardDialogComponent } from './edit-award-dialog.component';

describe('EditAwardDialogComponent', () => {
  let component: EditAwardDialogComponent;
  let fixture: ComponentFixture<EditAwardDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditAwardDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAwardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
