import Dropdown from "./dropdown.js";
import OrderOptionList from "./orderOptionList.js";

export default class Context{
    constructor(container, content) {
        const options = [];

        this.dropdown = new Dropdown(container, content);
        this.orderOptionList = new OrderOptionList(content[1]);

        this.dropdown.createDropdownDOM(content[0]);
        this.dropdown.onUserInputChange(inputValue => {
            const options = this.orderOptionList.getOptions(inputValue);
            this.dropdown.setOptions(options);
        });
    }
}