import { IResponse } from './../../search.model';
import { SearchTextService } from './../../search.service';
import { ListService } from '../../search.service';
import { IMovie } from '../../search.model';
import { Component } from '@angular/core';
import { debounceTime, tap, map, takeUntil } from 'rxjs/operators'
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  public form: FormGroup;
  public $items: Observable<IMovie[]>;
  private destroy$ = new Subject();

  constructor(private searchTextService: SearchTextService, private router: Router, public fb: FormBuilder, private listSrv: ListService) {
    this.form = this.fb.group({
      searchText: [null],
      filterText: [null]
    });
    //subscribe to form changes
    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((res) => {
      const { searchText, filterText } = res;
      if (searchText || filterText) {
        const searchArg = `${searchText ? '&s=' + searchText : ''}`;
        const filterArg = `${filterText ? '&t=' + filterText : ''}`;
        const arg = searchArg.concat(filterArg);

        this.searchTextService.setSearchText(arg);
        this.$items = this.search(arg);
      } else {
        this.searchTextService.$getSearchText()
          .pipe(tap(res => this.$items = this.search(res)))
          .subscribe();
      }
    })
  }
  //redirect
  public goto(item: IMovie): void {
    this.router.navigateByUrl('search/detail/' + item.Title);
  }
  //perform search s=
  public search(params: string): Observable<IMovie[]> {
    return this.listSrv.get(`${params}`)
      .pipe(debounceTime(5000), map((r: IResponse) => r.Search))
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
