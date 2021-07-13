export default class TagList{
    constructor(container){
        this.container = container;
    }

    createTagListDom(){
        const tagListDom = document.createElement('div');
        tagListDom.classList.add('tag-list');
        this.container.appendChild(tagListDom); 
    }

    createTag(keyword, dropdownName){
        const tagList = document.querySelector('.tag-list');
        const tag = document.createElement('div');
        const tagCross = document.createElement('i');
        tag.classList.add('tag');
        tagCross.classList.add('far', 'fa-times-circle');
        tag.append(document.createTextNode(`${keyword}`), tagCross);
        
        if(dropdownName.classList.contains('blue')) {
            tag.style.backgroundColor = '#3282F7';
        } else if (dropdownName.classList.contains('green')) {
            tag.style.backgroundColor = '#68D9A4';
        } else if (dropdownName.classList.contains('red')) {
            tag.style.backgroundColor = '#D04F4F';
        }

        tagList.appendChild(tag);

        //events
        tagCross.addEventListener('click', () => {
            tag.remove();
        })
    }
}