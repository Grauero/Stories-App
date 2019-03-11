# Stories-App
https://stories-app.herokuapp.com/

![landing](http://i.piccy.info/i9/aec19b8870c9b60dbdaec1507d5f2e64/1552313757/33389/1306796/stories_landing.jpg) 
Stories application built on Node+Express+Handlebars

Authenticated users can create public or private stories, view other users stories and comment them

Registration/Authorization done with Google OAuth 2.0 strategy

All HTML pages are rendered on server and served to client

Application audit with Google Chrome audits on mobile devices with simulated fast 3G, 4x CPU Slowdown:
- /stories page: ![stories](http://i.piccy.info/i9/1e357bbcd836927a2f323d0a86633be8/1552313825/13108/1306796/stories_stories_page_mobile_simulatedFast3G.jpg)

- /show page: ![stories/show](http://i.piccy.info/i9/6e8724b202b86536e8ff8e5043c0caff/1552313872/13259/1306796/stories_stories_show_page_mobile_simulatedFast3G.jpg)


## Application features:
### - all users can view public stories
  
![stories](http://i.piccy.info/i9/a27023df53b008a15e18bcf4b877eeea/1552313954/65723/1306796/stories_stories.jpg)



### - users can manage their own stories

![dashboard](http://i.piccy.info/i9/742a33ab2f4659bcb351d7a1574d6884/1552313993/33571/1306796/stories_dashboard.jpg)
  
 
 
### - authenticated users can view single stories and leave comments on them
  
 ![stories/show](http://i.piccy.info/i9/38f2e103e3fa5530c304d903f61007a9/1552314102/147487/1306801/stories_show.jpg)

## Scripts:
  - ```npm run dev``` - to launch local dev-server

### Used tools:
  1. [Node](https://nodejs.org/) + [Experss](https://expressjs.com/) + [Handlebars](http://handlebarsjs.com/)
  2. [MongoDB](https://www.mongodb.com/) for database
