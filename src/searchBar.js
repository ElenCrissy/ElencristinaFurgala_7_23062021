import { recipes } from '../recipes.js';

export default class SearchBar {
    initializeSearchBar() {
        const searchBar = document.querySelector('.search-bar');
        const searchbarInput = searchBar.querySelector('input');

        //user enters value input
        searchbarInput.addEventListener('keyup', () => {
            const inputValue = searchbarInput.value;
            if(inputValue.length > 2) {
                recipes.filter(recipe => {
                    if (recipe.name.includes(inputValue) || recipe.ingredients.includes(inputValue) || recipe.description.includes(inputValue)) {
                        console.log(recipe);
                    }
                });
            };
        });
    }
}