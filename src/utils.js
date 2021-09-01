import OptionList from './OptionList.js';

export function getIngredientsList(data) {
    let ingredientList = [];
    data.forEach(element =>{
        const recipeIngredients = element.ingredients;
        recipeIngredients.forEach(ingredient => {
            ingredientList.push(ingredient.ingredient);
        });
    });
    ingredientList = [... new Set(ingredientList)];
    return ingredientList;
}

export function getAppliancesList(data) {
    let applianceList = [];
    data.forEach(element =>{
        applianceList.push(element.appliance);
    });
    applianceList = [... new Set(applianceList)];
    return applianceList;
}

export function getUstensilsList(data) {
    let ustensilList = [];
    data.forEach(element => {
        element.ustensils.forEach(ustensil => ustensilList.push(ustensil));
    });
    ustensilList = [... new Set(ustensilList)];
    return ustensilList;
}

export function getLists(data) {
    const ingredientList = getIngredientsList(data);
    const appliancesList = getAppliancesList(data);
    const ustensilsList = getUstensilsList(data);

    const listsObj = {
        ingredients : ingredientList,
        appareils : appliancesList,
        ustensiles : ustensilsList,
    }
    return listsObj;
}

export function filterDropdown(dropdown) {
    const initialOptions = dropdown.getOptions();
    const optionList = new OptionList(initialOptions);
    
    dropdown.onUserInputChange(inputValue => {
        if (inputValue.length > 2) {
            const updatedOptions = optionList.getOptions(inputValue);
            dropdown.setOptions(updatedOptions);
            console.log('hey')
        } else if (inputValue < 2) {
            dropdown.setOptions(initialOptions);
        } 
        return dropdown;
    });
}

// au clic sur une option, tagList crée un tag correspondant à l'option
export function sendOptionToTagList(dropdown, tagList) {
    dropdown.onClickOption(option => {
        tagList.createTag(option, dropdown);
        dropdown.emptyDropdownInput(dropdown);
        return tagList;
    });
}

// met à jour la liste des options de chaque dropdown à chaque nouveau résultat de la recherche  
export function updateDropdownOptionListWithSearchResults(results, dropdown) {
    const lists = getLists(results);
    for (let [key, value] of Object.entries(lists)) {
        if(key === dropdown.dropdownName) {
            dropdown.setOptions(value)
        }
    }
    
}