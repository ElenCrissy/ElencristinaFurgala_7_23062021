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
        this.results = Search.searchRecipes(this.userInput, this.keywordList, recipes);
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
            console.log(userInput)

            // recipes.filter(recipe => {
            //     if (recipe.name.includes(userInput) || recipe.ingredients.includes(userInput) || recipe.description.includes(userInput)) {
            //         results.push(recipe);
            //     }
            // });

            for(let i = 0; i < recipes.length; i++) {
                const recipeIngredients = recipes[i].ingredients;

                // sans utiliser indexOf
                // const fruits = ['fraise', 'pomme', 'melon', 'orange', 'kiwi', 'pastèque', 'noix de coco', 'poire', 'ananas', 'pamplemousse', 'citron', 'framboise', 'papaye', 'banane', 'litchi', 'prune', 'abricot', 'mangue'];

                // const string = 'ran';


                // for (let i = 0; i < fruits.length; i++) {
                // const fruit = fruits[i];
                    
                //     for (let j = 0; j < fruit.length; j++) {
                //     const letter = fruit[j];
                //     const nextLetterFruit = fruit[j+1];
                    
                //     for (let k = 0; k < string.length; k++){
                        
                //         if (letter === string[k]){
                //         if()

                //         }
                //     }
                    
                    
                //     }
                // }

                if(recipes[i].name.indexOf(userInput) !== -1 || recipes[i].description.indexOf(userInput) !== -1) {
                  results.push(recipes[i]);
                }

                for (let i = 0; i < recipeIngredients.length; i++) {
                    const ingredient = recipeIngredients[i].ingredient;
                    if (ingredient.indexOf(userInput) !== -1) {
                        results.push(recipes[i]);
                    }
                }
            };

            // recipes.forEach(recipe => {
            //     if (recipe.name.includes(userInput) || recipe.ingredients.includes(userInput) || recipe.description.includes(userInput)) {
            //         results.push(recipe);
            //     }
            // });
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