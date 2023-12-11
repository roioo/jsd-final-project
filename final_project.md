# ![GA Logo](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) JSD Final Project

## Overview

For the final project, you'll be designing and building a web app of your choice, which loads data from an API. This project will test your knowledge of JavaScript and require you to apply everything you've learned in this course. The result will be a live website that you can add to your portfolio. 

Check your project idea with your instructors to create a project scope that is realistic given the time allocated.

---

### Plagiarism Warning

You might be tempted to get some "help" or "inspiration" for this project by doing some research online. Developers often rely on copying small snippets of code from other people, but avoid the temptation to copy anything more than a single line of code at a time from elsewhere.

Aside from GA's strict rules about plagiarism, you will not learn anything by just copy-pasting code you don't understand! The goal here is to do your own original work to puzzle out a solution, every step of which makes sense to you! If you must copy a line of code, make yourself a rule that you have to write a long comment explaining exactly what the code does. _During the presentation you may be asked to explain any line of code in your solution - if you can't explain it, it's a giveaway that you "borrowed" it (or that someone more experienced wrote it for you)._

Please be aware: **plagiarism in your final project will result in an immediate and automatic fail mark for the project and therefore the course.** **There is no appeal process and no option to resubmit the project.** If you are not sure whether some code you want to copy counts as plagiarism, ask us! Not asking === plagiarism.

Plagiarism is _embarrassingly_ easy to detect!


---

## Technical Requirements

- Structure your application as a SPA (Single-Page Application) with JavaScript updating the page content, based on app data loaded from an API (or custom backend as an advanced optin; more on this below).
- Make at least two AJAX HTTP requests to an API, e.g. "text-based search for items" and "details on a single item by ID", and show the data returned in your own UI
- Choose an API from [this list of free public APIs](https://github.com/public-api-lists/public-api-lists). Note the following requirements:
  - You are not allowed to use Flickr, TMDB or Wikipedia as your API (we have already used these in class)
  - The API must support CORS (so that you can use it via AJAX requests in the browser)
  - The API should either have no authentication, or simple API key authentication as with the examples from class. Avoid APIs that require a complicated authentication process such as OAUth (this rules out Spotify, Facebook, Instagram, Twitter etc). If your API requires a key, you will have to register to get a key as soon as possible! (Most APIs will issue a key automatically when you register. Avoid APIs which have a human-vetted registration process as they may take too long).
- Research and choose your API as early as possible; be clear on  what kind of information you can get from the API, what endpoints that corresponds to, and whether you can get exactly what you need - i.e. a text-search and details endpoint at minimum. Do test requests in the browser to make sure you can get the data! Having to change your choice of API at the last minute is stressful! If you aren't sure about whether your API is a good fit for the project, check with an instructor!
- If possible, think of a way to let your app's users customise the data returned from the API; a good starting point is bookmarking/favouriting/liking items from the API - you store the liked/bookmarked IDs within your own app's data and show a UI for those items to your users. In general, you will not be able to "post" or submit new data to your chosen API - but you could still fake the submission of user data in your app by e.g. saving it to [LocalStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage).
- Use CSS to make your page look good!

- Deployment/Hosting:
  - The Git repo for your app should be hosted on **your own personal GitHub account on the public GitHub** (i.e. not the GA Enterprise Organisation used for classwork & homework repos during the course), so it can be viewed by anyone
  - Your live app must be hosted on one of the following: 
    - [GitHub Pages](https://pages.github.com/) - this is the easiest option as it just involves enabling the Pages URL for your the repo you will already have hosted with GitHub
    - [Netlify](https://www.netlify.com/)
    - [Vercel](https://vercel.com/)

### Optional Bonus Challenges:
  - Use React and React Router to build a modern framework-based UI with shareable & bookmarkable URLS
  - CSS: Use a CSS Framework to get a bunch of nice-looking styles & layout right out of the box (but be aware they can be hard to fine-tune/customise); try creating a response design that adapts to different screen sizes by using [CSS Media Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries); try the CSS [Flexbox](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Grids) or [Grid](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Grids) layout systems built into modern browsers
  - Use the browser's built-in [History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API/Working_with_the_History_API)) to create unique shareable URLS for the "pages" of your SPA, even without React or its Router
  - Use the LocalStorage browser API to persist your core application data between page loads (though not across browsers, be aware)
  - Use Google Maps to geolocate your data and offer a map-based UI! Do proximity searching (use the Geolocation API of the browser to get the user's current location, with permission) and display search results on the map? (Your API of choice will have to support geotagged data or allow latitude/longitude searches for this to work)
  - Use a third-party JS library for extra features? P5.js for 2D graphics? Three.js for 3D graphics? Phaser.js to create an arcade-style game? Sound processing with Tone.js?
  - New browser APIs: experiment with exciting new built-in browser APIs such as the WebAudio API, HTML5 Webcam API, accelerometer/gyroscope API, WebBluetooth API,  File/Drag&Drop API, Web Speech API (speech recognition - Siri in your browser!) etc.
  - Use a persistent data source of your own design to treat as an API. You can do this as either: 
    1. [Google Firebase](https://firebase.google.com/) - you can go through the tutorial [here](https://firebase.google.com/docs/database/web/start); this is the quickest option to get a custom cloud-based JS-object-style database up and running
    2. Your own custom backend created as a Node.js Express webserver + MongoDB/Mongoose database that provides CRUD functionality by exposing your own custom API endpoints (note that you may have to provide a credit card to a hosting provider like Heroku to host this backend live)

---

## Necessary Deliverables

- A **production-ready web application** hosted live on the web.
- A _public GitHub repository_ where the codebase is maintained.
- A `README.md` file in your GitHub repository that includes:
  - A link to the live app so people can try it out!
  - An overview of your idea, with a description of the key features
  - Any wireframes or diagrams you used during the planning stage
  - A screenshot or two of the app is nice to have
  - Explain a technical hurdle (something you struggled with)
  - Explain some things you learned (something you enjoyed)
  - If you used technology that we haven't covered in class, provide an overview of that
  - Where next? What will you add? (i.e. Wishlist / Future Features)

---

## Best Practices

Keep these principles in mind as you work on your project:

- **Clean and Readable Code** - Follow naming conventions, write plentiful comments for your code (remember it is publicly readable), and structure it well (use functions, objects, classes)
- **Well-formatted Code** - Consistent indentation, vertical blocks (not cramped)
- **Follow the F.I.R.S.T Principle** - Functions/Components should be Focused, Independent, Reusable, Small and Testable
- **Keep your code D.R.Y** - Don't repeat yourself (functions!)
- **Modular Code** - Separate your concerns and split functionality
- **Commit Early and Often** - Make sure you use Git regularly (from the staryt of the project, NOT juts one big commit at the end!) and push to GitHub! Write short, clear and meaningful git commit messages, again remembering this is public!

---

### Suggested Ways to Get Started / Advice

- Think of a website/service/features that doesn't exist but you wish did exist, and create it!
- Think of a problem in the world, or even in your personal life, and apply what you've learned to build an application that can help solve the issue.
- Begin with [wireframes](https://wireframe.cc/) and pseudocode to kickstart your imagination
- Get creative with it! 