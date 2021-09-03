export default class SearchBar {
    constructor() {
        this.callbacks = [];
    }

    setSearchBar() {
        const searchBar = document.querySelector('.search-bar');
        const searchBarForm = searchBar.querySelector('form');

        //prevent submission
        searchBarForm.addEventListener('submit', (e) => {
            e.preventDefault();
        });
    }

    onUserInputChange(cb){
        const searchBar = document.querySelector('.search-bar');
        const searchBarInput = searchBar.querySelector('input');
        this.callbacks.push(cb);
        searchBarInput.addEventListener('input', (e) => {
            const userInput = e.target.value;
            cb(userInput);
        });        
    }
}