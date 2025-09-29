import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-msg-excluir',
  imports: [CommonModule],
  templateUrl: './msg-excluir.html',
  styleUrls: ['./msg-excluir.css']
})
export class MsgExcluir {
  @Input() title?: string;
  @Input() message?: string;
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
}
