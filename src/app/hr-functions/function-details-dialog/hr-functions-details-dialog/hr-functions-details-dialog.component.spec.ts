import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HrFunctionDetailsDialogComponent } from './hr-functions-details-dialog.component';

describe('HrFunctionDetailsDialogComponent', () => {
  let component: HrFunctionDetailsDialogComponent;
  let fixture: ComponentFixture<HrFunctionDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HrFunctionDetailsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HrFunctionDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
