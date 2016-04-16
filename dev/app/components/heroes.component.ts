import {Component, OnInit} from 'angular2/core';
import {HeroDetailComponent} from './hero-detail.component';
import {Router} from "angular2/router";
import {Hero} from "../shared/hero";
import {HeroService} from "../services/hero.service";

@Component({
    selector: 'my-heroes',
    templateUrl: '../../templates/heroes.template.html',
    styleUrls: ['../../assets/css/heroes.css'],
    directives: [HeroDetailComponent]
})

export class HeroesComponent implements OnInit {
    heroes:Hero[];
    selectedHero:Hero;

    constructor(private _heroService:HeroService, private _router:Router) {
    }

    onSelect(hero:Hero) {
        this.selectedHero = hero;
    }

    getHeroes() {
        this._heroService.getHeroes().then(heroes => this.heroes = heroes);
    }

    ngOnInit():any {
        this.getHeroes();
    }

    gotoDetail() {
        this._router.navigate(['HeroDetail', {id: this.selectedHero.id}]);
    }

}