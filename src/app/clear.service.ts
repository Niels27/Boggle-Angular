import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ClearService {
private subject = new Subject<any>();
  constructor() { }

  clear():void {
    this.subject.next(false);
  }

  onClear(): Observable<any>{
    return this.subject.asObservable();
  }

}
