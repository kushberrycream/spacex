# SpaceX API Website - Second Milestone Project
**Stream Two Project: Interactive Frontend Development - Code Institute**

## Introduction
This is a Website calling the SpaceX API. The Website Fetches the data provided by SpaceX and displays it on
across multiple different pages. This Website will show what I have learnt over the last couple of modules and
provide an insight into what I am able to do with API's and Javascript.

## Demo
Click the image below for a live Demo of the Website.

## Contents
- [Introduction](#tom-jones-personal-portfolio---first-milestone-project)
- [Demo](#demo)
- [UX](#ux)
    * [Strategy](#strategy)
    * [Scope](#scope)
    * [Structure](#structure)
    * [Skeleton](#skeleton)
    * [Surface](#surface)
- [Features](#features)
    * [Existing Features](#existing-features)
    * [Features Left to Implement](#features-left-to-implement)
- [Technologies Used](#technologies-used")
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
The main goal of my website is to provide any users with a clear and easy to use site which provides information
obained from the SpaceX API. I have have kept the Design Minimalistic to give a good user experience by displaying
the data in a uniform and ledgable layout.

### Scope
| User | User Stories |
| ------ | ------ |
| SpaceX Fans | As a SpaceX fan I want to be able to view as much Information about SpaceX as possible, Upcoming Launches, Previous Launches, Types oF Rockets etc. |
| People intrested in Space Flight | As someone intrested in Space Flight I want to be able to see any upcoming Launches and any data on those launches. Also any information on how to watch launches.  |
| Astronomers | As an Astronomer I want to be able to see Upcoming Launches and information on what is being launched, previous launches and also what has been launched and finally information on the Rockets used to launch the payloads. |

SpaceX fans are able to view a vast array of data in a clear and ledgable format. They can see any a great amount of 
data about upcoming launches, previous launches and the various rockets and dragons. (Vehicle attatched to the rocket)  


### Structure
The site is actually only two pages, the main data page (index.html) and also a contact page. The page will update according to which navigation link
is clicked giving the impression of a multipage site, I have provided an alert to the users to say using the back button may have undesired effects and 
to only use the navigation links. 

### Skeleton
[Landing Screen](https://github.com/kushberrycream/spacex/blob/master/assets/wireframes/Landing%20_%20Home%20Screen.png?raw=true) &nbsp;&nbsp;:rocket:&nbsp;&nbsp; [Home Screen (Below Landing)](https://github.com/kushberrycream/spacex/blob/master/assets/wireframes/Home%20Screen%20(Below%20Landing).png?raw=true) &nbsp;&nbsp;:rocket:&nbsp;&nbsp; 
[All Rockets Screen](https://github.com/kushberrycream/spacex/blob/master/assets/wireframes/Rockets%20Screen.png?raw=true) &nbsp;&nbsp;:rocket:&nbsp;&nbsp; [Specfic Rocket Screen](https://github.com/kushberrycream/spacex/blob/master/assets/wireframes/Rocket%20Spec%20Screen.png?raw=true) &nbsp;&nbsp;:rocket:&nbsp;&nbsp; <br/>
[Dragons Screen](https://github.com/kushberrycream/spacex/blob/master/assets/wireframes/Dragons%20Screen.png?raw=true) &nbsp;&nbsp;:rocket:&nbsp;&nbsp; [Missions Screen](https://github.com/kushberrycream/spacex/blob/master/assets/wireframes/Missions%20Screen%20.png?raw=true) &nbsp;&nbsp;:rocket:&nbsp;&nbsp;
[Past Launches Screen](https://github.com/kushberrycream/spacex/blob/master/assets/wireframes/Launches%20Screen.png?raw=true) &nbsp;&nbsp;:rocket:&nbsp;&nbsp; [About SpaceX and Website Info Screen](https://github.com/kushberrycream/spacex/blob/master/assets/wireframes/about-screen.png?raw=true) &nbsp;&nbsp;:rocket:&nbsp;&nbsp;
[Contact Page](https://github.com/kushberrycream/spacex/blob/master/assets/wireframes/Contact%20Page.png?raw=true) &nbsp;&nbsp;:rocket:&nbsp;&nbsp;
 
### Surface


<p align="right">
  <a href="#tom-jones-personal-portfolio---first-milestone-project">Back to Top :arrow_heading_up:</a> 
</p>

## Features

I have used Bootstrap as the HTML and CSS Framework to help me develope a responsive mobile-first website. The Majority of the page is written in 
VanillaJS as I wanted to showcase what I can do with Javascript, I have also implimented jQuery in a few places but this is quite minimal.
I have also used a few js libaries such as accounting.js as this was alot simpler than writing code to format currency correctly, I also used moment.js to 
format UTC dates as I didnt want to complicate my code by trying to format dates with my own code.

### Existing Features


### Features Left to Implement


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
    - JavaScript is the main technology used it allows me to provide data to my users.
- [Axios](https://github.com/axios/axios)
    - Axios allows me to make XMLHttpRequests with a single line of Code.
- [EmailJS](https://www.emailjs.com/)
    - I have used EmailJS so my Contact form works and sends me Emails.
- [Moment.js](https://momentjs.com/)
    - I used Moment.js to help me format the dates better and without the use of extra Javascript.
- [Accounting.js](https://github.com/openexchangerates/accounting.js/)
    - I have used Accounting.js to format all the sums of money obtain from the API.
- [Bootstrap 4](https://getbootstrap.com/)
    - I have used the Bootstrap Framework and multiple components with my own CSS styles to
    create a great User Experience.
- [Font Awesome](https://fontawesome.com/)
    - Font Awesome was used for any icons I needed.


<p align="right">
  <a href="#tom-jones-personal-portfolio---first-milestone-project">Back to Top :arrow_heading_up:</a> 
</p>

## Testing

I have passed my javascript code through the linter [jsHint](https://jshint.com/). I found no errors I only have undefined variables that are defined in the 
various libaries I am using. It also says I have unused variables but these are infact used when clicking buttons on my page.

I used [W3 Validators](https://validator.w3.org) to check for any errors within my HTML and CSS and both passed. Originally I was using the `<option>` element 
as my navigation buttons as this worked for what I needed. The validator let me know this wasnt the correct usage, so I replaced these with buttons and restyled them so
they still looked the same.

### Bugs

- During development I realised early on that users would not be able to use the browsers forwards and back button. This is unavoidable due to the way I had coded my Javascript,
I was thinking of leaving it as it was but as I progressed I decided this was not good user experience as if they were to use the forwards and back browser buttons this would lead to
undesired effects.
- A few times when developing and using my website if I clicked links to quickly this could lead to the previous API's call data not being removed and displaying it below the new API calls Data.
Obviously this is undesirable but can be corrected by using the navigation buttons or refreshing the page.

<p align="right">
  <a href="tom-jones-personal-portfolio---first-milestone-project">Back to Top :arrow_heading_up:</a> 
</p> 

## Deployment



<p align="right">
  <a href="tom-jones-personal-portfolio---first-milestone-project">Back to Top :arrow_heading_up:</a> 
</p> 

## Credits

### Content
All the content has been obtained via the [SpaceX API](https://docs.spacexdata.com/?version=latest). 

### Media
- The main background came from [PSD Graphics](https://www.psdgraphics.com/backgrounds/night-sky-stars-background/)
- SpaceX placeholder patch was taken from [SpaceX Twitter](https://twitter.com/SpaceX/photo)

### Acknowledgements

- [Programmable Web](https://www.programmableweb.com/) helped me decide which API to use.
- I used a few [YouTube videos](https://www.youtube.com/watch?v=aISMFLKUC8o) to help me understand API's a little more it also introduced me to Axios 
- I needed to know how to stop a function being called on another page but I didnt want to make another js file. To do this I found this [Stack Overflow](https://stackoverflow.com/questions/4597050/how-to-check-if-the-url-contains-a-given-string)
thread.

<p align="right">
  <a href="tom-jones-personal-portfolio---first-milestone-project">Back to Top :arrow_heading_up:</a> 
</p>