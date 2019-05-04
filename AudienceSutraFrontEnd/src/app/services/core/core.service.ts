import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { REQUEST_HEADERS } from '../api.endpoint.helpers';

@Injectable()
export class CoreService {
  public header: any;
  public options: any;

  public static httpErrorMessage = new BehaviorSubject<Response>(null);
  public static cast = CoreService.httpErrorMessage.asObservable();


  constructor(public http: Http) {
    this.header = new Headers({ "X-CSRFToken": REQUEST_HEADERS.csrftoken() });
    this.options = new RequestOptions({ headers: this.header });
  }

  public onError(error: Response) {
    CoreService.httpErrorMessage.next(error);
    return Observable.throw(error || 'An error has occured');
  }

}
