export default class Dropdown {
    constructor(DOMContainer, dropdownName, options) {
        this.DOMContainer = DOMContainer;
        this.dropdownName = dropdownName;
        this.options = options;
        this.callback = [];
    }

    createDropdownDOM() {
        const dropdownDOM = document.createElement('div');
        const dropdownForm = document.createElement('form');
        const dropdownInput = document.createElement('input');
        const arrow = document.createElement('div');
        const inputPlaceholder = this.dropdownName[0].toUpperCase() + this.dropdownName.substr(1);
        const optionListContainer = document.createElement('div');
        const optionListDom = document.createElement('div');
    
        dropdownDOM.classList.add('dropdown');
        dropdownForm.setAttribute('method', 'get');
        dropdownForm.setAttribute('action', 'traitement.php');
        dropdownInput.setAttribute('type', 'text');
        dropdownInput.setAttribute('name', 'search');
        dropdownInput.setAttribute('id', 'search-by');

        dropdownDOM.classList.add(`${this.dropdownName}`);
        dropdownInput.classList.add(`${this.dropdownName}-color`);
        dropdownInput.setAttribute('placeholder', `${inputPlaceholder}`);
        
        arrow.classList.add('arrow');

        optionListContainer.classList.add(`${this.dropdownName}-color`);
        optionListDom.classList.add(`${this.dropdownName}-color`);
        optionListContainer.classList.add('option-list-container');
        optionListDom.classList.add('option-list');
        optionListDom.setAttribute('id', 'col');
    
        dropdownForm.appendChild(dropdownInput);
        optionListContainer.appendChild(optionListDom);
        dropdownDOM.append(dropdownForm, arrow, optionListContainer);
        this.DOMContainer.appendChild(dropdownDOM);

        // events on dropdown
        // prevent submission
        dropdownForm.addEventListener('submit', (e) => {
            e.preventDefault();
        })

        // on mouseover, keywords are displayed
        dropdownDOM.addEventListener('mouseover', () => {
            this.openDropdown(dropdownDOM);
        });

        // on mouseout, keywords disappear
        dropdownDOM.addEventListener('mouseout', () => {
            if(arrow.classList.contains('active')) {
                this.closeDropdown(dropdownDOM);
            }
        });

        return dropdownDOM;
    }

    createKeywordDom(optionContainer, option){
        const optionDOM = document.createElement('div');
        option = option[0].toUpperCase() + option.slice(1);
        optionDOM.appendChild(document.createTextNode(`${option}`));
        optionDOM.classList.add('option');
        optionDOM.dataset['option'] = `${option}`;
        optionContainer.appendChild(optionDOM);
    }

    openDropdown(dropdownDOM) {
        const dropdownContent = dropdownDOM.querySelector('.option-list-container');
        const arrow = dropdownDOM.querySelector('.arrow');
        const dropdownInput = dropdownDOM.querySelector('input');
        dropdownDOM.classList.add('active');
        arrow.classList.add('active');
        dropdownContent.classList.add('active');
        dropdownInput.classList.add('active');

        dropdownInput.setAttribute('placeholder', `Recherche par ${this.dropdownName}`);
    }
    
    closeDropdown(dropdownDOM) {
        const inputPlaceholder = this.dropdownName[0].toUpperCase() + this.dropdownName.substr(1);
        const dropdownInput = dropdownDOM.querySelector('input');
        const dropdownContent = dropdownDOM.querySelector('.option-list-container');
        const arrow = dropdownDOM.querySelector('.arrow');
        dropdownDOM.classList.remove('active');
        arrow.classList.remove('active');
        dropdownContent.classList.remove('active');
        dropdownInput.classList.remove('active');

        dropdownInput.setAttribute('placeholder', `${inputPlaceholder}`);
    }

    getOptions() {
        this.setOptions(this.options);
        return this.options
    }

    onUserInputChange(cb) {
        const input = document.querySelector(`.${this.dropdownName}-color`);
        input.addEventListener('input', (e) => {
            const inputValue = e.target.value;
            cb(inputValue);
        })
    }

    setOptions(options)  {
        const dropdownDOM = document.querySelector(`.dropdown.${this.dropdownName}`)
        const optionListContainer = dropdownDOM.querySelector('.option-list-container');

        while (optionListContainer.firstChild) {
            optionListContainer.removeChild(optionListContainer.firstChild);
        }
        
        options.map(option => this.createKeywordDom(optionListContainer, option));
    }

    onClickOption(cb) {
        const dropdown = document.querySelector(`.${this.dropdownName}`);
        const optionsDOM = dropdown.querySelectorAll('.option');
        optionsDOM.forEach(option => {
            const optionContent = option.innerHTML;
            option.addEventListener('click', () => {
                cb(optionContent, dropdown);
            })
        })
    }
}