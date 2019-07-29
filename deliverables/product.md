# UofT Course Copilot

<!--
 > _Note:_ This document is meant to evolve throughout the planning phase of your project.    
 > That is, it makes sense for you commit regularly to this file while working on the project (especially edits/additions/deletions to the _Highlights_ section).
-->
#### Q1: What are you planning to build?

We are planning to build a course rating and review database platform, especially for the University of Toronto. Our platform for courses is similar to IMDB for movies or ratemyprofessors.com for professors.

Key features of our platform include:
* A detailed page for each course in the university, where users can view and contribute rating (from 1 star to 5 stars) for the course. The users can also browse, post, and rate (like / dislike) comments for the course. The overall rating is calculated and displayed based on the individual ratings. By default, most-liked reviews for a course are displayed on top.
* The page also displays other general information for the course, which allows the platform to not only be a review website, but also a general course information database.
* A page for each professor in the university, which cross-references the courses that the professor teaches, and vice versa. This allows the users to get a better picture of the quality of the professor.
* Viewing the information will not require user login. To post comments and ratings, users can easily log in using Facebook or Google accounts.

<!--
 * Short (1 - 2 min' read)
 * Start with a single sentence, high-level description of the product.
 * Be clear - Describe the problem you are solving in simple terms.
 * Be concrete. For example:
    * What are you planning to build? Is it a website, mobile app,
   browser extension, command-line app, etc.?      
    * When describing the problem/need, give concrete examples of common use cases.
 * Focus on *what* your product does, and avoid discussing *how* you're going to implement it.      
   For example: This is not the time or the place to talk about which programming language and/or framework you are planning to use.
 * **Feel free (and very much encouraged) to include useful diagrams, mock-ups and/or links**.
-->

#### Q2: Who are your target users?

Our target users are university students and professors at UofT. We are aiming at the following types of users:
* students who are trying to find recommendations and peer’s opinions about courses to help them decide which ones to take;
* students who have taken some courses and would like to share their opinions;
* professors who would like to see feedback from students in their courses.

Personas:

* Pony Ma, First-year Math Student: “I am thinking about taking some interesting courses. I want to take CSC108, but I am afraid it’s too hard. I would like to know what other people think.”
* David Heap, Third-year Computer Science Student: “I had a bad experience with a professor. I have to warn other students about it.”
* Mark, Professor in the Department of Computer Science: “I worked so hard on teaching this course well, I would like to see if the students liked it.”

<!--
 * Short (1 - 2 min' read max) * Be specific (e.g. )
 * Feel free (but not obligated) to use personas.        
   You can create your personas as part of this Markdown file, or add a link to an external site (for example, [Xtensio](https://xtensio.com/user-persona/)).
-->


#### Q3: Why would your users choose your product? What are they using today to solve their problem/need?

Our product is a platform for course reviews that help users plan which courses to take. It solves a constantly re-occurring problem for university students -- obtaining critical and quality information about courses in order to make a better decision -- directly and effectively.

As of today, students use the following methods to solve the same problem:
* Asking their friends who have taken the course to get their opinions;
* Search or post on Reddit for course review posts;
* Find the professor of the course and use www.ratemyprofessors.com.

However, none of the currently used methods directly solves these problems:
* It might be hard to find personal friends who took the course before;
* Reddit contains a lot of information and posts which are irrelevant, and useful reviews are scattered and hard to discover;
* The quality of a course remains consistent while the professor for that course changes frequently, hence using the rating for professors as a metric to measure course quality is inaccurate.

These are the primary reasons that make our platform unique and better suited for the problems. 

<!--
 * Short (1 - 2 min' read max)
 * We want you to "connect the dots" for us - Why does your product (as described in your answer to Q1) fits the needs of your users (as described in your answer to Q2)?
 * Explain the benefits of your product explicitly & clearly. For example:
    * Save users time (how much?)
    * Allow users to discover new information (which information? And, why couldn't they discover it before?)
    * Provide users with more accurate and/or informative data (what kind of data? Why is it useful to them?)
-->

----

### Highlights

1. Some alternative projects we have considered while trying to decide the product plan are: a course timetable scheduling tool, and a smart course suggestion and planning system. Ultimately, we decided on our current idea because of the following reasons:
    * There already exist good course timetable scheduling tools (such as griddy.org).
    * Smart course recommendation system is subjective and requires heavy technical research, which would be infeasible for us to implement a viable product.

2. We have decided to make our platform free for all users, as opposed to a paid membership of some similar platforms. We may consider advertisement as the source of income in the future. The reason for this decision is that paid access to this type of service will dramatically reduce the number of users, and our service requires a large number of users to have quality reviews. Moreover, it also helps the students save money.

3. We have decided to use a custom algorithm for calculating an overall rating, as opposed to the arithmetic mean. As we know the course reviews contain certain bias: students who did poorly in the course have a stronger inclination to comment than their counterparts. We thus decided to come up with an algorithm regarding this issue and to reduce statistical inaccuracy.



<!--
Specify 3 - 5 key decisions and/or insights that came up during your meetings
and/or collaborative process.

 * Short (5 min' read max)
 * Decisions can be related to the product and/or the team process.
    * Mention which alternatives you were considering.
    * Present the arguments for each alternative.
    * Explain why the option you decided on makes the most sense for your team/product/users.
 * Essentially, we want to understand how (and why) you ended up with your current product plan.
-->

