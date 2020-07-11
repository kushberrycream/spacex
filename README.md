# SpaceX API Website - Second Milestone Project
**Stream Two Project: Interactive Frontend Development - Code Institute**

## Introduction
This is a Website using the SpaceX API. The Website Fetches the data provided by SpaceX and displays it
across multiple different pages. This Website will show what I have learnt over the last couple of modules and
provide an insight into what I am able to do with API's and Javascript.

## Demo
Click the image below for a live Demo of the Website.

<a href="https://kushberrycream.github.io/spacex/">
  <img alt="am i responsive" src="https://github.com/kushberrycream/spacex/blob/master/assets/images/iamresponsivespacex.png?raw=true">
</a>

## Contents
- [Introduction](#tom-jones-personal-portfolio---first-milestone-project)
- [Demo](#demo)
- [UX](#ux)
    * [Strategy](#strategy)
    * [Scope](#scope)
    * [Structure](#structure)
    * [Skeleton](#skeleton)
    * [Surface](#surface)
- [Technologies Used](#technologies-used")
- [Features](#features)
    * [Existing Features](#existing-features)
    * [Features Left to Implement](#features-left-to-implement)
- [Testing](#testing)
- [Deployment](#deployment)
    * [Deployment on GitHub Pages](#deployment-on-github-pages)
    * [Cloning the Repository](#cloning-the-repository)
- [Credits](#credits)
    * [Content](#content)
    * [Media](#media)
    * [Acknowledgments](#acknowledgements)

## UX
### Strategy
I want users of my website to be able to access clear and easy to read information. 
I have used the the SpaceX API to obtain all my information, any data i provide to my end user will 
automatically update if SpaceX were to update it in anyway. I have kept the design minimalistic but still 
keeping to a space theme. To give a good user experience I have displayed the data in a uniform and ledgable layout
theroughout the site.

### Scope
| User | User Stories |
| ------ | ------ |
| SpaceX Fans | As a SpaceX fan I want to be able to view as much Information about SpaceX as possible, Upcoming Launches, Previous Launches, Types of Rockets etc. |
| People intrested in Space Flight | As someone intrested in Space Flight I want to be able to see any upcoming Launches, any data on those launches and missions they undertake. Also anything such as Videos, Wikipedia pages and Reddit pages.  |
| Children intrested in Space | As a Child I want to be able to learn as much as possible and as easily as possible. I want to be able to view any intresting images or links to videos or other pages. |
| Anyone who doesnt know SpaceX | As a someone new to SpaceX I would like to find out who they are and what they do, any relevant data about SpaceX and links to more relevant information. |

I wanted to give all users data provided by SpaceX in clear and ledgable format. I wanted to display each specific bit of data in its own section to make the website
easy for any user to read or use.

SpaceX fans are able to see a great amount of data about upcoming launches, previous launches and the various rockets, dragons (Part of the Spacecraft) and much more.

People intrested in Space flight can easily see what kind of launches are happening and when also and missions that SpaceX have undertaken / currently undertaking. Plus links to
previous launch videos and links to other SpaceX links.

Children can navigate easily through my site to learn all about the types of vehicles SpaceX use, any information about SpaceX and also any links to videos and any more information about Space Flight.

People who do not know about SpaceX and would like to learn what they do can view a vast array of information from launches, missions, vehicles and also historical events SpaceX have been a part of.


### Structure
The site is built up of multiple pages, each page is populated with data from the SpaceX API. Each page fetches its own data from the API using the various
endpoints provided, when a page is selected or a new data is fetched a loading spinner will spin in the center of each page until the data has been fetched,
this gives the user a good indication the page is doing something. Almost all the data is displayed within cards this gives the pages continunity and gives a good user experience. 
I have provided multiple CTA's across the whole website for a range of things, CTA's are for social links, wikipedia, reddit, news articles, youtube and much more giving the user a vast
amount of information, all opening to a separate tab so to not divert from my website. A contact form is provided for anyone who needs to contac the developer about bugs or suggestions, 
but as I am not wanting many emails from this site I have provided minimal links. An Error modal appears if there is any error with the API request this is able to be closed and the rest of the 
site is still accessible or you can refresh the page via the modal. 
  

### Skeleton
[Landing Screen](https://github.com/kushberrycream/spacex/blob/master/assets/wireframes/Landing%20_%20Home%20Screen.png?raw=true) &nbsp;&nbsp;:rocket:&nbsp;&nbsp; [Home Screen (Below Landing)](https://github.com/kushberrycream/spacex/blob/master/assets/wireframes/Home%20Screen%20(Below%20Landing).png?raw=true) &nbsp;&nbsp;:rocket:&nbsp;&nbsp; 
[All Rockets Screen](https://github.com/kushberrycream/spacex/blob/master/assets/wireframes/Rockets%20Screen.png?raw=true) &nbsp;&nbsp;:rocket:&nbsp;&nbsp; [Specfic Rocket Screen](https://github.com/kushberrycream/spacex/blob/master/assets/wireframes/Rocket%20Spec%20Screen.png?raw=true) &nbsp;&nbsp;:rocket:&nbsp;&nbsp; <br/>
[Dragons Screen](https://github.com/kushberrycream/spacex/blob/master/assets/wireframes/Dragons%20Screen.png?raw=true) &nbsp;&nbsp;:rocket:&nbsp;&nbsp; [Missions Screen](https://github.com/kushberrycream/spacex/blob/master/assets/wireframes/Missions%20Screen%20.png?raw=true) &nbsp;&nbsp;:rocket:&nbsp;&nbsp;
[Past Launches Screen](https://github.com/kushberrycream/spacex/blob/master/assets/wireframes/Launches%20Screen.png?raw=true) &nbsp;&nbsp;:rocket:&nbsp;&nbsp; [About SpaceX and Website Info Screen](https://github.com/kushberrycream/spacex/blob/master/assets/wireframes/about-screen.png?raw=true) &nbsp;&nbsp;:rocket:&nbsp;&nbsp;
[Contact Page](https://github.com/kushberrycream/spacex/blob/master/assets/wireframes/Contact%20Page.png?raw=true) &nbsp;&nbsp;:rocket:&nbsp;&nbsp;
 
### Surface
I planned originally to keep the website white and black but as the page progressed I was thinking it needed a space theme, whilst the white and black theme worked I felt it was
a little to boring to me. My website ended up with the main background being a star filled sky with a different landing page background. To display text correctly I have overlayed the landing page background and
also changed the background on all cards to transparent black and this helps keep all the text ledgable against the background. All my Fonts, Active links and Icons are white unless they are being hovered over.

<p align="right">
  <a href="#tom-jones-personal-portfolio---first-milestone-project">Back to Top :arrow_heading_up:</a> 
</p>

## Technologies Used

This is the Technology Stack I used throughout this project.

- [Balsamiq Mockups 3](https://balsamiq.com/)
    - I have used Balsamiq to create my wireframes.
- [HTML5](https://www.w3.org/html/)
    - I use HTML to create the basic structure of my site.
- [CSS3](https://www.w3.org/Style/CSS/Overview.en.html)
    - CSS allows me to make my site attractive and unique.
- [JavaScript](https://www.javascript.com/)
    - JavaScript is the main technology used it allows me to provide data to my users whilst also improving the experience.
- [Axios](https://github.com/axios/axios)
    - Axios allows me to make XMLHttpRequests with a single line of Code.
- [EmailJS](https://www.emailjs.com/)
    - I have used EmailJS so my Contact form works and sends me Emails.
- [Moment.js](https://momentjs.com/)
    - I used Moment.js to help me format the dates better and without the use of extra Javascript.
- [Accounting.js](https://github.com/openexchangerates/accounting.js/)
    - I have used Accounting.js to format all the sums of money obtain from the API, this allowed me to not fill my code with
unnecessary, confusing code.
- [Bootstrap 4](https://getbootstrap.com/)
    - I have used the Bootstrap Framework and multiple components with my own CSS styles to
    create a great User Experience.
- [Font Awesome](https://fontawesome.com/)
    - Font Awesome was used for any icons I needed as they supply a vast array of good, free icons.
- [Hover.css](https://ianlunn.github.io/Hover/)
    - I have used hover.css to implement animation on a few icons to give the user feedback on links.


<p align="right">
  <a href="#tom-jones-personal-portfolio---first-milestone-project">Back to Top :arrow_heading_up:</a> 
</p>

## Features

I have used Bootstrap as the HTML and CSS Framework to help me develope a responsive mobile-first website. The Majority of the page is written in 
VanillaJS as I wanted to showcase what I can do with Javascript, I have also implimented jQuery in a few places but this is quite minimal.
I have also used a few js libaries such as accounting.js as this was alot simpler than writing code to format currency correctly, I also used moment.js to 
format UTC dates as I didnt want to complicate my code by trying to format dates with my own code.

### Existing Features

- [x] My site incorporates bootstrap components. I have used a Navbar and updated the style to fit SpaceX's theme, I have also used the bootstrap card to display most of my data and updated the styling again to fit my needs.
- [x] The landing page uses a carousel component to slide through all the upcoming Launch dates and times. It also displays details about the launch. 
- [x] I have created tabs so I was able to display data about launch and landing sites in tables. By using tabs i was able to then display the tables responsively without extending the width or the height to much on mobile devices 
as you only display one item of data at a time.
- [x] Both the Rockets and the Dragons Pages allow you to view all the vehicles together or you can choose a specific vehicle and view more details on that vehicle, including photos and videos if available.
- [x] I supply a breakdown of each Mission SpaceX currently undertake and have undertaken and also a link to the company it is associated with.
- [x] I have broken down the launches by paginating the data. Each page displays 10 launches and they have been reversed so the most recent launch is displayed first. Each Launch displays a Description along with any links.
- [x] History is split into smaller cards to allow more data to be viewed on the screen but still allow for responiveness. 
- [x] The Launches page has functioning prev and next buttons allowing for the user to select through a set of data and not create a long page thats difficult to read.
- [x] I have given the user information on the company, their API and also myself. I have also given the user links to the company and myself incase the user wishes to research more or contact myself.
- [x] A Contact form has been supplied to also allow the user to quickly contact me about any bugs or suggestions.

### Features Left to Implement

- [ ] In future updates I plan to place a search function within the site to search for the specific information you require. Such as if you search Falcon 1 it will include options to view 
everything that has the mention of Falcon 1, etc. 

<p align="right">
  <a href="#tom-jones-personal-portfolio---first-milestone-project">Back to Top :arrow_heading_up:</a> 
</p>

## Testing

I have passed my javascript code through the linter [jsHint](https://jshint.com/). I found no errors I only have undefined variables that are defined in the 
various libaries I am using. It also says I have unused variables but these are infact used when clicking buttons on my page.

I used [W3 Validators](https://validator.w3.org) to check for any errors within my HTML and CSS and both passed. Originally I was using the `<option>` element 
as my navigation buttons as this worked for what I needed. The validator let me know this wasnt the correct usage, so I replaced these with buttons and restyled them so
they still looked the same. I was also using the role attribute within my tables as this was used in a tutorial I had used but again I was warned this was not needed.

I passed JS, HTML and CSS through validators and beautifiers throughout development to make sure I kepts my code clean and readable and also avoiding trying to fix multiple 
errors within my code all at once. This approach helped me manage my time on the project better. I also broke down all my code into smaller files to be accessed by the specific page,
I found this an easier way to keep everything more readable as I found both the CSS and JS files were rather large, this also meant I was able to only have code relevant to the page present in the sources.

My site is responsive on multiple media devices and viewports. I used googles DevTools to test all the different viewport resolutions, I also did this on Opera and firefox.
Over all the different browsers, devices and viewports I only found the data displayed on the homepage carousel displayed incorrectly, to fix this I added a few media queries 
and had it displaying as I wanted. I also checked to see if it was correctly displaying by viewing on my personal mobile and everything was working as expected.

All external links have been manually tested, they all open up a new tab in the browser and work correctly by sending the user to a useful site.

Here are a few of the processes I went through to manually test my code:

1. NavBar:
    1. Throughout development I checked all links would respond correctly. By clicking links I was able to confirm this.
    2. Next I went into Devtools and turned on mobile emulation to confirm the Toggler button appears, I would click to confirm the button worked correctly.
    3. Once the links were displayed I clicked each to confirm the navbar opened the page and closed the navbar as intended.
    4. I also checked all available viewports within devtools to makes sure it displayed correctly.
    5. Social links were also checked to makes sure they opened a new tab and of course the correct page.
    6. All tests came were a success and I cannot recall any issues throughout development.

2. Footer:
    1. My footers navigation works as intended when clicked.
    2. Once the Quick Links had been selected I tested to see if they opened the correct pages in new tabs.
    3. I tested each viewport size to see if it resonsed as expected.
    4. All tests were successful and no errors except with styling occured.

3. Responsivness:
    1. I went to Devtools on chrome and chose various viewports, checked to see any display issues.
    2. If issues were discovered I would use Unicorn Revealer to see any hard to find padding / margin issues.
    3. If data did not display properly I added relevant media queries or edited javascript or content until it was correct.
    4. I then chose the responsive option on the viewports and checked as many resolutions as possible.
    5. I repeated the processes for any errors in what was displayed.
    6. I also checked the responsiveness on my personal iPhone and work Android as Devtools I find is not always 100% correct.
    7. If any errors did occur I corrected them accordingly.

4. Contact form:
    1. I went to the Contact form links, both the footer and the navbar links.
    2. I tried to submit the empty form and an error message about the required fields appears. 
    3. I tried to submit the form with a different array of invalid emails and the relevant error message appears.
    4. I tried to not input a name and submut the form and again the correct error appears.
    5. I then submitted the form with all inputs valid and it suppied me with the correct success response. 
    6. Finally I went to my emails to confirm this has infact been a success.

5. Forwards, back and refresh buttons (Rockets / Dragons Pages):
    
        `Tested due to a bug explained in Bugs Section it is still not 100% ideal but
        it now does not break the back, forward and refresh buttons`
    1. I went over to the Rockets page and I selected a rocket to display that rockets data.
    2. I First press back and am taken back to the Rockets main pages as I expected.
    3. I then press forwards and I am not given a new page as I again expect.
    4. I then go back to the same rocket and try the refresh button, I am then given the main rocket page as I expect.
    5. Finally I repeat for all rockets and then for the Dragons also.

6. Pagination (Prev / Next buttons)
    1. On the launches page I first check to see if a prev button is visable, it was not which is what I expect.
    2. A next button was available which I can click to recall a new endpoint to display new data, which again works correctly.
    3. I then press next until it disappears. The last few cards are displayed again as expected.
    4. To test if the page will add a new next button when the data is updated by spacex I pushed 4 objects to the array to make 11 items (The amount needed to display a next button)
    5. I then reload the page and select next again until it disapears, the new page now displays the 4 new objects on there own as expected (This will be a single object once the data has been updated.) 

7. Error modal
    1. I could not get this to display on its own so I had to force the error response by breaking the endpoint URL.
    2. After that I then loaded the page which had the incorrect endpoint and the error modal appeared.
    3. I was able to close the modal and use the  rest of the site as expected.
    4. I reloaded the page and on the error modal I was able to refresh the page as expected also.

### Bugs

- During development I realised early on that users would not be able to use the browsers forwards and back button. This is unavoidable due to the way I had coded my Javascript,
I was thinking of leaving it as it was but as I progressed I decided this was not good user experience as if they were to use the forwards and back browser buttons this would lead to
undesired effects.
- A few times when developing and using my website if I clicked links to quickly this could lead to the previous API's call data not being removed and displaying it below the new API calls Data.
Obviously this is undesirable and was fixed by placing all the separate API calls and the associated functions within their own js files and only placed them within the relevant HTML page.
- Due to only having a single page for Rockets and Dragons and not creating specific page for each I had managed to break the forwards and back buttons as I was not creating a new history item.
I fixed this by using the history API to add a history item to the browser, Users can now use the forwards and back buttons and refresh without taking them to the previous viewed URL.
- For some reason the carousel on the rockets and dragon pages do not automatically slide. I have not found a fix for this but this is only a small bug.
<p align="right">
  <a href="tom-jones-personal-portfolio---first-milestone-project">Back to Top :arrow_heading_up:</a> 
</p> 

## Deployment

I have currently deployed my Portfolio on GitHub Pages using the master branch. It can be viewed on https://kushberrycream.github.io/spacex/, this will eventually be accesible from my own domain. 
The site will update on all new commits to the master branch. I use `git commit` to commit to the local repository and the use `git push` to send any changed to the master branch. 

### Deployment on GitHub Pages
1. Firstly I went to my setting in my Repository.

2. I then scrolled down to "GitHub Pages" 

3. Using the source menu I then selected the master branch.

### Cloning the Repository
To run this repository locally:

1. Click "Clone or Download" at the top of this repository 

2. Copy the URL to your clipboard. 

3. Open up Terminal and select the location in which you wish to clone this      directory 

4. Then copy `git clone https://github.com/kushberrycream/spacex.git` 

5. Press enter and you will have succesfully cloned this Repository. 

<p align="right">
  <a href="tom-jones-personal-portfolio---first-milestone-project">Back to Top :arrow_heading_up:</a> 
</p> 

## Credits

### Content
All the content has been obtained via the [SpaceX API](https://docs.spacexdata.com/?version=latest). 

### Media
- The main background came from [PSD Graphics](https://www.psdgraphics.com/backgrounds/night-sky-stars-background/)
- SpaceX placeholder patch was taken from [SpaceX Twitter](https://twitter.com/SpaceX/photo)
- Error Image was sourced from [Twitter](https://pbs.twimg.com/media/DUATAXAXUAE4nF9?format=jpg&name=large) and error message added by me

### Acknowledgements

- [Programmable Web](https://www.programmableweb.com/) helped me decide which API to use.
- I used a few [YouTube videos](https://www.youtube.com/watch?v=aISMFLKUC8o) to help me understand API's a little more it also introduced me to Axios 
- I needed to know how to stop a function being called on another page but I didnt want to make another js file. To do this I found this [Stack Overflow](https://stackoverflow.com/questions/4597050/how-to-check-if-the-url-contains-a-given-string)
thread.
- I wanted to make some floating labels for my contact form as I think this is gives good user experience. I used this example on [Medium](https://medium.com/@imjuangarcia/floating-labels-using-patterns-to-boost-your-contact-form-conversions-3f7a040e7efb)
to help me get my desired effect.
- I used [CSS Script](https://www.cssscript.com/css-responsive-tab-view-using-flexbox-model/) and [CSS Tricks](https://css-tricks.com/accessible-simple-responsive-tables/) to help me display Launch and Land site data responsively.
I liked the way that tables displayed data clearly in rows and columns whilst maintaining sizes no matter what the size of the content and I found I was unable to do this easily any other way.
The combination of the two tutorials helped me achieve my desired goal.

<p align="right">
  <a href="tom-jones-personal-portfolio---first-milestone-project">Back to Top :arrow_heading_up:</a> 
</p>