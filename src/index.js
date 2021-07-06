import {recipes} from '../recipes.js';
import Card from './card.js';
import Dropdown from './dropdown.js'

const dropdowns = document.querySelector('.dropdown-container');
const cardSection = document.querySelector('.cards-section');

// const generateRecipeCard = () => {
//     const recipeCard = recipes.map(createCard);
//     console.log(recipeCard);
//     cardSection.appendChild(recipeCard);

// }

window.onload = () => {
    const dropdownNames = ['Ingrédients', 'Appareils', 'Ustensiles'];
    dropdownNames.forEach(dropdownName => {
        const dropdown = new Dropdown;
        dropdown.createDropdown(dropdownName, dropdowns);
    });

    const card = new Card;
    recipes.forEach(recipe => {
        const recipeCard = card.createCard(recipe, cardSection);
        // console.log(recipeCard);
    });
    
}