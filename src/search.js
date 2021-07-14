import {recipes} from '../recipes.js';

export default function getRelevantRecipesFromValue(inputValue) {
    if(inputValue.length > 2) {
        recipes.filter(recipe => {
            if (recipe.name.includes(inputValue) || recipe.ingredients.includes(inputValue) || recipe.description.includes(inputValue)) {
                console.log(recipe);
            }
        });
    } else{
        return recipes;
    }
}

export function getRelevantRecipesFromTag(tag) {

    recipes.forEach(recipe => {
        if(recipe.category.includes(tag.innerHTML.toLowerCase())) {
            return recipe
        } else{
            return recipes;
        }
    });
}