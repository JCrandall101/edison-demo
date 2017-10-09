import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';

import {Observable} from 'rxjs/observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AppService {

  constructor(private http: Http) { }

  public getZambiaProvinceJson(){
   return this.http.get("./assets/geojson/zambia-province.geojson")
    .map(res => res.json());
  }

  public getZambiaData(){
    let provinces = ['Luapula','Northern','Eastern','Central','Lusaka','Copperbelt','Southern','Western','North Western'];
    let genders = ['Male','Female'];
    let types = ['SHS','ESS Microgrid','Microgrid'];

    let results: any[] = [];

    for(let i = 0; i < 1000; i++){
      results.push({
        province: provinces[Math.floor(Math.random() * 9)],
        customerGender: genders[Math.floor(Math.random() * 2)],
        type: types[Math.floor(Math.random() * 3)]
      })

    }

    return results;
  }

}
