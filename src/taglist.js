export default class TagList{
    constructor(container){
        this.container = container;
        this.appendedTags = [];
    }

    createTagListDOM(){
        const tagListDom = document.createElement('div');
        tagListDom.classList.add('tag-list');
        this.container.appendChild(tagListDom); 
    }

    createTag(keyword, dropdown){
        const tagListDOM = document.querySelector('.tag-list');
        const tag = document.createElement('div');
        const tagCross = document.createElement('i');
        const keywordWithoutSpace = keyword.replace(/\s+/g, '');
        const hasChildWithKeywordClass = tagListDOM.querySelector(`.${keywordWithoutSpace}`);
        
        tag.classList.add('tag', `${keywordWithoutSpace}`);
        tagCross.classList.add('far', 'fa-times-circle');
        tag.append(document.createTextNode(`${keyword}`), tagCross);
        
        if(dropdown.dropdownName === 'ingredients') {
            tag.style.backgroundColor = '#3282F7';
            tag.dataset['category'] = 'ingredients';
        } else if (dropdown.dropdownName === 'appareils') {
            tag.style.backgroundColor = '#68D9A4';
            tag.dataset['category'] = 'appliance';
        } else if (dropdown.dropdownName === 'ustensiles') {
            tag.style.backgroundColor = '#D04F4F';
            tag.dataset['category'] = 'ustensils';
        }

        tagListDOM.appendChild(tag);

        this.removeSameTag(keywordWithoutSpace, hasChildWithKeywordClass);

        this.getSelectedTags();

        //events
        tagCross.addEventListener('click', () => {
            tag.remove();
            this.getSelectedTags();
        })
        
        return tagListDOM
    }

    removeSameTag(keyword, childElement) {
        const tagListDOM = document.querySelector('.tag-list');

        if(childElement != null) {
            const childElement = Array.from(tagListDOM.querySelectorAll(`.${keyword}`));
            childElement.forEach(child => {
                child.remove();
            })
        }
        
        return tagListDOM
    }

    getSelectedTags() {
        const tagListDOM = document.querySelector('.tag-list');
        const tagListDOMChildren = tagListDOM.children;
        const tagListDOMChildrenArray = Array.from(tagListDOMChildren);
        
        return tagListDOMChildrenArray
    }
}