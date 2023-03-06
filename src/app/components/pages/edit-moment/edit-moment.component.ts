import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Moment } from 'src/app/Moment';
import { MomentService } from 'src/app/service/moment.service';
import { MessagesService } from 'src/app/service/messages.service';

@Component({
  selector: 'app-edit-moment',
  templateUrl: './edit-moment.component.html',
  styleUrls: ['./edit-moment.component.css']
})
export class EditMomentComponent implements OnInit {

  moment!: Moment;
  btnText: string = 'Editar';

  constructor(private momentService: MomentService,
    private route: ActivatedRoute,
    private messageService: MessagesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"));

    this.momentService.getMoment(id).subscribe(item => {
      this.moment = item.data;
    })
  }

  async editHandler(momentData:Moment){
    const id = Number(this.moment.id);

    const formData = new FormData();

    formData.append('title', momentData.title);
    formData.append('description', momentData.description);
    if(momentData.image) formData.append('image', momentData.image);

    await this.momentService.update(id, formData).subscribe();

    this.messageService.add(`Moment ${id} foi atualizado com sucesso!`)

    this.router.navigate([`/moments/${id}`])

  }

}
