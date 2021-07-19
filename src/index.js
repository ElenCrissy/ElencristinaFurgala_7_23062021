import {recipes} from '../recipes.js';
import Card from './card.js';
import Context from './context.js';
import Dropdown from './dropdown.js'
import OrderOptionList from './orderOptionList.js';
import SearchBar from './searchBar.js';
import TagList from './taglist.js';

const tagContainer = document.querySelector('.tag-container');
const dropdownContainer = document.querySelector('.dropdown-container');
const cardSection = document.querySelector('.cards-section');
let ingredientList = [];
let applianceList = [];
let ustensilList = [];

function getIngredients() {
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

function getAppliances() {
    recipes.forEach(recipe =>{
        const recipeAppliance = recipe.appliance;
        applianceList.push(recipeAppliance);
    });
    applianceList = [... new Set(applianceList)];
    return applianceList;
}

function getUstensils() {
    recipes.forEach(recipe =>{
        const recipeUstensils = recipe.ustensils;
        recipeUstensils.forEach(ustensil => ustensilList.push(ustensil));
    });
    ustensilList = [... new Set(ustensilList)];
    return ustensilList;
}


window.onload = () => {
    const ingredientKeywords = getIngredients();
    const applianceKeywords = getAppliances();
    const ustensilKeywords = getUstensils();
    let categoriesArray = new Map();
    categoriesArray.set('Ingrédients', ingredientKeywords);
    categoriesArray.set('Appliance', applianceKeywords);
    categoriesArray.set('Ustensils', ustensilKeywords);
    const categories = Array.from(categoriesArray);

    const searchBar = new SearchBar;
    searchBar.initializeSearchBar();

    const tagList = new TagList(tagContainer);
    tagList.createTagListDom();

    categories.forEach(category => {
        // const dropdown = new Dropdown(dropdownContainer, category);
        // dropdown.createDropdown(category[0]);
        // const orderOptionList = new OrderOptionList(category[1]);
        const context = new Context(dropdownContainer, category);
        console.log('context', context)
    });

    const card = new Card;
    recipes.forEach(recipe => card.createCard(recipe, cardSection));
}