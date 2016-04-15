/**
 * Created by Angel on 4/10/2016.
 */
import {Component, Input, OnInit} from 'angular2/core';
import {Hero} from './hero';
import {HeroService} from "./hero.service";
import {RouteParams} from "angular2/router";

@Component({
    selector: 'my-hero-detail',
    templateUrl: 'templates/hero-detail.template.html',
    styleUrls: ['src/css/hero-detail.css']
})
export class HeroDetailComponent implements OnInit {
    @Input()
    hero:Hero;

    constructor(private _heroService:HeroService,
                private _routeParams:RouteParams) {
    }

    ngOnInit():any {
        let id = +this._routeParams.get('id');
        this._heroService.getHero(id)
            .then(hero => this.hero = hero);
    }

    goBack() {
        window.history.back();
    }
}