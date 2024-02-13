# ProCollab - Software Requirements Specification (SRS)

## Introduction

### Purpose
The purpose of this document is to outline the functional and non-functional requirements for the development of ProCollab, a project sharing platform. ProCollab allows users to share their thoughts, projects, and educational resources, interact with other users through liking, disliking, and commenting on projects, and access educational resources based on their interests.

### Scope
ProCollab will provide a user-friendly interface for users to create profiles, upload and manage projects thoughts, engage with other users' projects, and access educational resources. The platform will be built using the MERN (MongoDB, Express.js, React.js, Node.js) stack.

## Functional Requirements

### User Authentication
1. Users should be able to register and create an account.
2. Users should be able to log in using their username and password.
3. Users should be able to reset their password if forgotten.

### Profile Management
1. Users should be able to view and edit their profile information.
2. Users should be able to delete their account if desired.

### Project Management
1. Users should be able to create and delete projects.
2. Projects should include a title, description, and tags for categorization.
3. Users should be able to upload images or files to accompany their projects.

### Interaction with Projects
1. Users should be able to like or dislike projects.
2. Users should be able to comment on projects.

### Educational Resources
1. Users should be able to access educational resources categorized by topics of interest.
2. Users should be able to view, rate, and comment on educational resources.

### Search Functionality
1. Users should be able to search for projects based on keywords or tags.
2. Users should be able to filter search results by criteria such as date, popularity, or relevance.

## Non-Functional Requirements

### Performance
1. The platform should be responsive and load quickly across different devices and screen sizes.
2. The system should be able to handle a large number of concurrent users without significant performance degradation.

### Security
1. User passwords should be securely hashed and stored in the database.
2. User sessions should be managed securely to prevent unauthorized access using JWT.

### Usability
1. The user interface should be intuitive and easy to navigate.
2. Error messages should be clear and informative to assist users in troubleshooting.

## API Documentation
The API documentation for ProCollab can be found [here](https://documenter.getpostman.com/view/31012961/2sA2r3ZktU).

## Glossary
- MERN: MongoDB, Express.js, React.js, Node.js
