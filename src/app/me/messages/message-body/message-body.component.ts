import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Chat, Msg } from 'src/app/1/services/chat.service';

@Component({
  selector: "app-message-body",
  templateUrl: "./message-body.component.html",
  styleUrls: ["./message-body.component.scss"],
})
export class MessageBodyComponent implements OnInit, OnChanges {
  @Input() chat: Chat;

  @Output() handleSubmit = new EventEmitter<{ text: string }>();
  @Output() handleFocus = new EventEmitter<Chat>();
  @ViewChild("scrollFrame", { static: false }) scrollFrame: ElementRef;

  constructor() {
    this.initForm();
  }
  ngOnInit() {}

  ngOnChanges() {
    // console.log(this.chat);
    setTimeout(() => {
      this.scrollToBottom();
    }, 300);
  }

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

    this.handleSubmit.emit({ text: this.form.value.text });

    this.form.setValue({ text: "" });
    return false;
  }

  onFocus() {
    this.handleFocus.emit(this.chat);
    this.scrollToBottom();
  }

  isMine(msg: Msg) {
    if (this.chat && msg?.senderId == this.chat?.me._id) return true;
    return false;
  }

  private scrollToBottom(): void {
    const elem = this.scrollFrame.nativeElement;
    elem.scroll({
      top: elem.scrollHeight,
      left: 0,
      behavior: "smooth",
    });
  }
}
