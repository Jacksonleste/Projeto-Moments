import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Moment } from 'src/app/Moment';
import { environment } from 'src/environments/environment';
/* TESTE */
@Component({
  selector: 'app-moment-form',
  templateUrl: './moment-form.component.html',
  styleUrls: ['./moment-form.component.css']
})
export class MomentFormComponent implements OnInit {

  @Output() onSubmit = new EventEmitter<Moment>();
  @Input() btnText!:string;
  @Input() momentData: Moment | null = null;

  momentForm!: FormGroup;
  baseApiUrl:string = environment.baseApiUrl;

  imagem:any;

  constructor() { }

  ngOnInit(): void {
    this.momentForm = new FormGroup({
      id: new FormControl(this.momentData ? this.momentData.id: '', []),
      title: new FormControl(this.momentData ? this.momentData.title: '', [Validators.required]),
      description: new FormControl(this.momentData ? this.momentData.description: '', [Validators.required]),
      image: new FormControl('', [])
    });

    if (this.momentData) this.imagem = `${this.baseApiUrl}uploads/${this.momentData.image}`
  }

  get title(){
    return this.momentForm.get('title')!;
  }

  get description(){
    return this.momentForm.get('description')!;
  }

  onFileSelected(event:any){
    const file: File = event.target.files[0]

    if(!file){
      this.imagem = "";
      return
    }

    this.momentForm.patchValue({image: file})

    const reader = new FileReader();
    reader.onload = () => {
      this.imagem = reader.result
    }
    reader.readAsDataURL(file);
  }

  submit(){
    if(this.momentForm.invalid){
      return;
    }

    this.onSubmit.emit(this.momentForm.value);
  }

}
