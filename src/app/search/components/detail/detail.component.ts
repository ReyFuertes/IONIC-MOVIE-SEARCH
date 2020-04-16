import { IMovie } from './../../search.model';
import { debounceTime, map } from 'rxjs/operators';
import { ListService } from './../../search.service';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})

export class DetailComponent implements OnInit {
  @Input()
  public title: string;
  public $item: Observable<IMovie>;
  constructor(private route: ActivatedRoute, private listSrv: ListService) { }

  ngOnInit() {
    //get params
    this.route.paramMap.subscribe(query => {
      this.$item = this.search(query.get('title'));
      this.$item.subscribe(res => console.log(res))
    });
  }
  //perform search t=
  public search(params: any): any {
    return this.listSrv.get(`&t=${params}`);
  }
}