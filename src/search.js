import {recipes} from '../recipes.js';

export default class Search{
    constructor() {
        this.callbacks = [];
    }

    getSearchTerms(userInput) {
        console.log('userInput', userInput)
        if(userInput.length > 2) {
            this.searchRecipes(userInput, null);
        }
    }

    getKeywordList(keywordList) {
        console.log('keywordList', keywordList)
        this.searchRecipes(null, keywordList);
    }

    searchRecipes(userInput, keywordList) {
        if (userInput !== null && userInput.length > 2) {
            recipes.filter(recipe => {
                if (recipe.name.includes(userInput) || recipe.ingredients.includes(userInput) || recipe.description.includes(userInput)) {
                    console.log(recipe);
                }
            });
        } else if (keywordList !== null) {
            console.log('cookie, t\'as réussi !')
            keywordList.forEach(keyword => {
                recipes.forEach(recipe => {
                    if(recipe.category.includes(keyword.toLowerCase())) {
                        return recipe
                    } else{
                        return recipes;
                    }
                });
            });
        } else {
            return recipes;
        }
        
    }

    getResults() {

    }
}