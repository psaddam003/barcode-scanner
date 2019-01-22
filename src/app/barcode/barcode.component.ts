import { Component, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { BarcodeDecoderService } from 'app/services/barcode-decoder.service';
import { BarcodeValidatorService } from 'app/services/barcode-validator.service';

@Component({
  selector: 'app-barcode',
  template: `
    <mat-card class="app-input-section hidden__sm" *ngIf="lastResult">
  <div class="ticket">
    <div class="datas">
      <a class="link">
        <div class="ribbon">
          <div class="label">LIMITED</div>
        </div>
        <span>Your Code is</span>
        <strong>{{ lastResult || async }}'</strong>
        <em *ngIf="!message">Searching...</em>
        <em *ngIf="message">{{message}}</em>
      </a>
    </div>
  </div>
</mat-card>

<mat-card>
  <div class="show__sm" *ngIf="lastResult">
    <p>Your Code is</p>
    <p>{{ lastResult || async }}'</p>
    <p *ngIf="!message">Searching...</p>
    <p *ngIf="message">{{message}}</p>
  </div>

  <div id="interactive" class="viewport" #interactive></div>
</mat-card>



  `,
  styleUrls: ['./barcode.component.scss'],
})
export class BarcodeComponent {
  lastResult: any;
  message: any;
  error: any;

  code$ = new Subject<any>();

  @ViewChild('interactive') interactive;

  constructor(private decoderService: BarcodeDecoderService, private barcodeValidator: BarcodeValidatorService) { };

  ngOnInit() {

    this.decoderService.onLiveStreamInit();
    this.decoderService.onDecodeProcessed();

    this.decoderService
      .onDecodeDetected()
      .then(code => {
        this.lastResult = code;
        this.decoderService.onPlaySound();
        this.code$.next(code);
      })
      .catch((err) => this.error = `Something Wrong: ${err}`);

    this.barcodeValidator
      .doSearchbyCode(this.code$)
      .subscribe(
        res => this.message = res,
        err => {
          this.message = `An Error! ${err.json().error}`;
        },
      );
  }

  ngAfterContentInit() {
    this.interactive.nativeElement.children[0].style.position = 'absolute';
  }

  ngOnDestroy() {
    this.decoderService.onDecodeStop();
  }

}
