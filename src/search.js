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
        keywordList.forEach(keyword => this.searchRecipes(null,keyword));
    }

    searchRecipes(userInput, keywordList) {
        if (userInput !== null && userInput.length > 2) {
            recipes.filter(recipe => {
                if (recipe.name.includes(userInput) || recipe.ingredients.includes(userInput) || recipe.description.includes(userInput)) {
                    console.log(recipe);
                }
            });
        } else{
            return recipes;
        }

        if (keywordList !== null) {
            keywordList.forEach(keyword => {
                recipes.forEach(recipe => {
                    if(recipe.category.includes(tag.innerHTML.toLowerCase())) {
                        return recipe
                    } else{
                        return recipes;
                    }
                });
            });
        }
        
    }

    getResults() {

    }
}