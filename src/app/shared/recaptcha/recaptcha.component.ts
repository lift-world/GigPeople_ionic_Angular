import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: "app-recaptcha",
  templateUrl: "./recaptcha.component.html",
  styleUrls: ["./recaptcha.component.scss"],
})
export class RecaptchaComponent implements AfterViewInit, OnInit {
  @ViewChild("recaptcha", { static: true }) recaptchaElement: ElementRef;
  @Output() handleToggle = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.addRecaptchaScript();
  }

  renderReCaptch() {
    window["grecaptcha"].render(this.recaptchaElement.nativeElement, {
      sitekey: environment.grecaptchakey,
      callback: (response) => {
        this.handleToggle.emit(true);
      },
    });
  }

  addRecaptchaScript() {
    window["grecaptchaCallback"] = () => {
      this.renderReCaptch();
    };

    (function (d, s, id, obj) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        obj.renderReCaptch();
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src =
        "https://www.google.com/recaptcha/api.js?onload=grecaptchaCallback&amp;render=explicit";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "recaptcha-jssdk", this);
  }
}
