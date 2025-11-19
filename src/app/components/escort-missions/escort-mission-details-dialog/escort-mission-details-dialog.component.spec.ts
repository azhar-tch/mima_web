import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EscortMissionDetailsDialogComponent } from './escort-mission-details-dialog.component';

describe('EscortMissionDetailsDialogComponent', () => {
  let component: EscortMissionDetailsDialogComponent;
  let fixture: ComponentFixture<EscortMissionDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EscortMissionDetailsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EscortMissionDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
