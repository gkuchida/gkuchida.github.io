import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Encomenda } from './encomenda';

describe('Encomenda', () => {
  let component: Encomenda;
  let fixture: ComponentFixture<Encomenda>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Encomenda]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Encomenda);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
