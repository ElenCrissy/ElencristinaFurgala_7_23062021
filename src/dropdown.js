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

        this.createDropdownContent(dropdown, dropdownName);
        // dropdown.addEventListener('click', this.openDropdown());

        return dropdown;
    }

    createDropdownContent(dropdown, dropdownName) {
        const keywordList = this.content[1];
        const keywordListContainer = document.createElement('div');
        keywordListContainer.classList.add('keyword-list-container');

        if(dropdownName.toString() === 'Ingrédients') {
            keywordListContainer.classList.add('blue');
        } else if (dropdownName.toString() === 'Appliance') {
            keywordListContainer.classList.add('green');
        } else if (dropdownName.toString() === 'Ustensils') {
            keywordListContainer.classList.add('red');
        }

        // keywordListContainer.appendChild(document.createTextNode(keywordList));
        // dropdown.append(keywordListContainer);

    }

    // openDropdown() {
    //     const keywordListContainer = document.querySelector('.keyword-list-container');
    //     const arrow = document.getElementById('.arrow');
    //     keywordListContainer.style.display = 'flex';
    //     arrow.classList.add('active');
    // }
    
    // closeDropdown() {
    //     const keywordListContainer = document.querySelector('.keyword-list-container');
    //     const arrow = document.getElementById('.arrow');
    //     keywordListContainer.style.display = 'none';
    //     arrow.classList.remove('active');
    // }

}