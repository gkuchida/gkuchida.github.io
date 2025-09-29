import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsgErro } from './msg-erro';

describe('MsgErro', () => {
  let component: MsgErro;
  let fixture: ComponentFixture<MsgErro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MsgErro]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MsgErro);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
