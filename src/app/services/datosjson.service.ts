import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AutorizaObject } from '../interfaces/interfaces';


@Injectable({
  providedIn: 'root'
})
export class DatosjsonService {

    userAutoriza: string;
  constructor(private http: HttpClient) { }



  getDataJson(usr: string){

    return this.http.get<AutorizaObject>(`http://190.145.163.74:8282/agricolasoft/blank_Json_autorizaciones4/?user_autorizacion=${usr}`);

  }

  getDataUser(email: string, pass: string){

    return this.http.get(`http://190.145.163.74:8282/agricolasoft/blank_Json_loginuser/?email=${email}&pass=${pass}`);

  }


  getDataToken(user: string, id: number){

    return this.http.get(`http://190.145.163.74:8282/agricolasoft/blank_tokenApp/?id=${id}&usr_login=${user}`);

  }

  getGetToken( id: number ){

    return this.http.get(`http://190.145.163.74:8282/agricolasoft/blank_tokenJsonGetApp/?id=${id}`);

  }

  getAprobacion( id: number,  usr: string ){

    return this.http.get(`http://190.145.163.74:8282/agricolasoft/blank_tokenAprobacionApp/?id=${id}&usr_login=${usr}`);

  }


  getNoAprobado( id: number,  usr: string ){

    return this.http.get(`http://190.145.163.74:8282/agricolasoft/blank_NoAprobado/?id=${id}&usr_login=${usr}`);

  }


}

