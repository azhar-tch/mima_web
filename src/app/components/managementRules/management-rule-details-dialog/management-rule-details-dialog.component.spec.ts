import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManagementRuleDetailsDialogComponent } from './management-rule-details-dialog.component';

describe('ManagementRuleDetailsDialogComponent', () => {
  let component: ManagementRuleDetailsDialogComponent;
  let fixture: ComponentFixture<ManagementRuleDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagementRuleDetailsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagementRuleDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
