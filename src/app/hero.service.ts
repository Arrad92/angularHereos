import {Injectable} from '@angular/core';
import{Http,Headers} from '@angular/http';
import {Hero} from './hero';

import 'rxjs/add/operator/toPromise';
@Injectable()
export class HeroService{
    private heroesUrl = 'api/heroes';
    private headers =new Headers({'Content-type':'application/json'});
    constructor(private http:Http){}
    getHeroes():Promise<Hero[]>{
        return this.http.get(this.heroesUrl)
        .toPromise()
        .then(response => response.json().data as Hero[])
        .catch(this.handleError);
    }
    getHero(id:number):Promise<Hero>{
        const url =`${this.heroesUrl}/${id}`;
        return this.http.get(url)
        .toPromise()
        .then(response => response.json().data as Hero)
        .catch(this.handleError);
    }
    handleError(error:any):Promise<any>{
     console.log('errooor');
     return Promise.reject(error.message|error);
    }
    update(hero:Hero):Promise<Hero>{
        const url=`${this.heroesUrl}/${hero.id}`;
        
        return this.http.put(url,JSON.stringify(hero),{headers:this.headers})
        .toPromise()
        .then(()=>hero)
        .catch(this.handleError)
    }
    add(heroName:string):Promise<Hero>{
        const url=this.heroesUrl;
        return this.http.post(url,JSON.stringify({name:heroName}),{headers:this.headers})
        .toPromise()
        .then((res)=>res.json().data as Hero)
    }
    delete(id:number){
        const url=`${this.heroesUrl}/${id}`;
        return this.http.delete(url,{headers:this.headers})
        .toPromise()
        .then(()=>null)
        .catch(this.handleError)
    }

}
