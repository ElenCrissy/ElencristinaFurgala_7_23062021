import {recipes} from '../recipes.js';
import Card from './card.js';
import Dropdown from './dropdown.js'

const dropdowns = document.querySelector('.dropdown-container');
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

    categories.forEach(category => {
        const dropdown = new Dropdown(dropdowns, category);
        dropdown.createDropdown(category[0]);
    });

    const card = new Card;
    recipes.forEach(recipe => card.createCard(recipe, cardSection));
}