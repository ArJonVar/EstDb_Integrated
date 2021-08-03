# EstDb_Integrated

Welcome to EstDb_Integrated! This is the code for the Estimating Database Project.

just to orient--

est_db is the folder with settings.py, main urls.py, etc...

frontend is the react/readux-toolkit app (totally running in django), and it uses webpack to compile. 
   Inside frontend/src/features is an Oauth folder which contains auth.js which runs on Node.js and starts the Oauth Flow.
   frontend has a urls.py folder, but the main router is a react router located in App.js
   
restapi is the backend app (and is a django api)
   restapi has a local router in urls.py that uses the restapi routing capabilities, which "registers routes".
   routes that are registered automatically have a main page, as well as an additional integer slug that indexes each individual database entry based on PK (like ID)



NOTE: before using github, I used versioning of files to save changes, so any file with a version number means it is outdated.
