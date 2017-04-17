import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/interval';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounce';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/pluck';


export class GithubNameSearch {

    private api;

    private search$;

    constructor (
        private $search,
        private $container
    ) {

        this.api = 'https://api.github.com/users';

        this.search$ = Observable
            .fromEvent( this.$search, 'keyup' )
            .debounce( () => Observable.interval( 300 ) )
            .pluck( 'target', 'value' )
            .filter( ( username: string) => !!username.trim() )
            .switchMap( username => this.fetch( username ) )
            .filter( json => json.message !== 'Not Found' )
            .subscribe( json => this.render( json ) );

    }


    private fetch ( username ) {

        const api = this.api;
        const promise = fetch( `${api}/${username}` );

        return Observable
            .fromPromise( promise )
            .switchMap( response =>
                Observable.fromPromise( response.json() )
            );
        
    }


    private render ( json ) {

        const template = document.createElement( 'template' );

        template.innerHTML = `
            <div class="github-user">
                <h3 class="github-user__name">
                    ${json.name}
                    <br>
                    <small class="github-user__login">
                        (<i>${json.login}</i>)
                    </small>
                </h3>
                <div class="github-user__avatar">
                    <img class="avatar" src="${json.avatar_url}">
                </div>
            </div>
        `;

        this.$container
            .prepend( document.importNode( template.content, true ) );

    }

}
