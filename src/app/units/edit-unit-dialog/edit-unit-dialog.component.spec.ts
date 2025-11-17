import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUnitDialogComponent } from './edit-unit-dialog.component';

describe('EditUnitDialogComponent', () => {
  let component: EditUnitDialogComponent;
  let fixture: ComponentFixture<EditUnitDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditUnitDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditUnitDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
