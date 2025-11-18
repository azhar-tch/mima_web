import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddServicePositionDialogComponent } from './add-service-positions-dialog.component';

describe('AddServicePositionDialogComponent', () => {
  let component: AddServicePositionDialogComponent;
  let fixture: ComponentFixture<AddServicePositionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddServicePositionDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddServicePositionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
