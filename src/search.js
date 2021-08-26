import {recipes} from '../recipes.js';

export default class Search{
    constructor() {
        this.callbacks = [];
        this.results = [];
        this.userInput;
        this.keywordList = [];
    }

    setSearchTerms(userInput) {
        this.userInput = userInput;
        const searchResults = Search.searchRecipes(this.userInput, this.keywordList, recipes);
        const sortedRecipeCounters = this.getSortedCounters(this.userInput, searchResults);
        this.results = this.getRevelantRecipesFromSortedCounters(sortedRecipeCounters);
        this.triggerCallbacks();
    }

    setKeywordList(keywordList) {
        this.keywordList = keywordList;
        const searchResults = Search.searchRecipes(this.userInput, this.keywordList, recipes);
        const sortedRecipeCounters = this.getSortedCounters(this.keywordList, searchResults);
        this.results = this.getRevelantRecipesFromSortedCounters(sortedRecipeCounters);
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
                if (recipe.name.toLowerCase().includes(userInput.toLowerCase()) || recipe.ingredients.includes(userInput.toLowerCase()) || recipe.description.toLowerCase().includes(userInput.toLowerCase())) {
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

    getSortedCounters(term, recipesFromSearch) {
        let resultsToBeSorted = [];

        recipesFromSearch.forEach(recipe => {

            let counter = 0;
            
            if (term === this.userInput) {
                const name = recipe.name;
                let ingredientsArr = [];
                const recipeIngredients = recipe.ingredients;
                recipeIngredients.forEach(ingredient => ingredientsArr.push(ingredient.ingredient));
                const description = recipe.description;
                ingredientsArr = ingredientsArr.toString();
                let recipeElements = [];
                recipeElements.push(name, ingredientsArr, description);
                const recipeElementsStringified = JSON.stringify(recipeElements);
                counter = this.countOccurencies(recipeElementsStringified, term);
            }

            if (term === this.keywordList) {
                const fullRecipe = JSON.stringify(recipe);
                term.forEach(termElement => {
                    counter = this.countOccurencies(fullRecipe, termElement.keyword);
                });
            }

            const recipeCounter = {
                id: recipe.id,
                counter: counter
            };

            resultsToBeSorted.push(recipeCounter);
        });

        const sortedRecipeCounters = this.sortCounters(resultsToBeSorted);
        return sortedRecipeCounters;
    }

    // compte le nombre de fois que le terme apparaît dans une chaîne de caractère
    countOccurencies(string, word) {
        return string.split(word).length -1;
    }

    // tri en fonction du compteur
    sortCounters(recipeCounters){
        recipeCounters.sort(function (a, b) {
            if (a.counter < b.counter)
                return 1;
            if (a.counter > b.counter )
                return -1;
            return 0;
        })
        return recipeCounters;
    }

    // récupère les recettes correspondant aux id des résultats triés
    getRevelantRecipesFromSortedCounters(counters){
        const relevantRecipes = [];
        counters.forEach(counter => {
            const relevantRecipe = recipes.find(recipe => recipe.id === counter.id);
            relevantRecipes.push(relevantRecipe);
        })
        return relevantRecipes;
    }
}