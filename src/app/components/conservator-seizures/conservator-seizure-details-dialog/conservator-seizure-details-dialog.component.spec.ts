import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConservatorSeizureDetailsDialogComponent } from './conservator-seizure-details-dialog.component';

describe('ConservatorSeizureDetailsDialogComponent', () => {
  let component: ConservatorSeizureDetailsDialogComponent;
  let fixture: ComponentFixture<ConservatorSeizureDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConservatorSeizureDetailsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConservatorSeizureDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
