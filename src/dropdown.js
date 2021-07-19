export default class Dropdown {
    constructor(container, content) {
        this.container = container;
        this.content = content;
        // this.tagList = tagList;
        this.callback = [];
    }

    createDropdown(dropdownName) {
        const dropdown = document.createElement('div');
        const dropdownForm = document.createElement('form');
        const dropdownInput = document.createElement('input');
        const arrow = document.createElement('div');
    
        dropdown.classList.add('dropdown');
        dropdownForm.setAttribute('method', 'get');
        dropdownForm.setAttribute('action', 'traitement.php');
        dropdownInput.setAttribute('type', 'text');
        dropdownInput.setAttribute('name', 'search');
        dropdownInput.setAttribute('id', 'search-by');
    
        if(dropdownName.toString() === 'Ingrédients') {
            dropdown.classList.add('ingredients');
            dropdownInput.classList.add('blue');
            dropdownInput.setAttribute('placeholder', 'Ingrédients');
        } else if (dropdownName.toString() === 'Appliance') {
            dropdown.classList.add('appareils');
            dropdownInput.classList.add('green');
            dropdownInput.setAttribute('placeholder', 'Appareils');
        } else if (dropdownName.toString() === 'Ustensils') {
            dropdown.classList.add('ustensiles');
            dropdownInput.classList.add('red');
            dropdownInput.setAttribute('placeholder', 'Ustensiles');
        }
        
        arrow.classList.add('arrow');
    
        dropdownForm.appendChild(dropdownInput);
        dropdown.append(dropdownForm, arrow);
        this.container.appendChild(dropdown);

        this.createDropdownContent(dropdown, dropdownName, this.content[1]);


        // events on dropdown
        //prevent submission
        dropdownForm.addEventListener('submit', (e) => {
            e.preventDefault();
        })

        // on mouseover, keywords are displayed
        dropdown.addEventListener('mouseover', () => {
            this.openDropdown(dropdown, dropdownName);
        });

        // on mouseout, keywords disappear
        dropdown.addEventListener('mouseout', () => {
            if(arrow.classList.contains('active')) {
                this.closeDropdown(dropdown, dropdownName);
            }
        });

        return dropdown;
    }

    createDropdownContent(dropdown, dropdownName, options) {
        const keywordListContainer = document.createElement('div');
        const keywordListDom = document.createElement('div');
        keywordListContainer.classList.add('keyword-list-container');
        keywordListDom.classList.add('keyword-list-dom');
        keywordListDom.setAttribute('id', 'col');

        if(dropdownName.toString() === 'Ingrédients') {
            keywordListContainer.classList.add('blue');
            keywordListDom.classList.add('blue');
        } else if (dropdownName.toString() === 'Appliance') {
            keywordListContainer.classList.add('green');
            keywordListDom.classList.add('green');
        } else if (dropdownName.toString() === 'Ustensils') {
            keywordListContainer.classList.add('red');
            keywordListDom.classList.add('red');

        }

        let keywordDom;
        options.forEach(option => {
            keywordDom = this.createKeywordDom(keywordListDom, option);
            return keywordDom
        });

        keywordListContainer.appendChild(keywordListDom);
        dropdown.appendChild(keywordListContainer);

        return dropdown;
    }

    createKeywordDom(container, keyword){
        const keywordDom = document.createElement('div');
        keyword = keyword[0].toUpperCase() + keyword.slice(1);
        keywordDom.appendChild(document.createTextNode(`${keyword}`));
        keywordDom.classList.add('keyword');
        keywordDom.dataset['keyword'] = `${keyword}`;
        container.appendChild(keywordDom);

        //event on keywordDom
        // keywordDom.addEventListener('click', () => {
        //     this.tagList.createTag(keyword, container);
        // });
    }

    openDropdown(dropdown, dropdownName) {
        const dropdownContent = dropdown.querySelector('.keyword-list-container');
        const arrow = dropdown.querySelector('.arrow');
        const dropdownInput = dropdown.querySelector('input');
        dropdown.classList.add('active');
        arrow.classList.add('active');
        dropdownContent.classList.add('active');
        dropdownInput.classList.add('active');

        if (dropdownName === 'Ingrédients') {
            dropdownInput.setAttribute('placeholder', `Recherche par ingrédient`);
        } else if (dropdownName === 'Appliance') {
            dropdownInput.setAttribute('placeholder', `Recherche par appareil`);
        } else {
            dropdownInput.setAttribute('placeholder', `Recherche par ustensile`);
        }

        //user enters value input
        dropdownInput.addEventListener('keyup', (e) => {
            const inputValue = dropdownInput.value;
            if(inputValue.length > 2) {
                this.callback.forEach(callback => callback(inputValue));
            }
        });
    }
    
    closeDropdown(dropdown, dropdownName) {
        const dropdownInput = dropdown.querySelector('input');
        const dropdownContent = dropdown.querySelector('.keyword-list-container');
        const arrow = dropdown.querySelector('.arrow');
        dropdown.classList.remove('active');
        arrow.classList.remove('active');
        dropdownContent.classList.remove('active');
        dropdownInput.classList.remove('active');

        if (dropdownName === 'Ingrédients') {
            dropdownInput.setAttribute('placeholder', `Ingrédients`);
        } else if (dropdownName === 'Appliance') {
            dropdownInput.setAttribute('placeholder', `Appareils`);
        } else if (dropdownName === 'Ustensils'){
            dropdownInput.setAttribute('placeholder', `Ustensiles`);
        }
    }

    onUserInputChange(cb) {
        this.callback.push(cb);
    }

    setOptions(options, content)  {
        let dropdown;
        if (content === 'Ingrédients') {
            dropdown = document.querySelector('.dropdown.ingredients');
        } else if (content === 'Appliance') {
            dropdown = document.querySelector('.dropdown.appareils');
        } else {
            dropdown = document.querySelector('.dropdown.ustensiles');
        }
        const dropdownContent = dropdown.querySelector('.keyword-list-container');
        dropdownContent.remove(dropdownContent.firstChild);
        this.createDropdownContent(dropdown, content[0], options);
    }
}