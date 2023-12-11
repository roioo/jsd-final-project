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
        };

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
        }); // back button

        // this.dom.viewBookmarks = document.querySelector('#viewBookmarks');
        // this.dom.viewBookmarks.addEventListener('click', () => {
        //     this.showBookmarkedBooks();
        // });
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

        const loadingNode = document.createElement('p');
        loadingNode.innerHTML = "Loading search results...";
        this.dom.searchResults.appendChild(loadingNode);

        // genre mapping
        const genreMapping = {
            'Relaxed': 'Romance',
            'Adventurous': 'Adventure',
        };

        const genres = genreMapping[mood];

        if (!genres) {
            console.error('Change your mood input');
            return;
        }

        // Open Library's Subjects API CORS policy issue
        // const subjectRequests = genres.map(subject =>
        //     axios.get(`${this.config.OPEN_LIBRARY_BASE_URL}/subjects/${subject}.json`)
        // );

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
            // console.log(`book array:`, book);
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
                console.log(`details:`, res.data);
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
        } else {
            const noTags = document.createElement('h3');
            noTags.textContent = 'No tags available.';
            noTags.className = 'tag';
            tagsContainer.appendChild(noTags);
        }

        this.dom.bookDetails.appendChild(tagsContainer);
    },
};

openLibrarySearch.initUi();