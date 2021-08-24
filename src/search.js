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
        const sortedId = this.countTermsInRecipes(this.userInput, searchResults);
        this.results = this.getRevelantRecipesFromSortedId(sortedId);
        this.triggerCallbacks();
    }

    setKeywordList(keywordList) {
        this.keywordList = keywordList;
        // this.results = Search.searchRecipes(this.userInput, this.keywordList, recipes);
        const searchResults = Search.searchRecipes(this.userInput, this.keywordList, recipes);
        const sortedId = this.countTermsInRecipes(this.keywordList, searchResults);
        this.results = this.getRevelantRecipesFromSortedId(sortedId);
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

    countTermsInRecipes(term, recipesFromSearch) {
        let resultsToBeSorted = [];

        recipesFromSearch.forEach(recipe => {

            let recipeElementsSearchTerm = [];
            let recipeElementsKeywordList = [];
            let counter = 0;
            
            if (term === this.userInput) {
                const name = recipe.name;
                let ingredientsArr = [];
                const recipeIngredients = recipe.ingredients;
                recipeIngredients.forEach(ingredient => ingredientsArr.push(ingredient.ingredient));
                const description = recipe.description;
                ingredientsArr = ingredientsArr.toString();
                recipeElementsSearchTerm.push(name, ingredientsArr, description);
                recipeElementsSearchTerm.forEach(element => {
                    if(element.includes(term)){
                        counter++;
                    };
                })
            }

            if (term === this.keywordList) {
                const fullRecipe = JSON.stringify(recipe);
                console.log(fullRecipe)
                recipeElementsKeywordList.push(fullRecipe);
                recipeElementsKeywordList.forEach(element => {
                    if (element.includes(term)) {
                        counter++;
                    }
                });
            }

            // if (searchTerm !== undefined && searchTerm.length > 2) {
            //     const name = recipe.name;
            //     let ingredientsArr = [];
            //     const recipeIngredients = recipe.ingredients;
            //     recipeIngredients.forEach(ingredient => ingredientsArr.push(ingredient.ingredient));
            //     const description = recipe.description;
            //     ingredientsArr = ingredientsArr.toString();
            //     recipeElements.push(name, ingredientsArr, description);
            // }

            // if (keywordList !== undefined && keywordList.length > 0) {
            //     const fullRecipe = JSON.stringify(recipe);
            //     recipeElements.push(fullRecipe);
            // }

            // let counter = 0;
            // recipeElements.forEach(element => {
            //     if(element.includes(searchTerm)){
            //         counter++;
            //     };

            //     keywordList.forEach(keyword => {
            //         if (element.includes(keyword)) {
            //             counter++;
            //         }
            //     });
            // });

            const recipeCounter = {
                id: recipe.id,
                counter: counter
            };

            console.log(recipeCounter)

            resultsToBeSorted.push(recipeCounter);
        });

        this.sortResults(resultsToBeSorted);
        return resultsToBeSorted;
    }

    sortResults(recipeCounters){
        console.log(recipeCounters, 'yo')
        recipeCounters.sort(function (a, b) {
            if (a.counter < b.counter)
                return 1;
            if (a.counter > b.counter )
                return -1;
            return 0;
        })
        return recipeCounters;
    }

    getRevelantRecipesFromSortedId(sortedId){
        const relevantRecipes = [];
        sortedId.forEach(element => {
            recipes.forEach(recipe => {
                if (recipe.id === element.id) {
                    relevantRecipes.push(recipe);
                }
            })
        })
        return relevantRecipes;
    }
}