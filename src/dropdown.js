export default class Dropdown {
    constructor(container, content) {
        this.container = container;
        this.content = content;
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
    
        if(dropdownName.toString() === 'Ingredients') {
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

        this.createDropdownContent(dropdown, dropdownName);

        // events on dropdown
        // on mouseover, keywords are displayed
        dropdown.addEventListener('mouseover', () => {
            this.openDropdown(dropdown);
        });

        // on mouseout, keywords disappear
        dropdown.addEventListener('mouseout', () => {
            if(arrow.classList.contains('active')) {
                this.closeDropdown();
            }
        });

        return dropdown;
    }

    createDropdownContent(dropdown, dropdownName) {
        const keywordList = this.content[1];
        const keywordListContainer = document.createElement('div');
        keywordListContainer.classList.add('keyword-list-container');
        keywordListContainer.setAttribute('id', 'col');

        if(dropdownName.toString() === 'Ingrédients') {
            keywordListContainer.classList.add('blue');
        } else if (dropdownName.toString() === 'Appliance') {
            keywordListContainer.classList.add('green');
        } else if (dropdownName.toString() === 'Ustensils') {
            keywordListContainer.classList.add('red');
        }

        let keywordDom;
        keywordList.forEach(keyword => {
            keywordDom = this.createKeywordDom(keywordListContainer, keyword);
            return keywordDom
        });
        dropdown.append(keywordListContainer);
        return dropdown;
    }

    createKeywordDom(container, keyword){
        const keywordDom = document.createElement('div');
        keyword = keyword[0].toUpperCase() + keyword.slice(1);
        keywordDom.appendChild(document.createTextNode(`${keyword}`));
        keywordDom.classList.add('keyword');
        container.appendChild(keywordDom);
    }

    openDropdown(dropdown) {
        const dropdownContent = dropdown.querySelector('.keyword-list-container');
        const arrow = dropdown.querySelector('.arrow');
        const dropdownInput = dropdown.querySelector('input');
        dropdown.classList.add('active');
        arrow.classList.add('active');

        dropdownContent.classList.add('active');
        dropdownInput.removeAttribute('placeholder');
        dropdownInput.setAttribute('value', `Recherche `)
    }
    
    closeDropdown(dropdown) {
        const dropdownContent = dropdown.querySelector('.keyword-list-container');
        const arrow = dropdown.querySelector('.arrow');
        dropdown.classList.remove('active');
        arrow.classList.remove('active');
        dropdownContent.classList.remove('active');
    }

}