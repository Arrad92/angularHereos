import {Injectable} from '@angular/core';
import {Hero} from './hero';
import{HEROES} from './hero_mocks';
@Injectable()
export class HeroService{
    getHeroes():Promise<Hero[]>{
        return Promise.resolve(HEROES);
    }
    getHero(id:number):Promise<Hero>{
        return this.getHeroes().then(hereos=>hereos.find(hero=>hero.id===id));
    }
}
