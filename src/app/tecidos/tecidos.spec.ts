import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tecidos } from './tecidos';

describe('Tecidos', () => {
  let component: Tecidos;
  let fixture: ComponentFixture<Tecidos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tecidos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tecidos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
