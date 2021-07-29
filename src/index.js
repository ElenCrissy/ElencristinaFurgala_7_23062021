import {recipes} from '../recipes.js';
import Card from './card.js';
import FilterableDropdown from './filterableDropdown.js';
import Dropdown from './dropdown.js'
import OptionList from './OptionList.js';
import SearchBar from './searchBar.js';
import TagList from './taglist.js';

const tagContainer = document.querySelector('.tag-container');
const dropdownContainer = document.querySelector('.dropdown-container');
const cardSection = document.querySelector('.cards-section');

function getIngredientsList() {
    let ingredientList = [];
    recipes.forEach(recipe =>{
        const recipeIngredients = recipe.ingredients;
        recipeIngredients.forEach(ingredient => {
            const ingredientName = ingredient.ingredient;
            ingredientList.push(ingredientName);
        });
    });
    ingredientList = [... new Set(ingredientList)];
    return ingredientList;
}

function getAppliancesList() {
    let applianceList = [];
    recipes.forEach(recipe =>{
        const recipeAppliance = recipe.appliance;
        applianceList.push(recipeAppliance);
    });
    applianceList = [... new Set(applianceList)];
    return applianceList;
}

function getUstensilsList() {
    let ustensilList = [];
    recipes.forEach(recipe =>{
        const recipeUstensils = recipe.ustensils;
        recipeUstensils.forEach(ustensil => ustensilList.push(ustensil));
    });
    ustensilList = [... new Set(ustensilList)];
    return ustensilList;
}

function getLists() {
    const listsObj = {
        ingredients : getIngredientsList(),
        appareils : getAppliancesList(),
        ustensiles : getUstensilsList(),
    }
    return listsObj;
}


window.onload = () => {
    const searchBar = new SearchBar;
    const tagList = new TagList(tagContainer);

    searchBar.initializeSearchBar();
    tagList.createTagListDOM();

    Object.entries(getLists()).forEach(list => {
        const filterableDropdown = new FilterableDropdown(dropdownContainer, list);
    });

    const card = new Card;
    recipes.forEach(recipe => card.createCard(recipe, cardSection));
}