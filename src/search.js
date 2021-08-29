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
        this.results = this.searchRecipes(this.userInput, this.keywordList, recipes);
        this.triggerCallbacks();
    }

    setKeywordList(keywordList) {
        this.keywordList = keywordList;
        this.results = this.searchRecipes(this.userInput, this.keywordList, recipes);
        this.triggerCallbacks();
    }

    includes(element, string) {
        let isIncluded = false; 
        for (let j = 0; j < element.length; j++) {

            for(let k = 0; k < string.length; k++) {

                const nextLetterElement = element[j+k];
                const expectedLetter = string[k];

                if (nextLetterElement !== expectedLetter) {
                    isIncluded = false;
                    break;
                } else {
                    isIncluded = true;
                }
            }

            if (isIncluded) {
                break;
            }

        }
        return isIncluded;
    }

    searchRecipes(userInput, keywordList, recipes) {
        const noResultMessage = document.querySelector('.no-result-message');
        let results = [];

        if (userInput !== undefined && userInput.length > 2) {

            // pour chaque recette, je crée un tableau avec le nom, les ingrédients et la description
            for(let i = 0; i < recipes.length; i++) {
                const recipeName = recipes[i].name;
                const recipeIngredients = recipes[i].ingredients;
                const recipeIngredientsArr = [];
                const recipeDescription = recipes[i].description; 

                // j'ajoute chaque ingrédient de la recette au tableau d'ingrédients
                for (let j = 0; j < recipeIngredients.length; j++) {
                    const ingredient = recipeIngredients[j].ingredient;
                    recipeIngredientsArr.push(ingredient);
                }

                // je crée une chaîne de caractère contenant les détails de la recette
                const recipeDetails = `${recipeName}, ${recipeIngredientsArr.toString()}, ${recipeDescription}`;

                // si les détails de la recette contiennent les termes recherchés alors la recette est ajoutée au tableau des résultats
                if (this.includes(recipeDetails, userInput)) {
                    results.push(recipes[i]);
                }
            };
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
}