import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoevolutionTableComponent } from './coevolution-table.component';

describe('CoevolutionTableComponent', () => {
  let component: CoevolutionTableComponent;
  let fixture: ComponentFixture<CoevolutionTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoevolutionTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoevolutionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
