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

generateCards() {
    
}