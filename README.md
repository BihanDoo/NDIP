##SA NUMBERS
SA25610103 S G B Sathmira
Sa25610068 B.w.d.s.wijenanda
SA25610069 A.M.Hapugaswatte
SA25610134 W.V.P.B.P Wijerathna
SA25610217 S D Edirimanna
SA25610231 M.A.Muhammed



## Install Node.js

download & install from <a href="http://www.nodejs.org" >http://www.nodejs.org </a>  
couldn't remember how i did the installation, but leave everything default and you'll be fine  

you'll see an application is installed when searching Node on windows search bar, open it  
boom! command line!  
that means you have installed Node.JS  
(now close it)  
### clone the repo
`https://github.com/BihanDoo/NDIP.git`  or
`git clone https://github.com/BihanDoo/NDIP.git`  

### important- do not run the root folder yet, as the assignment is not complete, instead, continue to install mongodb and run the <a href="https://github.com/BihanDoo/NDIP/blob/main/README.md#to-try-out-the-basics">dump1 file</a>  
>to run, open a terminal in vs code, (make sure ur using the correct folder)  
type the following  
`node index.js`  
then hit enter  
>important! dont be panic if the command line looks stuck, but it's not. it has created a socket-like thingy to access it as a server.  
to exit, press `Ctrl+C`



Install MongoDB
-------------------
Download the windows msi from here:  
<a href="https://www.mongodb.com/try/download/community">https://www.mongodb.com/try/download/community</a>  
1. Select Complete setup.
2. Keep "Install MongoDB as a Service" checked
> This makes MongoDB automatically run in the background.
3. Leave default service name/settings.
4. Keep MongoDB Compass checked (optional but useful GUI tool).

Click Install.  

### install the shell (mongo shell)  
Download it from here  
<a href="https://www.mongodb.com/try/download/shell">https://www.mongodb.com/try/download/shell<a/>    
Make sure you select **msi file** instead of the zip file.

> the MongoDB service will be running after the installation.

To check it, open command prompt and type  
`mongosh`  
then hit enter
> you'll see `test>`


To try out the basics
-----------------------

#### now open the dump1 folder in the cloned project folder on VS Code
after running mongosh in the previous one, type the following  
`use school`  
hit enter  
you should see this  
<img width="341" height="114" alt="image" src="https://github.com/user-attachments/assets/b016aa2f-16c2-4ef3-99c0-a90a6856117d" />  
then type  
`db.students.insertMany([
       { id: 1, name: "John Doe", age: 22 },
       { id: 2, name: "Jane Smith", age: 20 },
       { id: 3, name: "Sam Brown", age: 23 }
   ]);`  
and hit enter  

after that, open mongodb compass  
you'll see this  
<img width="50%" height="557" alt="image" src="https://github.com/user-attachments/assets/5f8777ca-cf82-4b53-9465-17332e606fd0" />

>database is now initialized, which is running on port `27017`

open VS code, make sure you are in the **dump1** folder, open a new terminal window and 
type the following

`node app.js`  
then hit enter  
>important! dont be panic if the command line looks stuck, but it's not. it has created a socket-like thingy on port 3000 to access it as a server backend.  
if you want, you can exit the process by pressing `Ctrl+C`,
  
after that, go to index.html and open it as live server. feel free to mess around with those values and see how it changes in this dump folder  
 
>total ports allocated:  
MongoDB `27017`  
NodeJS BackEnd `3000`  
Live server (if running) `5500`  


initialize the nodejs package (if starting out fresh-from scratch):
----------------------------------------------------------------
package is already created so don't do this on the files on the github repo,
  
however if you are starting out fresh, do the following...   



open a blank folder in vs code and open a new terminal  
type the following  
`npm init`  
give it all test values  

example:  
package name: (dump1) dumpp  
version: (1.0.0)  
description: testestestestestestesetsetstestestes  
entry point: (index.js)  
test command:  
git repository:  
keywords:  
author:  
license: (ISC)  
type: (commonjs)  
is this OK?(yes)    

> this will create a package.json on the folder

> install these services:


`npm install express -save`

`npm install --save body-parser`

`npm install -g nodemon`

`npm install cors`

  
>to connect with mongoDB

`npm install mongodb`


  

add your code to a js file (for backend) and html file for the UI.

