import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  readonly data = [
    ['January', 33],
    ['February', 68],
    ['March', 49],
    ['April', 15],
    ['May', 15],
    ['June', 27],
  ]

  constructor() { }

  /**
   * Return an observable containing the data to be displayed on graphics
   * 
   * @return Observable<any>
  */
  getData(): Observable<any> {
    return new Observable( observable => {
      // notify all observable written 
      observable.next(this.data);
      // notify subscriber the end of communication
      observable.complete();
    });
  }

}
