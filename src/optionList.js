export default class OptionList{
    constructor(options) {
        this.options = options;
    }

    getOptions(inputValue) {
        const matchingOptions = [];
        this.options.forEach(option => {
            if (option.toLowerCase().includes(inputValue)) {
                matchingOptions.push(option);
            }
        });
        return matchingOptions; 

    }
}
