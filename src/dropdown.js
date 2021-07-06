export default class Dropdown {
    createDropdown(dropdownName, container) {
        const dropdown = document.createElement('div');
        const dropdownForm = document.createElement('form');
        const dropdownInput = document.createElement('input');
        const arrow = document.createElement('div');
    
        dropdown.classList.add('dropdown');
        dropdownForm.setAttribute('method', 'get');
        dropdownForm.setAttribute('action', 'traitement.php');
        dropdownInput.setAttribute('type', 'text');
        dropdownInput.setAttribute('name', 'search');
        dropdownInput.setAttribute('placeholder', `${dropdownName}`);
        dropdownInput.setAttribute('id', 'search-by');
    
        if(dropdownName.toString() === 'Ingrédients') {
            dropdown.classList.add('ingredients');
            dropdownInput.classList.add('blue');
        } else if (dropdownName.toString() === 'Appareils') {
            dropdown.classList.add('appareils');
            dropdownInput.classList.add('green');
        } else if (dropdownName.toString() === 'Ustensiles') {
            dropdown.classList.add('ustensiles');
            dropdownInput.classList.add('red');
        }
        
        arrow.classList.add('arrow');
    
        dropdownForm.appendChild(dropdownInput);
        dropdown.append(dropdownForm, arrow);
        container.appendChild(dropdown);
    
        return dropdown;
    }
    
    // generateCategories(container) {
    //     // let categoriesNames = ['Ingrédients', 'Appareils', 'Ustensiles'];
    //     categoriesNames.forEach(name => {
    //         const dropdown = this.createdropdown(name);
    //     });
    // };
}