import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() childEvent = new EventEmitter();
  logout() {
    this.childEvent.emit();
  }

  constructor() { }

  ngOnInit() {
  }

}
