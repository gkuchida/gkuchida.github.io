import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsgContato } from './msg-contato';

describe('MsgContato', () => {
  let component: MsgContato;
  let fixture: ComponentFixture<MsgContato>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MsgContato]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MsgContato);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
