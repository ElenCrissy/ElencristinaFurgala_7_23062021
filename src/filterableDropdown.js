import Dropdown from "./dropdown.js";
import OptionList from "./OptionList.js";

export default class FilterableDropdown{
    constructor(DOMContainer, listName, keywordsList) {

        this.dropdown = new Dropdown(DOMContainer, listName);
        this.optionList = new OptionList(keywordsList);

        this.dropdown.createDropdownDOM();
        // this.dropdown.displayOptions(inputValue => {
        //     const options = this.optionList.getOptions();
        //     this.dropdown.setOptions(options);
        // })
        this.optionList.getOptions();
        this.dropdown.onUserInputChange(inputValue => {
            if (inputValue.length > 2) {
                const options = this.optionList.getOptions(inputValue);
                this.dropdown.setOptions(options);
            }
            return this.dropdown;
        });
    }
}