import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmlCompanyDetailsDialogComponent } from './bml-companies-details-dialog.component';

describe('BmlCompanyDetailsDialogComponent', () => {
  let component: BmlCompanyDetailsDialogComponent;
  let fixture: ComponentFixture<BmlCompanyDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmlCompanyDetailsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BmlCompanyDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
