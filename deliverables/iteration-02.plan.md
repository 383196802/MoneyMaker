
# UofT Course Copilot

## Iteration 02

* Start date: Oct.15 
* End date: Nov.02

## Process

#### Roles & responsibilities

* Organizer: Zeming Xiang;
* Get Data from Cobalt API: Wenjie Hao;
* Data Model and Simple Database: Zeming Xiang, Suting Zhang, Muyuan Cao;
* API and Route for Client: Zeming Xiang;
* Course List and Search: Zeming Xiang, Xinqi Shen, Yilin Qu, Mingrui Han;
* Course Page: Xinqi Shen; Zeming Xiang, Yilin Qu, Wenjie Hao;
* Writing script: Shuting Zhang;
* Screen capture: Mingrui Han;
* Voice synthesis: Wenjie Hao;
* Video editing: Yilin Qu, Xinqi Shen;

[Trello Board link](https://trello.com/b/fVMJtc2k/csc301-project)

<!--
Describe the different roles on the team and the responsibilities associated with each role.
-->
#### Events

Describe meetings (and other events) you are planning to have:

* Oct 15th, deciding the basic structure & assigning tasks to every team member & coding session, BA2145; 
* Oct 20th, coding session(design website layout and login page), BA3200;
* Oct 22nd, coding session(front-end programming and getting uoft course data from website), BA2145;
* Oct 29th, coding session(wrapping up code and improving the design and readability of our code), BA2145;
* Oct 30th, recording demo video, BA;
* Oct 31st, editing video, BA3200；
* Nov 1st, review meeting, BA3200.

<!--
 * When and where? In-person or online?  
 * What's the purpose of each meeting?  
 * Other events could be coding sessions, code reviews, quick weekly sync' meeting online, etc.
-->


#### Artifacts

We used the Trello Board to post the project outline and tasks. We also used it to keep track of our progress. 
We ordered the tasks according to their relevances with our goals (MVP products, Data model & database).
Every team member picked the tasks on the Trello Board by themselves.

[Trello Board Link](https://trello.com/b/fVMJtc2k/csc301-project)

<!--
List/describe the artifacts you will produce in order to organize your team.       

 * Artifacts can be To-do lists, Task boards, schedule(s), etc.
 * We want to understand:
   * How do you keep track of what needs to get done?
   * How do you prioritize tasks?
   * How do tasks get assigned to team members?
-->
#### Git / GitHub workflow


Different parts are distributed to different individuals, and are decoupled in terms of their file location. For front-end development and user interface, the code mainly happened in the `static` folder. Backend files are stored in `models` and `routers` folder. Developer scripts such as for API data retrieval are stored in `scripts` folder.

By modularizing our tasks, we integrate strongly interdependent tasks, while the interdependencies between the modules are weak. Therefore, we can avoid multiple people working on the same file at the same time. This ensures our team members share a codebase and avoid conflicts.

Hence, our final workflow involves working on and committing to a single repository, and we have elected a team member to manage this repository, and decide on making and merging pull request from the central work repository to course repository.

<!--
Describe your Git / GitHub workflow.     
Essentially, we want to understand how your team members share a codebase and avoid conflicts. You must incorporate 'Pull Requests' into your process. 

 * Be concise, yet precise.      
For example, "we use pull-requests" is not a precise statement since it leaves too many open questions - Pull-requests from where to where? Who reviews the pull-requests? Who is responsible for merging them? etc.
 * If applicable, specify any naming conventions or standards you decide to adopt.
 * Don't forget to **explain why** you chose this workflow.
-->

## Product

#### Goals and tasks
The main goal for this iteration is to finish an MVP product that user can:
* Get into the course page which contains the course description, rating and reviews and professors for the the course they select;
* Add reviews and comments for a course;
* Search for the courses that they are interested in the rating and reviews.



<!--
 * Describe your goals for this iteration and the tasks that you will have to complete in order to achieve these goals.
 * Order the items from most to least important.
 * Feel free (but not obligated) to specify some/all tasks as user stories.
-->

#### Artifacts
* Build a functional server and front-end on localhost that reaches the basic goals we had, which enable us to set the final goal and work towards it.
* Record the demo video to present the website we’re going to build, which would allow us to introduce our product.
<!--
List/describe the artifacts you will produce in order to present your project idea.

 * Artifacts can be text, code, images, videos, interactive mock-ups and/or any other useful artifact you can think of.
 * Make sure to explain the purpose of each artifact (i.e. Why is it on your to-do list? Why is it useful for your team?)
 * Be concise, yet precise.         
   For example: "Build the website" is not precise at all, but "Build a static home page and upload it somewhere, so that it is publicly accessible" is much clearer.
-->
