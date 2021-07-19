export default class OrderOptionList{
    constructor(options) {
        this.options = options;
    }

    getOptions(userInput) {
        const matchingOptions = [];
        const notMatching = [];
    
        this.options.forEach(option => {
            if (option.toLowerCase().includes(userInput)) {
                matchingOptions.push(option);
            }
        });
        return matchingOptions;
    }
}
