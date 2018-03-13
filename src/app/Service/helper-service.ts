import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {stringDistance} from 'codelyzer/util/utils';

@Injectable()
export class HelperService implements OnInit {

  public baseUrl = 'http://www.yangmz.com';
  private headers = new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8')


  public static timestamp2String (value: string): string {
    const date = new Date();
    date.setTime(Number(value));
    let temp = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    temp = temp + ' ';
    if ( date.getHours() < 10) {
      temp = temp + '0';
    }
    temp = temp + date.getHours() + ':';
    if ( date.getMinutes() < 10) {
      temp = temp + '0';
    }
    temp = temp + date.getMinutes();
    return temp;
  }

  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit() {
  }



  public httpGet(uri: string) {
    const url = this.baseUrl + uri;
    const httpOption = {headers: this.headers};
    return this.http.get(url, httpOption);
  }

  public httpPost(uri: string, paramsMap: Map<string, string> ) {
    let it: IterableIterator<any>;
    let body = new HttpParams();
    if ( paramsMap != null) {
      it = paramsMap.keys();
      while (true) {
        const itResult: IteratorResult<any> = it.next();
        if ( itResult.done) {
          break;
        }
        const key = itResult.value;
        body = body.set(key, paramsMap.get(key));
      }
    }
    const url = this.baseUrl + uri;
    const httpOption = {
      headers: this.headers
    };
    return this.http.post(url, body, httpOption);
  }


}
