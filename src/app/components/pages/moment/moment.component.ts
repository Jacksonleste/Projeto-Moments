import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MomentService } from 'src/app/service/moment.service';
import { Moment } from 'src/app/Moment';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.css']
})
export class MomentComponent implements OnInit {
  
  moment?: Moment;

  baseApiUrl:string = environment.baseApiUrl;

  constructor(private momentService: MomentService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"))
    this.momentService.getMoment(id).subscribe(res=>{
      this.moment = res.data;
    })
  }


}
