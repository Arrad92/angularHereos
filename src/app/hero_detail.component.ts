import {Component,Input,OnInit} from '@angular/core'
import {Hero} from './hero';
import {HeroService} from './hero.service';
import {ActivatedRoute,Params} from '@angular/router';
import { Location }               from '@angular/common';
import 'rxjs/add/operator/switchMap';
@Component({
selector:'my-hero-detail',
template: `<div *ngIf="hero">
              <h2>{{hero.name}} details!</h2>
              <div><label>id: </label>{{hero.id}}</div>
                  <div>
                    <label>name: </label>
                    <input [(ngModel)]="hero.name" placeholder="name"/>
                  </div>
                  <button (click)="goBack()">Go Back</button>
              </div>`
})
export class HeroDetailComponent implements OnInit{
    
hero:Hero;
constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location
  ) {}
  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.heroService.getHero(+params['id']))
      .subscribe(hero => this.hero = hero);
  }

goBack(){
    this.location.back();
}
}