import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Chat, Msg } from 'src/app/1/services/chat.service';

@Component({
  selector: "app-message-body",
  templateUrl: "./message-body.component.html",
  styleUrls: ["./message-body.component.scss"],
})
export class MessageBodyComponent implements OnInit {
  @Input() chat: Chat;

  constructor() { this.initForm(); }
  ngOnInit() {}

  form: FormGroup;
  initForm() {
    this.form = new FormGroup({
      text: new FormControl(null, {
        validators: [Validators.required],
      }),
    });
    this.form.setValue({
      text: "",
    });
  }

  onSubmit() {
    if (!this.form.valid) return false;
    console.log(this.form.value.text);
    this.form.setValue({ text: "" });
    return false;
  }

  isMine(msg: Msg) {
    if (this.chat && msg?.senderId == this.chat?.me._id) return true;
    return false;
  }
}
