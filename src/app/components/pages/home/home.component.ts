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

  allMoments: Moment[] = [];
  searchTerm:string = ""

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
      this.allMoments = data;

      console.log(this.momentList)
    })
  }

  search(e:Event){
    const target = e.target as HTMLInputElement;
    const value = target.value;

    this.momentList = this.allMoments.filter(moment => {
      return moment.title.toLocaleLowerCase().includes(value);
    })
  }

}
