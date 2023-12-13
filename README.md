<!-- A link to the live app so people can try it out! -->
https://roioo.github.io/jsd-final-project/

<!-- An overview of your idea, with a description of the key features -->
PageVibes - a book discovery tool using the Open Library API. 
Users can filter results based on moods like 'Relaxed' or 'Adventurous', mapping to book genres. 
It will use Ajax to fetch and display books and their details dynamically.
Users are able to bookmark their favourite books, see the books names in the tab.

<!-- Any wireframes or diagrams you used during the planning stage -->
https://openlibrary.org/dev/docs/api/search
https://openlibrary.org/dev/docs/api/covers

<!-- A screenshot or two of the app is nice to have -->

<!-- Explain a technical hurdle (something you struggled with) -->
Endpoint Parameter Search: I began with Open Library's Subjects API (axios.get(${this.config.OPEN_LIBRARY_BASE_URL}/subjects/${subject}.json)). 
This has encountered CORS policy issues, I switch to the general q search parameter.
In order to achieve a more targeted outcome, I chose to use the 'subject' parameter.

https://openlibrary.org/dev/docs/api/subjects
Access to XMLHttpRequest at 'https://openlibrary.org/subjects/romance' (redirected from 'https://openlibrary.org/subjects/Romance.json') from origin 'http://127.0.0.1:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
main.js:100 Error loading search results X

Varied Description Formats: book element descriptions are varied in API's response. 
Some were simple strings, some were nested under 'value'. I adapted my function to cater both scenarios.

<!-- Explain some things you learned (something you enjoyed) -->

<!-- If you used technology that we haven't covered in class, provide an overview of that -->

<!-- Where next? What will you add? (i.e. Wishlist / Future Features) -->
Genre mapping: handling two requests in parallel rather than separately, Promise.all
And I know the brief suggests local storage approach.. I got lazy and just went with non-persistent