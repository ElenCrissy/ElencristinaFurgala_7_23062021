import { recipes } from "../recipes.js";

export default class Card{
    createCard(recipe, container) {
        const card = document.createElement('div');
        const cardFigure = document.createElement('figure');
        const cardImg = document.createElement('img');
        const cardCaption = document.createElement('figcaption');

        const recipeTitle = document.createElement('div');
        const recipeTime = document.createElement('div');
        const recipeTimeClock = document.createElement('i');
        const recipeIngredients = document.createElement('div');
        const recipeDescription = document.createElement('div');

        card.classList.add('card');
        cardImg.classList.add('card-img');
        cardCaption.classList.add('card-caption');

        recipeTitle.classList.add('recipe-details', 'recipe-title');
        recipeTime.classList.add('recipe-details', 'recipe-time');
        recipeTimeClock.classList.add('far', 'fa-clock');
        recipeIngredients.classList.add('recipe-details', 'recipe-ingredients');
        recipeDescription.classList.add('recipe-details', 'recipe-description');

        const ingredients = recipe.ingredients;
        let ingredientName;
        let quantity;
        let unit;
        ingredients.forEach(ingredient => {
            ingredientName = ingredient.ingredient;
            quantity = ingredient.quantity;
            unit = ingredient.unit;
            if (unit === undefined ) {unit = ''};
            let content;
            if (quantity === undefined) {
                quantity = '';
                content = document.createTextNode(`${ingredientName}`);
            } else {
                content = document.createTextNode(`${ingredientName} : ${quantity} ${unit}`);
            }
            recipeIngredients.appendChild(content);
        });

        recipeTitle.appendChild(document.createTextNode(recipe.name));
        recipeTime.appendChild(document.createTextNode(`${recipe.time} min`));
        recipeDescription.appendChild(document.createTextNode(recipe.description));

        // recipeTime.insertBefore(recipeTimeClock, recipeTime.children[1]);

        recipeTime.appendChild(recipeTimeClock);
        cardCaption.append(recipeTitle, recipeTime, recipeIngredients, recipeDescription);
        cardFigure.append(cardImg, cardCaption);
        card.append(cardFigure);
        container.appendChild(card);

        return card;
    }
}