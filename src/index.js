import {recipes} from '../recipes.js';
import * as Utils from './utils.js';
import CardSection from './cardSection.js';
import Dropdown from './dropdown.js'
import SearchBar from './searchBar.js';
import TagList from './tagList.js';
import Search from './search.js';

const tagContainer = document.querySelector('.tag-container');
const dropdownContainer = document.querySelector('.dropdown-container');
const cardSectionContainer = document.querySelector('.cards-section');

window.onload = () => {
    const search = new Search();
    const searchBar = new SearchBar();
    const tagList = new TagList(tagContainer);
    const cardSection = new CardSection(cardSectionContainer);
    const lists = Utils.getLists();

    searchBar.setSearchBar();
    tagList.createTagListDOM();
    cardSection.createCardBlock(recipes);

    // pour chaque liste, crée dropdown
    for (let list in lists) {
        const category = list;
        const options = lists[list];
        const dropdown = new Dropdown(dropdownContainer, category, options);
        dropdown.createDropdownDOM();
        // filtrage de la liste des options
        Utils.filterDropdown(dropdown, options);
        // options sélectionnées, envoyées à la liste des tags
        Utils.sendOptionToTagList(dropdown, tagList, search);
    }


    // à chaque changement de la valeur de l'input, la fonctionnalité search est lancée
    searchBar.onUserInputChange(userInput => search.setSearchTerms(userInput));
    // à chaque mise à jour de la liste des tags, la fonctionnalité search est lancée
    tagList.onTagListChange(keywordList => {
        // console.log(keywordList);
        search.setKeywordList(keywordList);
    });
    // à chaque nouveau résultat issu de la recherche, la section cartes est mise à jour
    search.onNewResults(results => {
        cardSection.removeDuplicates();
        cardSection.createCardBlock(results);
    });
}