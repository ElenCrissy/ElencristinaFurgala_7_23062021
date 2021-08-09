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
        console.log('keywordObj =>', keywordObj)
        this.updatedList.push(keywordObj);
        
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

        this.removeSameTag(keyword, hasChildWithKeywordClass);

        //events
        tagCross.addEventListener('click', () => {
            tag.remove();
            const filteredUpdatedList = this.updatedList.filter(element => element.keyword !== keyword);
            this.updatedList = filteredUpdatedList;
            return this.updatedList
        })
        return tagListDOM
    }

    removeSameTag(keyword, childElement) {
        const tagListDOM = document.querySelector('.tag-list');
        const keywordWithoutSpace = keyword.replace(/\s+/g, '');

        if(childElement != null) {
            const childElement = Array.from(tagListDOM.querySelectorAll(`.${keywordWithoutSpace}`));
            childElement.forEach(child => {
                child.remove();
            });
            const filteredUpdatedList = this.updatedList.filter(element => element.keyword !== keyword);
            this.updatedList = filteredUpdatedList;

            return this.updatedList
        }
    }

    onTagListChange(cb) {
        this.callbacks.push(cb);
        this.updatedList.addEventListener('change', () => {
            cb(this.updatedList);
        });
    }
}