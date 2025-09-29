import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-msg-sucesso',
  imports: [],
  templateUrl: './msg-sucesso.html',
  styleUrls: ['./msg-sucesso.css']
})
export class MsgSucesso {
  constructor(private dialogRef: MatDialogRef<MsgSucesso>) {}

  close() {
    this.dialogRef.close();
  }
}
