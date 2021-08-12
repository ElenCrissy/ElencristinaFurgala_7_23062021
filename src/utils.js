import {recipes} from '../recipes.js';
import OptionList from './OptionList.js';
import TagList from './tagList.js';
import CardSection from './cardSection.js';
import Search from './search.js';

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

export function sendOptionToTagList(dropdown, tagList, search) {
    dropdown.onClickOption(option => {
        tagList.createTag(option, dropdown);

        // const tag = tagList.createTag(option, dropdown);
        // const tagCross = tag.querySelector('.cross');
        // tagCross.addEventListener('click', () => {
        //     tag.remove();
        //     const filteredUpdatedList = tagList.updatedList.filter(element => element.keyword !== option);
        //     tagList.updatedList = filteredUpdatedList;
        //     console.log('updatedlist', tagList.updatedList)
        //     return tagList.updatedList
        // });


        
        // problème quand tag retiré par croix, modif pas prise en compte 
        // tagList.onTagListChange(keywordList => {
        //     console.log('keywordList', keywordList)
        //     search.getKeywordList(keywordList); 
        // });
        return tagList;
    });
}


export function sendUpdatedListToCardSection(cardSection, tagList, search) {
    tagList.onTagListChange(keywordList => {
        console.log('keywordList', keywordList)
        search.getKeywordList(keywordList); 
    });
    console.log(tagList.onTagListChange(this.updatedList));
}
