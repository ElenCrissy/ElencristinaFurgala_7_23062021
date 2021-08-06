import {recipes} from '../recipes.js';
import OptionList from './OptionList.js';
import TagList from './tagList.js';
import CardSection from './cardSection.js';

export function getIngredientsList() {
    let ingredientList = [];
    recipes.forEach(recipe =>{
        const recipeIngredients = recipe.ingredients;
        recipeIngredients.forEach(ingredient => {
            ingredientList.push(ingredient.ingredient);
        });
    });
    ingredientList = [... new Set(ingredientList)];
    return ingredientList;
}

export function getAppliancesList() {
    let applianceList = [];
    recipes.forEach(recipe =>{
        applianceList.push(recipe.appliance);
    });
    applianceList = [... new Set(applianceList)];
    return applianceList;
}

export function getUstensilsList() {
    let ustensilList = [];
    recipes.forEach(recipe => {
        recipe.ustensils.forEach(ustensil => ustensilList.push(ustensil));
    });
    ustensilList = [... new Set(ustensilList)];
    return ustensilList;
}

export function getLists() {
    const ingredientList = getIngredientsList();
    const appliancesList = getAppliancesList();
    const ustensilsList = getUstensilsList();

    const listsObj = {
        ingredients : ingredientList,
        appareils : appliancesList,
        ustensiles : ustensilsList,
    }
    return listsObj;
}

export function filterDropdown(dropdown) {
    const initialOptions = dropdown.getOptions();
    const optionList = new OptionList(initialOptions);
    
    dropdown.onUserInputChange(inputValue => {
        if (inputValue.length > 2) {
            const updatedOptions = optionList.getOptions(inputValue);
            dropdown.setOptions(updatedOptions);
        } else if (inputValue < 2) {
            dropdown.setOptions(initialOptions);
        } 
        return dropdown;
    });
}

export function sendOptionToTagList(dropdown, tagList) {
    dropdown.onClickOption(option => {
        tagList.createTag(option, dropdown);
        const selectedTags = tagList.getSelectedTags();
        // filteringTags.forEach(filteringTag => getRelevantRecipes(option, dropdown.dropdownName));
        return tagList;
    });
}

export function getRelevantRecipes(option, category){
    // console.log(keyword, category)

    // if (keyword === undefined) {
    //     return recipes
    // } else {
    //     const filteredRecipesArray = []
    //     recipes.filter(recipe => {
    //         const ingredients = recipe.ingredients;
    //         const appliance = recipe.appliance;
    //         const ustensils = recipe.ustensils;

    //         for (let ingredient in ingredients) {
    //             if(ingredient.includes(tag)) {
    //                 filteredRecipesArray.push(recipe);
    //                 return filteredRecipesArray
    //             }
    //         }
    //         if (appliance.includes(tag)) {
    //             filteredRecipesArray.push(tag);
    //             return filteredRecipesArray
    //         }
    //         ustensils.forEach(ustensil => {
    //             if(ustensil.includes(tag)) {
    //                 filteredRecipesArray.push(tag);
    //                 return filteredRecipesArray
    //             }
    //         })
    //     });
    //     console.log(filteredRecipesArray)
    //     return filteredRecipesArray
    // }


}