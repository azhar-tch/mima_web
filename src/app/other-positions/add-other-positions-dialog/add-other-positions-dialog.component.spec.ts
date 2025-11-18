import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddOtherPositionDialogComponent } from './add-other-positions-dialog.component';

describe('AddOtherPositionDialogComponent', () => {
  let component: AddOtherPositionDialogComponent;
  let fixture: ComponentFixture<AddOtherPositionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddOtherPositionDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOtherPositionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
