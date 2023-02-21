import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-field',
  templateUrl: './error-field.component.html',
  styleUrls: ['./error-field.component.css']
})
export class ErrorFieldComponent implements OnInit {

  @Input() campo:any;
  @Input() formDir:any;
  @Input() nomeCampo:any;

  constructor() { }

  ngOnInit(): void {
  }

}
