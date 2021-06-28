import recipes from './recipes.js';


createCategory(categoryName) {
    const category = document.createElement('div');
    const categoryForm = document.createElement('form');
    const categoryInput = document.createElement('input');

    category.classList.add('category');
    categoryForm.setAttribute('method', 'get');
    categoryForm.setAttribute('action', 'traitement.php');
    categoryInput.setAttribute('type', 'text');
    categoryInput.setAttribute('name', 'search');
    categoryInput.setAttribute('placeholder', `${category}`);
    categoryInput.setAttribute('id', `search-by-${category}`);

    if(category === Ingrédients) {
        category.style.backgroundColor = $colour-blue;
    } else if (category === Appareils) {
        category.style.backgroundColor = $colour-green;
    } else {
        category.style.backgroundColor = $colour-red;
    }

    categoryForm.appendChild(categoryInput);
    category.appendChild(categoryForm);
}

generateCategories(container) {
    let categories = ['Ingrédients', 'Appareils', 'Ustensiles'];
    categories.forEach(category => container.appendChild(createCategory(category)));
}


createRecipeCard(container) {
    const card = document.createElement('div');
    const greyBlock = document.createElement('div');
    const recipe = document.createElement('div');

    card.classList.add('card');
    greyBlock.classList.add('greyBlock');
    recipe.classList.add('recipe');

    card.append(greyBlock, recipe);
    container.appendChild(card);
}