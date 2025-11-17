import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DutyDetailsDialogComponent } from './duty-details-dialog.component';

describe('DutyDetailsDialogComponent', () => {
  let component: DutyDetailsDialogComponent;
  let fixture: ComponentFixture<DutyDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DutyDetailsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DutyDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
