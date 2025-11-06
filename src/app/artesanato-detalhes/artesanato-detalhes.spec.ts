import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtesanatoDetalhes } from './artesanato-detalhes';

describe('ArtesanatoDetalhes', () => {
  let component: ArtesanatoDetalhes;
  let fixture: ComponentFixture<ArtesanatoDetalhes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtesanatoDetalhes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtesanatoDetalhes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
