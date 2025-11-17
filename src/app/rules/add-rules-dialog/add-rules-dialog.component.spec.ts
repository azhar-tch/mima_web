import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRulesDialogComponent } from './add-rules-dialog.component';

describe('AddRulesDialogComponent', () => {
  let component: AddRulesDialogComponent;
  let fixture: ComponentFixture<AddRulesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddRulesDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRulesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
