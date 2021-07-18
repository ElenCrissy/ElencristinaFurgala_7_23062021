export default class OrderLogic{
    constructor(options) {
        this.options = options;
    }

    getOptions(userInput) {
        const matchingOption = [];
    
        options.forEach(option => {
            if (option.includes(userInput)) {
                matchingOption.push(option);
            }
            return matchingOption;
        });
    }
}
