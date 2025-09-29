import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-msg-contato-erro',
  imports: [],
  templateUrl: './msg-contato-erro.html',
  styleUrls: ['./msg-contato.css']
})
export class MsgContatoErro {
  constructor(private dialogRef: MatDialogRef<MsgContatoErro>) {}

  close() {
    this.dialogRef.close();
  }
}
