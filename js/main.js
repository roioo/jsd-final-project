const openLibrarySearch = {
    config: {
        OPEN_LIBRARY_BASE_URL: 'https://openlibrary.org',
        OPEN_LIBRARY_COVER_URL: 'https://covers.openlibrary.org'
    },

    dom: {},

    initUi() {
        this.dom = {
            searchForm: document.querySelector('#searchForm'),
            searchText: document.querySelector('#searchText'),
            searchResults: document.querySelector('#results'),
            bookDetails: document.querySelector('#details'),
            backToResults: document.querySelector('#backToResults'),
            favouriteButton: document.querySelector('#favouriteButton'),
            favouritesList: document.querySelector('#favouritesList')
        };

        this.favourites = [];

        this.dom.searchForm.addEventListener('submit', ev => {
            // console.log(this.dom.searchText.value);
            ev.preventDefault();
            this.loadSearchResults(this.dom.searchText.value);
        });

        this.dom.searchText.focus();

        this.dom.searchResults.addEventListener('click', ev => {
            const bookElement = ev.target.closest('.book-result');
            // console.log(`book clicked`, ev.target);
            if (bookElement && bookElement.dataset.id) {
                this.loadBookDetails(bookElement.dataset.id);
            }
        }); // load details 

        this.dom.backToResults.addEventListener('click', () => {
            this.dom.searchResults.style.display = 'grid';
            this.dom.backToResults.style.display = 'none';
            this.dom.bookDetails.style.display = 'none';
            this.showFavourites();
        }); // back button

        this.dom.favouriteButton.addEventListener('click', () => {
            const currentBookId = this.currentBookId;
            const currentBookTitle = this.currentBookTitle;
            this.toggleFavourite(currentBookId, currentBookTitle);
        }); // click save bookmarked id
    },

    generateCoverImageUrl(coverId, size) {
        // console.log(`coverId`, coverId);
        const coverImageUrl = `${this.config.OPEN_LIBRARY_COVER_URL}/b/id/${coverId}-${size}.jpg`;
        return coverImageUrl
    },

    loadSearchResults(mood) {
        this.dom.searchResults.style.display = 'grid';
        this.dom.bookDetails.style.display = 'none';
        this.dom.backToResults.style.display = 'none';

        this.dom.searchResults.replaceChildren();

        // genre mapping
        const genreMapping = {
            'Relaxed': 'Romance',
            'Adventurous': 'Mystery',
            'Nostalgic': 'Classic',
            'Suspenseful': 'Revolutions',
            'Curious': 'Fiction'
        };

        const genres = genreMapping[mood];

        if (!genres) {
            const message = document.createElement('p');
            message.textContent = 'Change your mood input';
            this.dom.searchResults.appendChild(message);
            return;
        }

        // Open Library's Subjects API CORS policy issue
        // const subjectRequests = genres.map(subject =>
        //     axios.get(`${this.config.OPEN_LIBRARY_BASE_URL}/subjects/${subject}.json`)
        // );

        const loadingNode = document.createElement('p');
        loadingNode.innerHTML = "Loading search results...";
        this.dom.searchResults.appendChild(loadingNode);

        axios.get(`${this.config.OPEN_LIBRARY_BASE_URL}/search.json`, {
            params: {
                subject: genres
            }
        })
            .then(res => {
                const books = res.data.docs.filter(book => book.cover_i);
                this.renderSearchResults(books);
            })
            .catch(err => {
                console.error('Error loading search results', err);
            });
    },

    renderSearchResults(books) {

        // console.log(`in renderSearchResults:`, books);
        this.dom.searchResults.replaceChildren();

        // if (books.length === 0) {
        //     this.dom.searchResults.innerHTML = `
        //       <h3>No books found.</h3>
        //       <p>Please try a different mood.</p>
        //     `;
        //     return;
        // }

        for (const book of books) {
            console.log(`book array:`, book);
            const bookElement = document.createElement('div');
            bookElement.classList.add('book-result');

            const img = document.createElement('img');
            img.src = this.generateCoverImageUrl(book.cover_i, 'M');
            bookElement.appendChild(img);

            const title = document.createElement('h2');
            title.textContent = book.title;
            bookElement.appendChild(title);

            bookElement.dataset.id = book.key;

            this.dom.searchResults.appendChild(bookElement);
        }
    },

    loadBookDetails(bookId) {
        axios.get(`${this.config.OPEN_LIBRARY_BASE_URL}${bookId}.json`)
            .then(res => {
                // console.log(`details:`, res.data);
                this.renderBookDetails(res.data);
            })
            .catch(err => {
                console.error('Error loading book details:', err);
            });
    },

    renderBookDetails(bookData) {
        // console.log(`renderbookdetails`, bookData);

        this.dom.searchResults.style.display = 'none';
        this.dom.backToResults.style.display = 'block';
        this.dom.bookDetails.style.display = 'block';
        this.dom.bookDetails.replaceChildren();

        // load details to page render 

        const img = document.createElement('img');
        img.src = this.generateCoverImageUrl(bookData.covers[0], 'L');
        this.dom.bookDetails.appendChild(img);

        const title = document.createElement('h2');
        title.textContent = bookData.title;
        this.dom.bookDetails.appendChild(title);

        // to address varied description format (string and nested scenarios)
        const summary = document.createElement('p');
        if (typeof bookData.description === 'string') {
            summary.textContent = bookData.description;
        } else if (bookData.description && bookData.description.value) {
            summary.textContent = bookData.description.value;
        } else {
            summary.textContent = 'No summary available.';
        }
        this.dom.bookDetails.appendChild(summary);

        // fetch data from 'subject' to output as individual tags
        const tagsContainer = document.createElement('div');
        tagsContainer.className = 'tags-container';

        if (bookData.subjects) {
            bookData.subjects.forEach(subject => {
                const tag = document.createElement('h3');
                tag.textContent = `#${subject.toUpperCase()}`;
                tag.className = 'tag';
                tagsContainer.appendChild(tag);
            });
        }

        // display favourite button
        this.dom.favouriteButton.style.display = 'block';

        this.currentBookId = bookData.key;
        this.currentBookTitle = bookData.title;

        this.dom.bookDetails.appendChild(tagsContainer);
        this.updateFavouriteButtonStatus(bookData.key);
    },

    toggleFavourite(bookId, bookTitle) {
        const favouriteIndex = this.favourites.findIndex(fav => fav.id === bookId);
        if (favouriteIndex !== -1) {
            this.favourites.splice(favouriteIndex, 1);
        } else {
            this.favourites.push({ id: bookId, title: bookTitle });
        }
        this.showFavourites();
        this.updateFavouriteButtonStatus(bookId);
    },

    showFavourites() {
        this.dom.favouritesList.innerHTML = '';
        this.favourites.forEach(fav => {
            const favElement = document.createElement('div');
            favElement.classList.add('favourite-item');
            favElement.textContent = fav.title;
            this.dom.favouritesList.appendChild(favElement);
        });

        if (this.favourites.length > 0) {
            this.dom.favouritesList.style.display = 'block';
            document.getElementById('favouritesSectionTitle').style.display = 'block';
        } else {
            this.dom.favouritesList.style.display = 'none';
            document.getElementById('favouritesSectionTitle').style.display = 'none';
        }
    },

    updateFavouriteButtonStatus(bookId) {
        if (this.favourites.some(fav => fav.id === bookId)) {
            this.dom.favouriteButton.classList.add('bookmarked');
        } else {
            this.dom.favouriteButton.classList.remove('bookmarked');
        }
    }
};

openLibrarySearch.initUi();