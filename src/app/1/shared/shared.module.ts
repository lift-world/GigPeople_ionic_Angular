import { RatingControlComponent } from './rating-control/rating-control.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { BlankComponent } from './blank/blank.component';
import { RecaptchaComponent } from './recaptcha/recaptcha.component';
import { MaterialModule } from 'src/app/1/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { YesNoComponent } from './yes-no/yes-no.component';
import { CountryPickerComponent } from './country-picker/country-picker.component';
import { CategoryPickerComponent } from './category-picker/category-picker.component';
import { SkillsPickerComponent } from './skills-picker/skills-picker.component';
import { SkillPickerComponent } from './skill-picker/skill-picker.component';
import { GcsUploaderComponent } from './gcs-uploader/gcs-uploader.component';
import { ValidMarkerComponent } from './valid-marker/valid-marker.component';
import { IonicModule } from '@ionic/angular';
import { RatingComponent } from './rating/rating.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CountryFlagComponent } from './country-flag/country-flag.component';
import { UpdateBidComponent } from './update-bid/update-bid.component';
import { BadgeChatComponent } from './header/badge-chat/badge-chat.component';
import { BadgeNotifyComponent } from './header/badge-notify/badge-notify.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    BlankComponent,
    RecaptchaComponent,
    YesNoComponent,
    CountryPickerComponent,
    CategoryPickerComponent,
    SkillPickerComponent,
    SkillsPickerComponent,
    GcsUploaderComponent,
    ValidMarkerComponent,
    RatingComponent,
    RatingControlComponent,
    CountryFlagComponent,
    UpdateBidComponent,
/**Not export */
    BadgeChatComponent,
    BadgeNotifyComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    BlankComponent,
    RecaptchaComponent,
    YesNoComponent,
    CountryPickerComponent,
    CategoryPickerComponent,
    // SkillPickerComponent,
    SkillsPickerComponent,
    GcsUploaderComponent,
    ValidMarkerComponent,
    RatingComponent,
    RatingControlComponent,
    CountryFlagComponent,
    UpdateBidComponent
  ],
})
export class SharedModule {}
