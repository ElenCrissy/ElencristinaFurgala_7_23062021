import Dropdown from "./dropdown";
import OrderLogic from "./orderLogic";

export default class Context{
    constructor() {
        this.options = [];
        this.dropdown = new Dropdown;
        this.orderLogic = new OrderLogic(options);

        this.dropdown.onUserInputChange(userInput => {
            const options = getOptions(userInput);
            this.dropdown.setOptions(options);
        });

    }
}