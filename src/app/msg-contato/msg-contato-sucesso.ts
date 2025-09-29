import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-msg-contato-sucesso',
  imports: [],
  templateUrl: './msg-contato-sucesso.html',
  styleUrls: ['./msg-contato.css']
})
export class MsgContatoSucesso {
  constructor(private dialogRef: MatDialogRef<MsgContatoSucesso>) {}

  close() {
    this.dialogRef.close();
  }
}
