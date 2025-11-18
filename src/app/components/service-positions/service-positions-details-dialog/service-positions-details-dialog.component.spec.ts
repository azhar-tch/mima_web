import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServicePositionDetailsDialogComponent } from './service-positions-details-dialog.component';

describe('ServicePositionDetailsDialogComponent', () => {
  let component: ServicePositionDetailsDialogComponent;
  let fixture: ComponentFixture<ServicePositionDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicePositionDetailsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicePositionDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
