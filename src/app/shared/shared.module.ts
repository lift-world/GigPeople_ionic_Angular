import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { BlankComponent } from './blank/blank.component';
import { RecaptchaComponent } from './recaptcha/recaptcha.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, BlankComponent, RecaptchaComponent],
  imports: [CommonModule, RouterModule],
  exports: [HeaderComponent, FooterComponent, BlankComponent, RecaptchaComponent],
})
export class SharedModule {}
