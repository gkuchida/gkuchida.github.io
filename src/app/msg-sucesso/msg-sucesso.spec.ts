import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsgSucesso } from './msg-sucesso';

describe('MsgSucesso', () => {
  let component: MsgSucesso;
  let fixture: ComponentFixture<MsgSucesso>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MsgSucesso]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MsgSucesso);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
