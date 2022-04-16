import { Component, OnInit, Inject, Injectable } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  templateUrl: './message.component.html',

})
export class MessageComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<MessageComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  public closeMe() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
