import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-custom-tool-tip',
  templateUrl: './custom-tool-tip.component.html',
  styleUrls: ['./custom-tool-tip.component.scss'],
})
export class CustomToolTipComponent implements OnInit {
  /**
   * This is data which is to be shown in the tooltip
   */
  @Input() data: any;

  dataKeys = [];
  jsonData: any;
  constructor() {}

  ngOnInit() {
    this.jsonData = JSON.stringify(this.data, null, 2).replace(/ /g, '&nbsp;').replace(/\n/g, '<br/>');
  }
}
