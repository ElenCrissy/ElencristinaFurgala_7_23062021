import Dropdown from "./dropdown.js";
import OptionList from "./OptionList.js";

export default class FilterableDropdown{
    constructor(DOMContainer, list) {
        const options = [];

        this.dropdown = new Dropdown(DOMContainer, list[0]);
        this.optionList = new OptionList(list[1]);

        this.dropdown.createDropdownDOM();
        this.dropdown.onUserInputChange(inputValue => {
            const options = this.optionList.getOptions(inputValue);
            this.dropdown.setOptions(options);
        });
    }
}