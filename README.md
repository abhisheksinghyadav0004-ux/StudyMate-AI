# StudyMate AI

StudyMate AI is a smart study management web application designed for students of any class, course, degree, or self-learning journey. It helps learners organize their subjects, summarize notes, practice quizzes, track quiz scores, and generate weekly study roadmaps from one simple desktop-focused interface.

The project is built using HTML, CSS, and JavaScript. It is a frontend-based learning productivity tool that stores user data locally in the browser using LocalStorage.

---

## Project Overview

Students often manage notes, subjects, revision plans, and quizzes separately. StudyMate AI brings these study activities into one clean and easy-to-use platform.

The app allows a student to:

- Save their current class, course, or learning program
- Add and manage subjects
- Paste notes and generate a short summary
- Create quiz questions from notes
- Practice built-in quiz questions based on selected subjects
- Choose quiz difficulty levels
- Track correct, wrong, and attempted answers
- Generate a weekly roadmap for study planning

This project is useful for school students, college students, postgraduate students, competitive exam aspirants, and self-learners.

---

## Features

### 1. Dashboard

The dashboard provides a clean overview of the student's study workspace.

It includes:

- Project introduction
- Current course section
- Study snapshot
- Total subject count
- Study status
- Today goal
- Quick action buttons

The dashboard is designed for desktop and Windows users with a fixed sidebar layout.

---

### 2. Course Management

Users can save their current course, class, or learning goal.

Examples:

- Class 10
- Class 12
- BCA
- MCA
- B.Tech
- BA History
- NEET
- UPSC
- Self Learning

The course name is saved in the browser using LocalStorage, so it remains available even after refreshing the page.

---

### 3. Subject Management

Users can add their own subjects according to their course or interest.

Examples:

- Physics
- Python
- History
- DBMS
- Java
- Mathematics
- Political Science
- Biology

Features included:

- Add subject
- Show subject list
- Delete subject
- Save subjects permanently in LocalStorage
- Update dashboard subject count automatically

---

### 4. Notes Summarizer

The Notes section allows users to paste study notes.

After clicking the summarize button, the app creates a short summary using the first important part of the notes. This helps students quickly revise long content.

This is a basic frontend-based summary feature. In future versions, this can be upgraded with a real AI API for advanced summarization.

---

### 5. Notes-Based Quiz

StudyMate AI can also generate simple quiz questions from pasted notes.

The app extracts important keywords from the notes and creates quiz questions based on those keywords.

This feature is useful when a student adds a subject that is not available in the built-in quiz bank.

---

### 6. Quiz System

The Quiz section includes a level-based quiz system.

Available levels:

- Easy
- Medium
- Hard

The quiz system supports built-in questions for subjects such as:

- Python
- Mathematics
- Physics
- History
- DBMS
- Java

If the user adds one of these subjects, the app automatically shows related quiz questions.

If the subject is not available in the built-in question bank, the app suggests using the Notes section to generate a notes-based quiz.

---

### 7. Score Tracking

The quiz system includes score tracking.

It tracks:

- Correct answers
- Wrong answers
- Total attempted questions

This helps students understand their quiz performance while practicing.

---

### 8. Weekly Roadmap

The Progress section allows users to generate a weekly study roadmap.

The roadmap is created based on the subjects added by the user.

Example roadmap tasks:

- Revise basic concepts
- Create short notes
- Solve important questions
- Practice quiz
- Identify weak topics
- Take revision test
- Review weekly progress

This feature helps students follow a structured study plan.

---

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Browser LocalStorage
- Git
- GitHub
- GitHub Pages

-----------------------------------------------------------------------------------------------------------------------
## Project Structure

```text
StudyMate-AI/
│
├── index.html      # Main HTML structure
├── styles.css      # Styling and layout
├── app.js          # JavaScript functionality
└── README.md       # Project documentation
------------------------------------------------------------------------------------------------------------------------
How to Run the Project

Method 1: Open Directly
Open the index.html file in any modern browser.

Method 2: Using VS Code
Open the project folder in VS Code
Right-click on index.html
Open with browser or Live Server.

Method 3: GitHub Pages
After deploying through GitHub Pages, the project can be accessed using a public URL like:
https://your-username.github.io/StudyMate-AI/
--------------------------------------------------------------------------------------------------------------------------
How to Use
1)Open the application
2)Go to Dashboard
3)Save your course or class name
4)Go to Subjects
5)Add your subjects
6)Go to Notes
7)Paste your notes and summarize them
8)Go to Quiz
9)Select Easy, Medium, or Hard level
10)Attempt quiz questions
11)Track your score
12)Go to Progress
13)Generate weekly roadmap
----------------------------------------------------------------------------------------------------------------------------
Purpose of the Project
1)The purpose of StudyMate AI is to help students study in a more organized and interactive way.
2)Many students struggle with:
3)Managing subjects
4)Revising notes
5)Practicing questions
6)Tracking preparation
7)Planning weekly study goals
8)StudyMate AI solves these problems by combining study planning, subject management, notes revision, quizzes, and progress tracking in one web app.
-----------------------------------------------------------------------------------------------------------------------------
Future Scope
This project can be improved further with advanced features such as:
1)User login system
2)Real AI-based notes summarization
3)AI-generated quiz questions for any subject
4)More subject question banks
5)PDF notes upload
6)Progress charts
7)Dark and light mode
8)Downloadable performance report
9)Cloud database support
10)Mobile responsive version
11)Teacher/admin dashboard
-------------------------------------------------------------------------------------------------------------------------------
Advantages
1)Easy to use
2)Works in browser
3)No installation required
4)Useful for any student
5)Supports different courses and subjects
6)Saves data locally
7)Helps in revision and practice
8)Clean desktop-focused interface
---------------------------------------------------------------------------------------------------------------------------------
Limitations
Current version uses frontend JavaScript only
Data is saved in browser LocalStorage
Built-in quiz bank is limited
Advanced AI features require backend/API integration
----------------------------------------------------------------------------------------------------------------------------------
Conclusion
StudyMate AI is a student-focused study management web app that helps learners organize their academic work in one place. It combines course tracking, subject management, notes summarization, quiz practice, score tracking, and weekly roadmap generation.
The project is simple, practical, and expandable. It can be used as a strong academic project and can later be upgraded into a full AI-powered learning platform.
-----------------------------------------------------------------------------------------------------------------------------------
Designed By
Abhishek Yadav
