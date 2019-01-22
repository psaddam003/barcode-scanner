import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { BarcodeComponent } from './barcode/barcode.component';
import { MatCardModule, MatToolbarModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BarcodeValidatorService } from './services/barcode-validator.service';
import { BarcodeDecoderService } from './services/barcode-decoder.service';

@NgModule({
  declarations: [
    AppComponent,
    BarcodeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatCardModule,
    FormsModule,
    HttpClientModule,
  ],
  bootstrap: [
    AppComponent,
  ],
  providers: [
    BarcodeValidatorService,
    BarcodeDecoderService,
  ]
})

export class AppModule { }

