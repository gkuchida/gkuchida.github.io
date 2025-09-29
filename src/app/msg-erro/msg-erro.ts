import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-msg-erro',
  imports: [],
  templateUrl: './msg-erro.html',
  styleUrls: ['./msg-erro.css']
})
export class MsgErro {
  constructor(private dialogRef: MatDialogRef<MsgErro>) {}

  close() {
    this.dialogRef.close();
  }
}
