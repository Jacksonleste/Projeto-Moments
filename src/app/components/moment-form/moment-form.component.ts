import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Moment } from 'src/app/Moment';

@Component({
  selector: 'app-moment-form',
  templateUrl: './moment-form.component.html',
  styleUrls: ['./moment-form.component.css']
})
export class MomentFormComponent implements OnInit {

  @Output() onSubmit = new EventEmitter<Moment>();
  @Input() btnText!:string;

  momentForm!: FormGroup;

  imagem:any;

  constructor() { }

  ngOnInit(): void {
    this.momentForm = new FormGroup({
      id: new FormControl('', []),
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      image: new FormControl('', [])
    });
  }

  get title(){
    return this.momentForm.get('title')!;
  }

  get description(){
    return this.momentForm.get('description')!;
  }

  onFileSelected(event:any){
    const file: File = event.target.files[0]

    this.momentForm.patchValue({image: file})

    const reader = new FileReader();
    reader.onload = () => this.imagem = reader.result;
    reader.readAsDataURL(file);
  }

  submit(){
    if(this.momentForm.invalid){
      return;
    }
    console.log(this.momentForm.value);
    console.log(this.imagem);

    this.onSubmit.emit(this.momentForm.value);
  }

}
