import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Artesanato } from './artesanato';

describe('Artesanato', () => {
  let component: Artesanato;
  let fixture: ComponentFixture<Artesanato>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Artesanato]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Artesanato);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
