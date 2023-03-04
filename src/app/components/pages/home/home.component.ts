import { Component, OnInit } from '@angular/core';

import { MomentService } from 'src/app/service/moment.service';
import { Moment } from 'src/app/Moment';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  momentList: Moment[] = [];
  momentsSearch: Moment[] = [];

  baseApiUrl = environment.baseApiUrl;

  constructor(private momentService : MomentService

  ) { }

  ngOnInit(): void {
    this.loadMoments();
    console.log(this.baseApiUrl)

  }

  loadMoments() {
    this.momentService.getMoments().subscribe((moments) =>{
      const data = moments.data;
      
      data?.map((item) =>{
        item.created_at = new Date(item.created_at!).toLocaleDateString(
          'pt-BR'
        )
      });

      this.momentList = data;
      this.momentsSearch = data;

      console.log(this.momentList)
    })
  }

}
