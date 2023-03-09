import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterOutlet } from '@angular/router';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';

import { MomentService } from 'src/app/service/moment.service';
import { Moment } from 'src/app/Moment';
import { environment } from 'src/environments/environment';
import { MessagesService } from 'src/app/service/messages.service';
import { Comment } from 'src/app/Comment';
import { CommentService } from 'src/app/service/comment.service';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.css']
})
export class MomentComponent implements OnInit {

  commentForm!: FormGroup;
  
  moment?: Moment;

  baseApiUrl:string = environment.baseApiUrl;

  constructor(private momentService: MomentService,
    private route: ActivatedRoute,
    private messageService: MessagesService,
    private commentService: CommentService,
    private router: Router
    ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"))
    this.momentService.getMoment(id).subscribe(res=>{
      this.moment = res.data;
    })

    this.commentForm = new FormGroup({
      comment: new FormControl("", [Validators.required]),
      username: new FormControl("", [Validators.required])
    })
  }

  async removeMoment(id:number){
    this.momentService.delete(id).subscribe(data => this.messageService.add(data.msg!))
    this.router.navigate(['/'])
  }

  get comment() {
    return this.commentForm.get('comment')!;
  }

  get username() {
    return this.commentForm.get('username')!;
  }

  async onSubmit(formDirectie: FormGroupDirective){
    if(this.commentForm.invalid){
      return
    }

    const data: Comment = this.commentForm.value;

    data.momentId = Number(this.moment!.id)

    await this.commentService.createComment(data).subscribe(res => {
      this.moment!.comments!.push(res.data)  
    })

    this.messageService.add("Comentário adicionado!");

    this.commentForm.reset();
    formDirectie.resetForm();
  }



}
