import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditServicePositionDialogComponent } from './edit-service-positions-dialog.component';

describe('EditServicePositionDialogComponent', () => {
  let component: EditServicePositionDialogComponent;
  let fixture: ComponentFixture<EditServicePositionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditServicePositionDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditServicePositionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
