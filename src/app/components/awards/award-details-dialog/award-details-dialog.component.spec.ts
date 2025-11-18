import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AwardDetailsDialogComponent } from './award-details-dialog.component';

describe('AwardDetailsDialogComponent', () => {
  let component: AwardDetailsDialogComponent;
  let fixture: ComponentFixture<AwardDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AwardDetailsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AwardDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
