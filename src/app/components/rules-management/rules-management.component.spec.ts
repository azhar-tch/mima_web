import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RulesManagementComponent } from './rules-management.component';

describe('RulesManagementComponent', () => {
  let component: RulesManagementComponent;
  let fixture: ComponentFixture<RulesManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RulesManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RulesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
