import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OtherPositionDetailsDialogComponent } from './other-positions-details-dialog.component';

describe('OtherPositionDetailsDialogComponent', () => {
  let component: OtherPositionDetailsDialogComponent;
  let fixture: ComponentFixture<OtherPositionDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OtherPositionDetailsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtherPositionDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
