import { Component, OnInit, Input } from '@angular/core';
import { SocialBlock } from '../../classes/Elements';

@Component({
  selector: 'ip-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.css'],
})
export class SocialComponent implements OnInit {
  @Input()
  block: SocialBlock;

  constructor() {}

  ngOnInit() {}
}
