import { Component,OnInit } from '@angular/core';

import {Hero} from './hero';
import {HeroService} from './hero.service';
import {Router} from '@angular/router';
@Component({
  selector: 'my-heroes',
  template: `<h1>{{title}}</h1>
             <h2>My Hereos</h2>
             <ul class="heroes">
             <label>Hero name: </label><input #heroName/>  <button (click)="create(heroName.value); heroName.value=''">Add</button>
             <li *ngFor="let hero of hereos" [class.selected]="hero===selectedHero" (click)="onSelect(hero)"><span class="badge">{{hero.id}}</span>{{hero.name}}
             <button (click)="delete(hero);$event.stopPropagation()">delete</button>
             </li>
             </ul>
             <div *ngIf="selectedHero">
              <h2>{{selectedHero.name}} details!</h2>
              <div><label>id: </label>{{selectedHero.id}}</div>
                  <button (click)="goDetail()">view Detail</button>
              </div>
            `,
  styles:[`
    .selected {
      background-color: #CFD8DC !important;
      color: white;
    }
    .heroes {
      margin: 0 0 2em 0;
      list-style-type: none;
      padding: 0;
      width: 15em;
    }
    .heroes li {
      cursor: pointer;
      position: relative;
      left: 0;
      background-color: #EEE;
      margin: .5em;
      padding: .3em 0;
      height: 1.6em;
      border-radius: 4px;
    }
    .heroes li.selected:hover {
      background-color: #BBD8DC !important;
      color: white;
    }
    .heroes li:hover {
      color: #607D8B;
      background-color: #DDD;
      left: .1em;
    }
    .heroes .text {
      position: relative;
      top: -3px;
    }
    .heroes .badge {
      display: inline-block;
      font-size: small;
      color: white;
      padding: 0.8em 0.7em 0 0.7em;
      background-color: #607D8B;
      line-height: 1em;
      position: relative;
      left: -1px;
      top: -4px;
      height: 1.8em;
      margin-right: .8em;
      border-radius: 4px 0 0 4px;
    }
  `],
  providers: [HeroService]
})
export class HeroesComponent  implements OnInit { 

hereos:Hero[];
selectedHero:Hero;
constructor(private heroService:HeroService,private router:Router){}
ngOnInit():void{
  this.heroService.getHeroes().then(hereos=>this.hereos=hereos);
}
onSelect(hero:Hero){

  this.selectedHero=hero;
}
goDetail(){
this.router.navigate(['/detail', this.selectedHero.id]);
}
create(heroName:string):void{
  if(!heroName) return;
  this.heroService.add(heroName).then(hero=>{this.hereos.push(hero)
                                              this.selectedHero=null;
                                            });
  
}
delete(hero:Hero){
this.heroService.delete(hero.id)
                .then(()=>{this.hereos=this.hereos.filter(h=> h!==hero);
                            if(this.selectedHero===hero) this.selectedHero=null;
                          })
}
 }
