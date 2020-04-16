import { IMovie } from './search.model';
import { HttpClient } from '@angular/common/http';
import { BaseService } from 'src/app/services/base.service';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ListService extends BaseService<IMovie> {
  constructor(http: HttpClient) {
    super(http, '');
  }
}

@Injectable({ providedIn: 'root' })
export class SearchTextService {
  private subject = new Subject<any>();

  setSearchText(text: string) {
    this.subject.next(text);
  }

  clearSearchText() {
    this.subject.next();
  }

  getSearchText(): Observable<any> {
    return this.subject.asObservable();
  }
}