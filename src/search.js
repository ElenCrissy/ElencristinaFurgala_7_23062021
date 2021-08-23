import {recipes} from '../recipes.js';

export default class Search{
    constructor() {
        this.callbacks = [];
        this.results = [];
        this.userInput;
        this.keywordList = [];
    }

    setSearchTerms(userInput) {
        console.log('stop')
        this.userInput = userInput;
        const searchResults = Search.searchRecipes(this.userInput, this.keywordList, recipes);
        this.results = this.countTermsInRecipes(this.userInput, searchResults);
        console.log(this.results);
        this.triggerCallbacks();
    }

    setKeywordList(keywordList) {
        this.keywordList = keywordList;
        this.results = Search.searchRecipes(this.userInput, this.keywordList, recipes);
        this.triggerCallbacks();
    }

    static searchRecipes(userInput, keywordList, recipes) {
        const noResultMessage = document.querySelector('.no-result-message');
        let results = [];

        if (userInput !== undefined && userInput.length > 2) {
            // recipes.filter(recipe => {
            //     if (recipe.name.includes(userInput) || recipe.ingredients.includes(userInput) || recipe.description.includes(userInput)) {
            //         results.push(recipe);
            //     }
            // });
            recipes.forEach(recipe => {
                if (recipe.name.includes(userInput) || recipe.ingredients.includes(userInput) || recipe.description.includes(userInput)) {
                    results.push(recipe);
                }
            });
        }
        
        if (keywordList !== null) {
            keywordList.forEach(keyword => {
                const keywordName = keyword.keyword;
                const category = keyword.category;
                
                recipes.forEach(recipe => {
                    if (category === 'ingredients') {
                        const recipeIngredients = recipe.ingredients;
                        recipeIngredients.forEach(ingredient => {
                            const ingredientName = ingredient.ingredient;
                            if (ingredientName.toLowerCase().includes(keywordName.toLowerCase())) {
                                results.push(recipe);
                            };
                        })
                    } else if (category === 'appareils') {
                        if (recipe.appliance.toLowerCase().includes(keywordName.toLowerCase())) {
                            results.push(recipe);
                        };
                    } else if (category === 'ustensiles') {
                        const recipeUstensils = recipe.ustensils;
                        recipeUstensils.forEach(ustensil => {
                            if(ustensil.toLowerCase().includes(keywordName.toLowerCase())) {
                                results.push(recipe);
                            }
                        })
                    }                
                });

            });
        }

        results = [... new Set(results)];

        if (results.length == 0) {
            recipes.forEach(recipe => results.push(recipe));
            noResultMessage.style.display = 'block';
        } else {
            noResultMessage.style.display = 'none';
        }

        return results;
    }

    getResults() {
        return this.results
    }

    // à chaque nouveau résultat, callback est ajoutée au tableau des callbacks
    onNewResults(cb) {
        this.callbacks.push(cb);
    }

    // déclenchement des callbacks
    triggerCallbacks() {
        this.callbacks.forEach(cb => cb(this.results));
    }

    countTermsInRecipes(term, recipes) {
        let resultsToBeSorted = [];

        recipes.forEach(recipe => {
            const name = recipe.name;
            let ingredients = [];
            const recipeIngredients = recipe.ingredients;
            recipeIngredients.forEach(ingredient => ingredients.push(ingredient.ingredient));
            const description = recipe.description;
            ingredients = ingredients.toString();
            const recipeElements = [name, ingredients, description];

            let counter = 0;
            recipeElements.forEach(element => {
                if(element.includes(term)){
                    counter++
                }
            });

            const recipeCounter = {
                id: recipe.name,
                counter: counter
            };
            resultsToBeSorted.push(recipeCounter);
        });

        this.sortResults(resultsToBeSorted);
        return resultsToBeSorted;
    }

    sortResults(recipeCounters){
        recipeCounters.sort(function (a, b) {
            if (a.counter < b.counter)
                return 1;
            if (a.counter > b.counter )
                return -1;
            return 0;
        })
        return recipeCounters;
    }
}