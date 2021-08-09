import {recipes} from '../recipes.js';

export default class Search{
    constructor() {
        this.callbacks = [];
        this.results = [];
    }

    getSearchTerms(userInput) {
        console.log('userInput', userInput)
        if(userInput.length > 2) {
            this.searchRecipes(userInput, null);
        }
    }

    getKeywordList(keywordList) {
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
            console.log('keywordList', keywordList)

            keywordList.forEach(keyword => {

                const keywordName = keyword.keyword;
                const category = keyword.category;
                
                recipes.forEach(recipe => {
                    if (category === 'ingredients') {
                        const recipeIngredients = recipe.ingredients;
                        recipeIngredients.forEach(ingredient => {
                            const ingredientName = ingredient.ingredient;
                            if (ingredientName.toLowerCase().includes(keywordName.toLowerCase())) {
                                // console.log('recipe with ingredient', recipe);
                                this.results.push(recipe);
                                // return recipe
                            };
                        })
                    } else if (category === 'appareils') {
                        if (recipe.appliance.toLowerCase().includes(keywordName.toLowerCase())) {
                            // console.log('recipe with appliance', recipe)
                            this.results.push(recipe);
                            // return recipe
                        };
                    } else if (category === 'ustensiles') {
                        const recipeUstensils = recipe.ustensils;
                        recipeUstensils.forEach(ustensil => {
                            if(ustensil.toLowerCase().includes(keywordName.toLowerCase())) {
                                // console.log('recipe with ustensil', recipe)
                                this.results.push(recipe);
                                // return recipe
                            }
                        })
                    }
                });

            });
        } else {
            recipes.forEach(recipe => this.results.push(recipe));
            // return recipes;
        }
    }

    getResults() {
        return this.results
    }

    onUpdatedResults(cb) {
        this.cb.push(cb);
    }
}