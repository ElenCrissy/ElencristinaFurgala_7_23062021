import {recipes} from '../recipes.js';
console.log(recipes)

const cardsSection = document.querySelector('.cards-section');

const createCategory = (categoryName) => {
    const category = document.createElement('div');
    const categoryForm = document.createElement('form');
    const categoryInput = document.createElement('input');

    category.classList.add('category');
    categoryForm.setAttribute('method', 'get');
    categoryForm.setAttribute('action', 'traitement.php');
    categoryInput.setAttribute('type', 'text');
    categoryInput.setAttribute('name', 'search');
    categoryInput.setAttribute('placeholder', `${categoryName}`);
    categoryInput.setAttribute('id', 'search-by');

    if(categoryName.toString() === 'Ingrédients') {
        category.classList.add('ingredients');
        categoryInput.classList.add('blue');
    } else if (categoryName.toString() === 'Appareils') {
        category.classList.add('appareils');
        categoryInput.classList.add('green');
    } else if (categoryName.toString() === 'Ustensiles') {
        category.classList.add('ustensiles');
        categoryInput.classList.add('red');
    }

    categoryForm.appendChild(categoryInput);
    category.appendChild(categoryForm);
    console.log(category)

    return category;
}

const generateCategories = (container) => {
    let categoriesNames = ['Ingrédients', 'Appareils', 'Ustensiles'];
    categoriesNames.forEach(name => {
        const category = createCategory(name);
        container.appendChild(category);
    });
};

// const getKeywords = () => {

// }

// const createCard = () => {
//     const card = document.createElement('div');
//     const cardFigure = document.createElement('figure');
//     const cardImg = document.createElement('img');
//     const cardCaption = document.createElement('figcaption');

//     card.classList.add('card');
//     cardImg.classList.add('card-img');
//     cardCaption.classList.add('card-caption');

//     cardFigure.append(cardImg, cardCaption);
//     card.append(cardFigure);
    
// }

// const generateRecipeCard = () => {
//     const recipeCard = recipes.map(createCard);
//     console.log(recipeCard);
//     cardsSection.appendChild(recipeCard);

// }

window.onload = () => {
    generateCategories(cardsSection);
}