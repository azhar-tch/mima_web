import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PalEntryExitDetailsDialogComponent } from './pal-entry-exit-details-dialog.component';

describe('PalEntryExitDetailsDialogComponent', () => {
  let component: PalEntryExitDetailsDialogComponent;
  let fixture: ComponentFixture<PalEntryExitDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PalEntryExitDetailsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PalEntryExitDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
