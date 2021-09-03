export default class TagList{
    constructor(container){
        this.container = container;
        this.callbacks = [];
        this.updatedList = [];
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

        const keywordObj = {
            keyword : `${keyword}`,
            category : `${dropdown.dropdownName}`
        };
        
        this.updatedList.push(keywordObj);
        this.triggerCallbacks();

        tag.classList.add('tag', `${keywordWithoutSpace}`);
        tagCross.classList.add('cross', 'far', 'fa-times-circle');
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

        this.removeSameTag(keyword, hasChildWithKeywordClass);

        // //events
        tagCross.addEventListener('click', () => {
            tag.remove();
            this.updatedList = this.updatedList.filter(element => element.keyword !== keyword);
            this.triggerCallbacks();

            return this.updatedList;
        });

        return tag;
    }

    removeSameTag(keyword, childElement) {
        const tagListDOM = document.querySelector('.tag-list');
        const keywordWithoutSpace = keyword.replace(/\s+/g, '');

        if(childElement != null) {
            const childElement = Array.from(tagListDOM.querySelectorAll(`.${keywordWithoutSpace}`));
            childElement.forEach(child => child.remove());
            this.updatedList = this.updatedList.filter(element => element.keyword !== keyword);
            this.triggerCallbacks();

            return this.updatedList;
        }


        return this.updatedList;
    }

    onTagListChange(cb) {
        this.callbacks.push(cb);
    }

    triggerCallbacks() {
        this.callbacks.forEach(cb => cb(this.updatedList));
    }
}