import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Prontas } from './prontas';

describe('Prontas', () => {
  let component: Prontas;
  let fixture: ComponentFixture<Prontas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Prontas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Prontas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
