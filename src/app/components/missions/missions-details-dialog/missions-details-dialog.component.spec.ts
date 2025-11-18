import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionsDetailsDialogComponent } from './missions-details-dialog.component';

describe('MissionsDetailsDialogComponent', () => {
  let component: MissionsDetailsDialogComponent;
  let fixture: ComponentFixture<MissionsDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MissionsDetailsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MissionsDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
