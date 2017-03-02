import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { AppComponent }        from './app.component';
import { HeroDetailComponent } from './hero_detail.component';
import { HeroesComponent }     from './heroes.component';
import {DashboardComponent} from './dashboard.component';
import { HeroService }   from './hero.service';
import {RouterModule} from '@angular/router';
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: 'heroes',
        component: HeroesComponent
      },
      {
        path:'dashboard',
        component:DashboardComponent
      },
      {
        path:'detail/:id',
        component:HeroDetailComponent
      }
    ])
  ],
  declarations: [
    AppComponent,
    HeroDetailComponent,
    HeroesComponent,
    DashboardComponent
  ],
  providers: [
    HeroService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}