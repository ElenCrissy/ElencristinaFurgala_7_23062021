import {recipes} from '../recipes.js';
import * as Utils from './utils.js';
import CardSection from './cardSection.js';
// import FilterableDropdown from './filterableDropdown.js';
import Dropdown from './dropdown.js'
// import OptionList from './OptionList.js';
import SearchBar from './searchBar.js';
import TagList from './tagList.js';

const tagContainer = document.querySelector('.tag-container');
const dropdownContainer = document.querySelector('.dropdown-container');
const cardSection = document.querySelector('.cards-section');


// function getList(callback){
//     const list = [];
//     recipes.forEach(recipe => {
//         const keywords = callback(recipe);
//     })
//     const newlist = [... new Set (list)];
//     return newlist
// }

// function getIngredients(recipe) {
//     const ingredientList = [];
//     const ingredients = recipe.ingredients;
//     ingredients.forEach(element => {
//         const ingredient = element.ingredient;
//         ingredientList.push(ingredient);
//         return ingredientList
//     })
//     return ingredientList
// }

// function getAppliances(recipe) {
//     const applianceList = [];
//     const appliances = recipe.appliance;
//     appliances.forEach(element => {
//         applianceList.push(element);
//         return applianceList
//     })
//     return applianceList;
// }

// function getUstensils(recipe) {
//     const ustensilList = [];
//     const ustensils = recipe.ustensils;
//     ustensils.forEach(ustensil => {
//         ustensilList.push(ustensil);
//         return ustensilList
//     })
//     return ustensilList
// }

window.onload = () => {
    const searchBar = new SearchBar;
    const tagList = new TagList(tagContainer);
    const lists = Utils.getLists();

    searchBar.initializeSearchBar();
    tagList.createTagListDOM();

    // const categories = [ingredients, appliances, ustensils];
    // categories.forEach(category => {
    //     const filterableDropdown = new FilterableDropdown(dropdownContainer, list);
    // })

    for (let list in lists) {
        const listName = list;
        const options = lists[list];
        // const filterableDropdown = new FilterableDropdown(dropdownContainer, listName, options);
        const dropdown = new Dropdown(dropdownContainer, listName, options);
        dropdown.createDropdownDOM();
        Utils.filterDropdown(dropdown, options);
        Utils.sendOptionToTagList(dropdown, tagList);
    }
}