# UofT Course Copilot

<!--

 > _Note:_ This document is meant to be written during (or shortly after) your initial planning meeting.     
 > It does not really make sense for you to edit this document much (if at all) while working on the project - Instead, at the end of the planning phase, you can refer back to this document and decide which parts of your plan you are happy with and which parts you would like to change.
-->

## Iteration 03

 * Start date: Nov.12
 * End date:  Nov.30

## Process

#### Changes from previous iteration
* The way we assign tasks to team members: We’re going to assign all tasks at the planning meeting taking both personal interests and workload into consideration.
* The way we moduralize our project: We are going to make it clearer regarding each team member’s responsibility, trying to avoid the problem of not being able to combine our modules in the end.
* The way we meet: We are going to meet more often before the deadline is approaching so that we get more flexibility if we decide that we need to change our plan. 

<!--
 * At most 3 items
 * Start with the most significant change
 * For each change, explain why you are making it and what you are hoping to achieve from it
 * Ideally, for each change, you will define a clear success metric (i.e. something you can measure at the end of the iteration to determine whether the change you made was successful)

 > *Note:* If you are not making any changes to your process, it means that you are happy with all of the decisions you made in the previous iterations.
 > In this case, list what you consider to be the most significant process decisions your team made. For each decision, explain why you consider it successful, and what success metric you are using (or could use) to assert that the decision is successful.
-->

#### Roles & responsibilities

* Organizer: Zeming Xiang
* Login and User Data: Zeming Xiang, Wenjie Hao, Yilin Qu, Xinqi Shen
* Database and Integration: Zeming Xiang, Xinqi Shen, Mingrui Han
* Interface and Feature Improvements: Zeming Xiang, Muyuan Cao, Shuting Zhang, Yilin Qu
* Deploy to Internet:Xinqi Shen, Zeming Xiang
* Professor Information Data: Wenjie Hao
* Writing script: Shuting Zhang
* Screen capture:Mingrui Han
* Voice synthesis:Yilin Qu
* Video editing:Yilin Qu
 
<!--
Describe the different roles on the team and the responsibilities associated with each role.
-->


#### Events

Describe meetings (and other events) you are planning to have:
* Nov 12nd, BA 2245, plan meeting & code review for last stage; 
* Nov 14th, BA 2210, coding session;
* Nov 16th, BA 2210, coding session;
* Nov 19th, BA 2245, coding session; 
* Nov 23rd, BA 2210, code review session to modify our plan;
* Nov 26th, BA 2245,  coding session;
* Nov 27th,  BA 2210, coding session;
* Nov 28th, BA 2210, coding session;
* Nov 29th, BA 2210, video recording & editing;
* Nov 30th, BA 2210, review meeting;

<!--
 * When and where? In-person or online?
 * What's the **purpose** of each meeting?
 * Other events could be coding sessions, code reviews, quick weekly sync' meeting online, etc.
-->


#### Artifacts

We will keep using Trello Board to list the project outline and tasks. We also use it to keep track of our progress. We order our tasks according to their relevance with our goals (MVP products, Data model & database, deploy to internet). Every team member pick  tasks on the Trello Board that they would like to work on.
[Trello Board Link](https://trello.com/b/fVMJtc2k/csc301-project)
<!--
List/describe the artifacts you will produce in order to organize your team.      

 * Artifacts can be to-do lists, task boards, schedule(s), etc.
 * We want to understand:
   * How do you keep track of what needs to get done?
   * How do you prioritize tasks?
   * How do tasks get assigned to team members?
-->

#### Git / GitHub workflow


Different parts are distributed to different team members, and are decoupled in terms of their file location. Back-end files are stored in `models` and `routers` folder.  For front-end development and user interface, the code are mainly in the `static` folder. Developer scripts such as API data retrieval are stored in `scripts` folder.

By modularizing our tasks, we achieved high cohesion, while reducing the coupling between the modules. In this way, we avoid multiple people working on the same file at the same time. This ensures our team members share a codebase and avoid conflicts.

Hence, our final workflow involves working on and committing to a single repository, and we have elected a team member to manage this repository and decide on making and merging pull request from the central work repository to course repository.

<!--
Describe your Git / GitHub workflow.     
Essentially, we want to understand how your team members share a codebase and avoid conflicts.

 * Be concise, yet precise.      
For example, "we use pull-requests" is not a precise statement since it leaves too many open questions - Pull-requests from where to where? Who reviews the pull-requests? Who is responsible for merging them? etc.
 * If applicable, specify any naming conventions or standards you decide to adopt.
 * Don't forget to **explain why** you chose this workflow.
-->


## Product

#### Goals and tasks
* Transferring local data to a Database server - Mongodb:
- replace SimpleDataModel class -> with MongoDBDataModel class
- Find a supporting online hosting server for database
	- userID -> userReviews, courseID -> courseReviews
* Implement user login:
	- Implement user class
	- Be able to login with Google account
	- Store created accounts in MongoDBDataModel
* Deploy to internet:
-  Find hosting platform
* Features Improvements:
-  Adding professor information page
	-  Implement the thumb up/down buttons for each review 
	-   Implement rating only review 
	-   Deal with edge case when a course has no reviews
	-  Sort review based on likes and dislikes
	-  Use multiple pages if there are too many comments
* Interface Improvements:
	- Add an about us page 
	- Appearance enhancement


<!--
 * Describe your goals for this iteration and the tasks that you will have to complete in order to achieve these goals.
 * Order the items from most to least important.
 * Feel free (but not obligated) to specify some/all tasks as user stories.
-->


#### Artifacts
* Build the website so that users can access the website as anonymous, with their own accounts, or through third party platforms such as Google. 
* Build a database using MongoDB so to handle bulk volume of asynchronous reads/writes at the same time when scaling up.
* Record the demo video to present the website we’re going to build, which would allow us to introduce our product.


<!--
List/describe the artifacts you will produce in order to present your project idea.

 * Artifacts can be text, code, images, videos, interactive mock-ups and/or any other useful artifact you can think of.
 * Make sure to explain the purpose of each artifact (i.e. Why is it on your to-do list? Why is it useful for your team?)
 * Be concise, yet precise.         
   For example: "Build the website" is not precise at all, but "Build a static home page and upload it somewhere, so that it is publicly accessible" is much clearer.
-->
