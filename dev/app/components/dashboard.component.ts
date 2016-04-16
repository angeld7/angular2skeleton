import {Component, OnInit} from 'angular2/core';
import {Router} from "angular2/router";
import {Hero} from "../shared/hero";
import {HeroService} from "../services/hero.service";

@Component({
    selector: 'my-dashboard',
    templateUrl: '../../templates/dashboard.template.html',
    styleUrls: ['../../assets/css/dashboard.css']
})

export class DashboardComponent implements OnInit {
    heroes:Hero[] = [];

    constructor(private _heroService:HeroService, private _router:Router) {
    }

    ngOnInit():any {
        this._heroService.getHeroes()
            .then(heroes => this.heroes = heroes.slice(1, 5));
    }

    gotoDetail(hero: Hero) {
        let link = ['HeroDetail', {id: hero.id}];
        this._router.navigate(link);
    }
}
