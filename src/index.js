import {recipes} from '../recipes.js';
import * as Utils from './utils.js';
import CardSection from './cardSection.js';
import Dropdown from './dropdown.js'
import SearchBar from './searchBar.js';
import TagList from './tagList.js';
import Search from './search.js';

const tagContainer = document.querySelector('.tag-container');
const dropdownContainer = document.querySelector('.dropdown-container');
const cardSection = document.querySelector('.cards-section');

window.onload = () => {
    const search = new Search();
    const searchBar = new SearchBar();
    const tagList = new TagList(tagContainer);
    const lists = Utils.getLists();

    searchBar.setSearchBar();
    tagList.createTagListDOM();

    for (let list in lists) {
        const listName = list;
        const options = lists[list];
        const dropdown = new Dropdown(dropdownContainer, listName, options);
        dropdown.createDropdownDOM();
        Utils.filterDropdown(dropdown, options);
        Utils.sendOptionToTagList(dropdown, tagList, search);
    }

    searchBar.onUserInputChange(userInput => search.getSearchTerms(userInput));
    tagList.onTagListChange(keywordList => {
        console.log(keywordList)
        // search.getKeywordList(keywordList)
    });

}