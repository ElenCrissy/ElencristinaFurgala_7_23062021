// import {recipes} from '../recipes.js';

// const cardsSection = document.querySelector('.cards-section');
// console.log(recipesArray);

// createCategory(categoryName) {
//     const category = document.createElement('div');
//     const categoryForm = document.createElement('form');
//     const categoryInput = document.createElement('input');

//     category.classList.add('category');
//     categoryForm.setAttribute('method', 'get');
//     categoryForm.setAttribute('action', 'traitement.php');
//     categoryInput.setAttribute('type', 'text');
//     categoryInput.setAttribute('name', 'search');
//     categoryInput.setAttribute('placeholder', `${category}`);
//     categoryInput.setAttribute('id', `search-by-${category}`);

//     if(category.toString() === 'Ingrédients') {
//         category.style.backgroundColor = $colour-blue;
//     } else if (category.toString() === 'Appareils') {
//         category.style.backgroundColor = $colour-green;
//     } else {
//         category.style.backgroundColor = $colour-red;
//     }

//     categoryForm.appendChild(categoryInput);
//     category.appendChild(categoryForm);
// };

// generateCategories(container) {
//     let categories = ['Ingrédients', 'Appareils', 'Ustensiles'];
//     categories.forEach(category => container.appendChild(createCategory(category)));
// };

// createRecipeCard(){
//     const card = document.createElement('div');
//     const cardFigure = document.createElement('figure');
//     const cardImg = document.createElement('img');
//     const cardCaption = document.createElement('figcaption');

//     card.classList.add('card');
//     cardImg.classList.add('card-img');
//     cardCaption.classList.add('card-caption');

//     cardFigure.append(cardImg, cardCaption);
//     card.append(cardFigure);
//     cardsSection.appendChild(card);
// };