import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GradeDetailsDialogComponent } from './grade-details-dialog.component';

describe('GradeDetailsDialogComponent', () => {
  let component: GradeDetailsDialogComponent;
  let fixture: ComponentFixture<GradeDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GradeDetailsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GradeDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
