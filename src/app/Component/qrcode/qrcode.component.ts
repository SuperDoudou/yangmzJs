import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
const QRCode = require('qrcode');

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.css']
})
export class QRcodeComponent implements OnInit, OnChanges {

  public url = '';
  @Input() public value = '';
  @Input() public width = 0;
  private qrCodeConfig = {
    errorCorrectionLevel: 'M',
    margin: 0,
    width: 300,
    type: 'image/png',
    rendererOpts: {
      quality: 0.5
    },
    color: {
      dark: '#333',
    }
  };
  constructor(
  ) { }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    setTimeout(() => this.refreshUrl(), 0);
  }
  private refreshUrl() {
    this.qrCodeConfig.width = this.width;
    QRCode.toDataURL(this.value, this.qrCodeConfig, (err, url) => {
      this.url = url;
      if (err) {
        console.error(err);
      }
    });
  }
}
