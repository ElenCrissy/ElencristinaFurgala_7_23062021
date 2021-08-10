import {recipes} from '../recipes.js';

export default class Search{
    constructor() {
        this.callbacks = [];
        this.results = [];
    }

    getSearchTerms(userInput) {
        if(userInput.length > 2) {
            this.searchRecipes(userInput, null);
        } else {
            this.searchRecipes(null, null);
        }
    }

    getKeywordList(keywordList) {
        console.log(keywordList)
        this.searchRecipes(null, keywordList);
    }

    searchRecipes(userInput, keywordList) {
        if (userInput !== null && userInput.length > 2) {
            recipes.filter(recipe => {
                if (recipe.name.includes(userInput) || recipe.ingredients.includes(userInput) || recipe.description.includes(userInput)) {
                    console.log(recipe);
                    this.results.push(recipe);
                }
            });
        } else if (keywordList !== null) {
            keywordList.forEach(keyword => {
                const keywordName = keyword.innerText;
                const category = keyword.dataset['category'];
                // const keywordName = keyword.keyword;
                // const category = keyword.category;
                
                recipes.forEach(recipe => {
                    if (category === 'ingredients') {
                        const recipeIngredients = recipe.ingredients;
                        recipeIngredients.forEach(ingredient => {
                            const ingredientName = ingredient.ingredient;
                            if (ingredientName.toLowerCase().includes(keywordName.toLowerCase())) {
                                this.results.push(recipe);
                                return this.results
                            };
                        })
                    } else if (category === 'appliance') {
                        if (recipe.appliance.toLowerCase().includes(keywordName.toLowerCase())) {
                            this.results.push(recipe);
                            return this.results
                        };
                    } else if (category === 'ustensils') {
                        const recipeUstensils = recipe.ustensils;
                        recipeUstensils.forEach(ustensil => {
                            if(ustensil.toLowerCase().includes(keywordName.toLowerCase())) {
                                this.results.push(recipe);
                                return this.results
                            }
                        })
                    }                
                });

            });
        } else {
            recipes.forEach(recipe => this.results.push(recipe));
            // return recipes;
        }

        const newResults = [... new Set(this.results)];
        // this.callbacks.forEach(cb => cb(newResults));
        console.log(newResults);
    }

    getResults() {
        return this.results
    }

    onNewResults(cb) {
        this.callbacks.push(cb);
        const newResults = this.getResults();
        newResults.forEach(result => cb(result));
    }
}