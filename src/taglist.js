export default class TagList{
    constructor(container){
        this.container = container;
    }

    createTagListDOM(){
        const tagListDom = document.createElement('div');
        tagListDom.classList.add('tag-list');
        this.container.appendChild(tagListDom); 
    }

    createTag(keyword, dropdown){
        const tagList = document.querySelector('.tag-list');
        const tag = document.createElement('div');
        const tagCross = document.createElement('i');
        const keywordWithoutSpace = keyword.replace(/\s+/g, '');
        const hasChild = tagList.querySelector(`.${keywordWithoutSpace}`);
        
        tag.classList.add('tag', `${keywordWithoutSpace}`);
        tagCross.classList.add('far', 'fa-times-circle');
        tag.append(document.createTextNode(`${keyword}`), tagCross);
        
        if(dropdown.dropdownName === 'ingredients') {
            tag.style.backgroundColor = '#3282F7';
        } else if (dropdown.dropdownName === 'appareils') {
            tag.style.backgroundColor = '#68D9A4';
        } else if (dropdown.dropdownName === 'ustensiles') {
            tag.style.backgroundColor = '#D04F4F';
        }

        tagList.appendChild(tag);

        if(hasChild != null) {
            const childrenWithKeywordClass = Array.from(tagList.querySelectorAll(`.${keywordWithoutSpace}`));
            console.log(childrenWithKeywordClass);
            childrenWithKeywordClass.map(el => {
                el.remove();
            })
        }

        //events
        tagCross.addEventListener('click', () => {
            tag.remove();
        })

        return tagList
    }
}