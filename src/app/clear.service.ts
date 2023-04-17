import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';


@Injectable({

  providedIn: 'root'
})
export class ClearService {
  private subject = new Subject<any>(); //subject is used to emit events when clear is called
  constructor() { }

  //calls the next method of the subject and passes false which emits an event to all subscribers 
  clear(): void {
    this.subject.next(false);
  }
 // returns an observable that can be subscribed to by other classes in the application. 
  onClear(): Observable<any> {
    return this.subject.asObservable();
  }

}
//When the clear() method is called, the subject emits a value, 
//which will be received by any subscribers to the observable returned by onClear().