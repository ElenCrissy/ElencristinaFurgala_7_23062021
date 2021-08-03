export default class OptionList{
    constructor(options) {
        this.options = options;
    }

    getOptions(inputValue) {
        const matchingOptions = [];
        // if (inputValue === undefined) {
        //     console.log(this.options);
        //     return this.options;
        // } else {
            this.options.forEach(option => {
                if (option.toLowerCase().includes(inputValue)) {
                    matchingOptions.push(option);
                }
            });
        // }
        return matchingOptions; 

    }
}
