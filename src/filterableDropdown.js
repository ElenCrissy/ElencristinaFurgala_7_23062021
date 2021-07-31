import Dropdown from "./dropdown.js";
import OptionList from "./OptionList.js";

export default class FilterableDropdown{
    constructor(DOMContainer, listName, keywordsList) {

        this.dropdown = new Dropdown(DOMContainer, listName);
        this.optionList = new OptionList(keywordsList);

        this.dropdown.createDropdownDOM();
        this.dropdown.onUserInputChange(inputValue => {
            const options = this.optionList.getOptions(inputValue);
            this.dropdown.setOptions(options);
        });
    }
}