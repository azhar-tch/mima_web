import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditOtherPositionDialogComponent } from './edit-other-positions-dialog.component';

describe('EditOtherPositionDialogComponent', () => {
  let component: EditOtherPositionDialogComponent;
  let fixture: ComponentFixture<EditOtherPositionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditOtherPositionDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditOtherPositionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
