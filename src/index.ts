import { GithubNameSearch } from './github-name';

const $search = document.getElementById( 'search' );
const $container = document.getElementById( 'user-container' );

const instance = new GithubNameSearch( $search, $container );
