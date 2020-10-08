import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { BlankComponent } from './blank/blank.component';
import { RecaptchaComponent } from './recaptcha/recaptcha.component';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { YesNoComponent } from './yes-no/yes-no.component';
import { CountryPickerComponent } from './country-picker/country-picker.component';
import { CategoryPickerComponent } from './category-picker/category-picker.component';
import { SkillsPickerComponent } from './skills-picker/skills-picker.component';
import { SkillPickerComponent } from './skill-picker/skill-picker.component';
import { GcsUploaderComponent } from './gcs-uploader/gcs-uploader.component';
import { ValidMarkerComponent } from './valid-marker/valid-marker.component';
import { IonicModule } from '@ionic/angular';

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
    ValidMarkerComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
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
    ValidMarkerComponent
  ],
})
export class SharedModule {}
