# maze-runner
Simple JavaScript Maze game.

Live demo of this game can be found under this [**link**](https://regal-fairy-45218d.netlify.app/).

⚠️ **Saving and browsing scores is not working in the demo.** ⚠️

> Since the server isn't being set up on the deployment site, the backend script handling scores won't work.


## Description

Goal of the game is to find your way through the randomly generated maze as fast as possible. Maze generation is implemented by 'Maze generation algorithm', more precisly, using the 'Randomized depth-first search', also known as 'recursive backtracker'. Player can move around the maze in 4 basic directions and can choose from 4 different difficulties. Each game is measured with timer and when the player wins the game, that specific time will save and is up to player whether he wants to save his score to database or not.

## Technologies

Entire application is made in JavaScript using little amount of JQuery. Saving data on server is handled with PHP script. Getting data from the server back to the user is made with asynchronous requests handled by AJAX, precisely with XMLHttpRequest Web API.

## Authors

David Poslušný

## Acknowledgments

Resources:
* [Depth-first search algorithm](https://en.wikipedia.org/wiki/Maze_generation_algorithm)
* [maze game by k-hung](https://codepen.io/k-hung/pen/eYmQdZq)
