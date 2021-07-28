export default class Dropdown {
    constructor(DOMContainer, dropdownName) {
        this.DOMContainer = DOMContainer;
        this.dropdownName = dropdownName;
        // this.tagList = tagList;
        this.callback = [];
    }

    createDropdownDOM() {
        const dropdownDOM = document.createElement('div');
        const dropdownForm = document.createElement('form');
        const dropdownInput = document.createElement('input');
        const arrow = document.createElement('div');
    
        dropdownDOM.classList.add('dropdown');
        dropdownForm.setAttribute('method', 'get');
        dropdownForm.setAttribute('action', 'traitement.php');
        dropdownInput.setAttribute('type', 'text');
        dropdownInput.setAttribute('name', 'search');
        dropdownInput.setAttribute('id', 'search-by');

        const inputPlaceholder = this.dropdownName[0].toUpperCase() + this.dropdownName.substr(1);
        dropdownDOM.classList.add(`${this.dropdownName}`);
        dropdownInput.classList.add(`${this.dropdownName}-color`);
        dropdownInput.setAttribute('placeholder', `${inputPlaceholder}`);
        
        arrow.classList.add('arrow');
    
        dropdownForm.appendChild(dropdownInput);
        dropdownDOM.append(dropdownForm, arrow);
        this.DOMContainer.appendChild(dropdownDOM);

        // this.createDropdownContent(dropdown, this.dropdownName, options);


        // events on dropdown
        //prevent submission
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

    showOptions(dropdownDOM, options, inputValue) {
        if (inputValue === undefined) {
            const keywordListContainer = document.createElement('div');
            const keywordListDom = document.createElement('div');
            keywordListContainer.classList.add('keyword-list-container');
            keywordListDom.classList.add('keyword-list-dom');
            keywordListDom.setAttribute('id', 'col');
    
            keywordListContainer.classList.add(`${this.dropdownName}-color`);
            keywordListDom.classList.add(`${this.dropdownName}-color`);
    
            options.map(this.createKeywordDom(keywordListDom, option))
            // let keywordDom;
            // options.forEach(option => {
            //     keywordDom = this.createKeywordDom(keywordListDom, option);
            //     return keywordDom
            // });
            // utilise MAP !
    
            keywordListContainer.appendChild(keywordListDom);
            dropdownDOM.appendChild(keywordListContainer);
    
            return dropdownDOM;
        }
    }

    createKeywordDom(keywordContainer, keyword){
        const keywordDom = document.createElement('div');
        keyword = keyword[0].toUpperCase() + keyword.slice(1);
        keywordDom.appendChild(document.createTextNode(`${keyword}`));
        keywordDom.classList.add('keyword');
        keywordDom.dataset['keyword'] = `${keyword}`;
        keywordContainer.appendChild(keywordDom);

        //event on keywordDom
        // keywordDom.addEventListener('click', () => {
        //     this.tagList.createTag(keyword, container);
        // });
    }

    openDropdown(dropdownDOM) {
        const dropdownContent = dropdownDOM.querySelector('.keyword-list-container');
        const arrow = dropdownDOM.querySelector('.arrow');
        const dropdownInput = dropdownDOM.querySelector('input');
        dropdownDOM.classList.add('active');
        arrow.classList.add('active');
        dropdownContent.classList.add('active');
        dropdownInput.classList.add('active');

        dropdownInput.setAttribute('placeholder', `Recherche par ${this.dropdownName}`);

        //user enters value input
        dropdownInput.addEventListener('keyup', (e) => {
            const inputValue = dropdownInput.value;
            if(inputValue.length > 2) {
                this.callback.forEach(callback => callback(inputValue));
            }
        });
    }
    
    closeDropdown(dropdownDOM) {
        const inputPlaceholder = this.dropdownName[0].toUpperCase() + this.dropdownName.substr(1);
        const dropdownInput = dropdownDOM.querySelector('input');
        const dropdownContent = dropdownDOM.querySelector('.keyword-list-container');
        const arrow = dropdownDOM.querySelector('.arrow');
        dropdownDOM.classList.remove('active');
        arrow.classList.remove('active');
        dropdownContent.classList.remove('active');
        dropdownInput.classList.remove('active');

        dropdownInput.setAttribute('placeholder', `${inputPlaceholder}`);
    }

    onUserInputChange(cb) {
        this.callback.push(cb);
    }

    setOptions(options)  {
        const dropdownDOM = document.querySelector(`.dropdown.${this.dropdownName}`)
        const dropdownOptionsContainer = dropdownDOM.querySelector('.keyword-list-container');
        dropdownOptionsContainer.removeChild(dropdownOptionsContainer.firstChild);
        this.showOptions(dropdownDOM, options);
    }
}