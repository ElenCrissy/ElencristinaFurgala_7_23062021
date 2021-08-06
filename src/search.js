import {recipes} from '../recipes.js';

export class Search{
    constructor() {
        this.callbacks = [];
    }

    getSearchBarInput(userInput) {
        if(inputValue.length > 2) {
            this.searchRecipes(userInput);
        }
    }

    getKeywordList(keywordList) {

    }

    searchRecipes(inputValue, keywordList) {
        if(inputValue.length > 2) {
            recipes.filter(recipe => {
                if (recipe.name.includes(inputValue) || recipe.ingredients.includes(inputValue) || recipe.description.includes(inputValue)) {
                    console.log(recipe);
                }
            });
        } else{
            return recipes;
        }

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

    getResults() {

    }
}

// export default function getRelevantRecipesFromValue(inputValue) {
//     if(inputValue.length > 2) {
//         recipes.filter(recipe => {
//             if (recipe.name.includes(inputValue) || recipe.ingredients.includes(inputValue) || recipe.description.includes(inputValue)) {
//                 console.log(recipe);
//             }
//         });
//     } else{
//         return recipes;
//     }
// }

// export function getRelevantRecipesFromTag(tag) {

//     recipes.forEach(recipe => {
//         if(recipe.category.includes(tag.innerHTML.toLowerCase())) {
//             return recipe
//         } else{
//             return recipes;
//         }
//     });
// }