import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddAwardDialogComponent } from './add-award-dialog.component';

describe('AddAwardDialogComponent', () => {
  let component: AddAwardDialogComponent;
  let fixture: ComponentFixture<AddAwardDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAwardDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAwardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
