import {recipes} from '../recipes.js';
import OptionList from './OptionList.js';
import TagList from './tagList.js';


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
    const listsObj = {
        ingredients : getIngredientsList(),
        appareils : getAppliancesList(),
        ustensiles : getUstensilsList(),
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

export function sendOptionToTaglist(dropdown, tagList) {
    dropdown.onClickOption(option => {
        tagList.createTag(option, dropdown);
        return tagList;
    });
}