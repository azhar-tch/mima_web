import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StsOperationDetailsDialogComponent } from './sts-operation-details-dialog.component';

describe('StsOperationDetailsDialogComponent', () => {
  let component: StsOperationDetailsDialogComponent;
  let fixture: ComponentFixture<StsOperationDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StsOperationDetailsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StsOperationDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
