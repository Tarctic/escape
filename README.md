# escape


### Introduction:

I've been working on the project for quite a while, especially the layered, complex js of the game's functionality. My original plan was to create an elaborate game with subtle clues, and this was only supposed to be a prototype to see if all those elements worked which I planned to include in the main game. However, this ended up taking way more time than expected with university and other courses, and I realized I had to complete it before the time ended (I started CS50w last June!). However, I plan to continue to create the original game at my own pace. If this project fails, I hope I can receive clear feedback, so that I can improve in those areas.


### Distinctiveness and Complexity:

Escape is neither a social network nor an e-commerce site, but is a site for a particular game of the same name. The main complexity of the website lies in it's JavaScript code, which largely includes the game's functionality. 


### What's contained in each file:

#### JS files:
- *game.js*:

    Main functionality of the game.

    Contains nearly all the code of the game's working. [Full description](https://github.com/me50/Tarctic/edit/web50/projects/2020/x/capstone/README.md#detailed-working-of-the-games-js-code) is given below.

#### Python files:
- *views.py*:

    The background part of saving the game. Sends information back and forth to db and js files.

    Contains five views:
    1. index: Loads the main page along id and username of the user for [game.js](https://github.com/me50/Tarctic/edit/web50/projects/2020/x/capstone/README.md#js-files) to collect.
    2. login_view: Collects username and password from POST request and uses authenticate() method to check if the username exists and if the password is correct. If the method returns a User object, the user is redirected to the index page. Otherwise, if it returns None, an error message is shown. If the request is not a POST request, the login page is rendered again.
    3. logout_view: Logs the user out using logout() method, then redirects the user to the main page.
    4. register: Collects username, email, password and password confirmation from POST request and then checks if the password confirmation matches the password entered. If it does not, then an error message is shown. If it does, a User object is created and saved. If the the username already exists, the user is notified about the error. Then, a Profile object is created and saved using the previously created User object as foreign key identifier. The user is then logged in and redirected to the main page. If the request is not a POST request, the register page is rendered again.
    5. save: The Profile object of the current user is retrieved fro the database. If the retrieval fails, then an error message is shown. If the request method received is GET, then the value of the progress variable of the current user's Profile object is sent to the game.js file using JsonResponse() method. 

    If the request method is POST, the progress number sent through fetch request from game.js is collected and saved to the user's Profile object. A HttpResponse indicating success is then returned. 


- *models.py*:

    Contains two models:
    1. User: Uses AbstractUser to create a custom User model instead of the default one.
    2. Profile: Contains a foreign key attribute pointing to a User object and another attribute that stores a value indicating user progress.
- *urls.py*:

    Contains the urlpattens list storing five url paths for the main page, logging in, logging out, registering user and saving progress.

#### CSS files:
- *styles.css*:

    Contains code for styling elements and making them more responsive in html and js files.
#### HTML files:
- *layout.html*:

    Template for other html files.

    Contains links for styles.css, bootstrap, react, babel, and fonts along with csrf_token in the head section. 

    In the body section, the basic design of the website is implemented with links to different parts of the website.
    
- *index.html*:

    Main page of the website where the code contained in game.js runs.
- *login.html*:

    Interface for user to login. 

    Contains a form that asks for username and password along with a submit button. A div is placed to display any error. A link to the register page is given at the bottom for those who do not have an account.

- *register.html*:

    Interface for user to register.

    Contains a form that asks for username, email, password and password confirmation along with a submit button. A div is placed to display any error. A link to the login page is given at the bottom for those already have an account.    


### How to run the application:

**Walkthrough:** https://www.youtube.com/watch?v=VIXXDsf2XkE

**Basic:** Make sure you have django, react, python installed. From cmd, go into main directory and run `python manage.py runserver`. In a new browser, go to https://127.0.0.1:8000

**Log in:** You can either log in and play or play as an anonymous user. In the case of latter, progress will not be saved. If logged in, you can choose to start a New Game or Continue from where you left off. 

**Gameplay:** On clicking New Game, a room is shown with a stickman kid and some objects. Clicking the dustbin gives you a key which is stored in the inventory at the bottom of the game window. Clicking on the key highlights it, showing that it is currently in use. While the key is highlighted, click on the left door. Stickman is now in a hallway with a painting on the wall, which when clicked moves to show a secret compartment behind it. When the piece of paper in the compartment is clicked, it is stored in the inventory. Clicking on the paper in the inventory reveals its contents, which is a word - 'PGBDYU'. Then, clicking on the left arrow key reveals another portion of the hallway, where a stickman with glasses stands. You cannot move past him without giving him the right answer. When 'PGBDYU' is entered, you are allowed to leave. Game over.


#### Detailed working of the game's JS code:
The primary component in the JS file is &lt;App /&gt; which contains two smaller components &lt;Start /&gt; and &lt;Main /&gt; for the start menu and the main game respectively. Start menu has 3 buttons: New Game, Instructions and About. If the user is anonymous, a 'Login' button is included. If the user is logged in and has saved progress, a 'Continue' button is included. 

On loading the main page, a fetch request is sent to get the user progress, if user is logged in. This is to determine which buttons to display on the main menu and for setting the right panel, which will explained below. Only the &lt;Start /&gt; component is loaded first. After it has loaded, if the user is logged in and clicks 'New Game', &lt;Main /&gt; component is loaded, which sets the game state to 0, which means that the game will start from the beginning. 

The background and all the objects of panel 1 of the game is loaded which may or may not be interactable. The background variable is stored in a state and a single background div accesses this state. When a specific button or div is clicked, the state is changed, which then changes the classname of the div, thus changing the background. 

Similarly, another state holds a list of string values, each corresponding to an object in the game. If the object name is included in the state, the corresponding div or button is loaded with a classname pointing to its css. All interactable objects have an onclick function, which then triggers other functions to add/remove objects to/from the screen (delAddObj), add/remove items to/from the inventory (addToInv, delFromInv) or to change the panel (panel1, panel2 etc.). 
Objects also include speech bubbles. Speech bubbles have additional states such as text and speaking and a function (say) which implements both. Text state is to use multiple phrases in the same div and speaking state is to determine whether there already is a speech bubble, so that only one speech bubble is displayed at a time. However, the function say() uses delAddobj function, and for some reason, this function cannot be repeated twice in the same onClick. This is why those divs which already call delAddObj(), use setText spearately instead of using say().

The game also includes a form to submit answer entered by the user in one part of the game. The entered answer is then compared with the actual answer, and if it is right, another function is called which displays the end of the game.

The ending displays a GIF with a timeout of 10 seconds matching the end of one loop in the GIF. After the timeout, the GIF is replaced by an image along with a button to go back to main menu.


#### Additional information:
Some in-game objects require multiple clicks to respond.
