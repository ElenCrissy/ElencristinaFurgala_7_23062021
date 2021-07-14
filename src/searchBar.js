import getRelevantRecipes from './search.js';

export default class SearchBar {
    initializeSearchBar() {
        const searchBar = document.querySelector('.search-bar');
        const searchBarInput = searchBar.querySelector('input');
        const searchBarForm = searchBar.querySelector('form');

        //prevent submission
        searchBarForm.addEventListener('submit', (e) => {
            e.preventDefault();
        })
        
        //user enters value input
        searchBarInput.addEventListener('keyup', () => {
            getRelevantRecipes(searchbarInput.value);
        });
    }
}