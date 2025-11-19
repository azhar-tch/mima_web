import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArmedGuardMissionDetailsDialogComponent } from './armed-guard-mission-details-dialog.component';

describe('ArmedGuardMissionDetailsDialogComponent', () => {
  let component: ArmedGuardMissionDetailsDialogComponent;
  let fixture: ComponentFixture<ArmedGuardMissionDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArmedGuardMissionDetailsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArmedGuardMissionDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
