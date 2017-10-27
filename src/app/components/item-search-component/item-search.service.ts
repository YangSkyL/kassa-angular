
import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {RestoItem} from './resto-item';


@Injectable()
export class ItemSearchService {
  private baseUrl = 'http://localhost:7777/api/';
  private items: RestoItem[] = [];

  constructor(private http: Http) {
    this.getItemsFromServer()
      .then(items => this.items = items)
      .catch(this.handleError);
  }

  getItems(): Promise<RestoItem[]> {
    if (this.items.length !== 0) {
      return Promise.resolve(this.items);
    } else {
      return this.getItemsFromServer();
    }
  }

  getItemsFromServer(): Promise<RestoItem[]> {
    const url = this.baseUrl + 'getItems';
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as RestoItem[])
      .catch(this.handleError);
  }

  findItemByQuicklink(quicklink: string): RestoItem {
    return this.items.find(i => i.quicklink === quicklink);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}

