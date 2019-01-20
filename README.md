# Project Overview

This is a web-based application project that reads RSS feeds. Used gulp(CLI version 2.0.1, Local version 4.0.0) to generate *dist* files and applied `gulp-sass`, `gulp-autoprefixer`, `browser-sync`, `gulp-concat`, `gulp-uglify`, `gulp-babel` and `gulp-jasmine-phantom tools`.
All the original files are stored in the *src* directory, and production code are in the *dist* directory.

# Installation
```
npm install --save-dev gulp gulp-sass gulp-autoprefixer browser-sync gulp-concat gulp-uglify gulp-babel gulp-jasmine-phantom

```
There will be an error called **TypeError [ERR_INVALID_CALLBACK]: Callback must be a function** when running Jasmine with PhantomJs.
To fix the error, direct to file `node_modules/gulp-jasmine-phantom/index.js`, change `fs.unlink(path)` to  `fs.unlinkSync(path)` in function `cleanup(path)`.

# Implementation

### 1. RSS feeds
   - Test `allFeeds` object is defined.
   - Used `forEach` to loops through each feed in the `allFeeds` object and ensures it has a URL defined by using `.toBeDefined()` match _and_ that the URL is not empty by  using the length `.not.toBe(0)` match as well as it has a name defined _and_ that the name is not empty.

### 2. The menu
   - Ensure the menu element is hidden by default.
     - Used `.toBeTruthy()`match to verify the tag `body` has class    named `menu-hidden`.
     - By using match `.toBeLessThan(0)` to make sure the style `transform` applied on class `.menu-hidden .slide-menu` has a negative parameter
   - Ensures the menu changes visibility when the menu icon is clicked.
     - Use function `.click()` to simulate mouse click.
     - Click class `menu-icon-link` first, use `.toBe(false)` match to verify that the `body` does not have class `menu-hidden`, and click again, make sure expect `.toBe(true)` runs success.

### 3. Initial Entries
   -  Ensures when the `loadFeed` function is called and completes its work, there is at least a single `.entry` element within the `.feed` container.
     - Since `loadFeed()` function is asynchronous,  use of Jasmine's `beforeEach()` and asynchronous `done()` function to load initial feeds first, and verify the length of `feed` class's children `toBeGreaterThan(0)`.
     - As well as make sure in each child, the class `entry-link` is defined.

### 4. New Feed Selection
   - Ensures when a new feed is loaded by the `loadFeed` function that the content actually changes.
     - In `beforeEach()` function, load initial page first and store the `header-title` and all the `entry-link` subclass that in the `feed` to global variables. Secondly, Load a new feed and call `done()` function.
     - Compare current `header-title` content and previous stored one by using `.not.toBe()` match.
     - Compare current children content in  class `feed` and previous stored one by using same match.
     - Call `afterAll()` function to load initial page back.

# Task List

    - [x] No test should be dependent on the results of another.
    - [x] Callbacks should be used to ensure that feeds are loaded before they are tested
    - [x] Error handling should be implemented for undefined variables and out-of-bound array access
    - [x] When complete, all of your tests should pass

# Contributing

This repository is the starter code for _all_ Udacity students.
Testing is completed by _Xuelian Li_.
