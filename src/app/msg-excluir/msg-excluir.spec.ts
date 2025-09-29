import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsgExcluir } from './msg-excluir';

describe('MsgExcluir', () => {
  let component: MsgExcluir;
  let fixture: ComponentFixture<MsgExcluir>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MsgExcluir]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MsgExcluir);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
