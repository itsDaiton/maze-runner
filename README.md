# maze-runner
Simple JavaScript game based on flash Maze games.

## Description

Goal of the game is to find your way through the randomly generated maze as fast as possible. Maze generation is implemented by 'Maze generation algorithm', more precisly, using the 'Randomized depth-first search', also known as 'recursive backtracker'. Player can move around the maze in 4 basic directions and can choose from 4 different difficulties. Each game is measured with timer and when the player wins the game, that specific time will save and is up to player whether he wants to save his score to database or not.

## Technologies

Entire application is made in JavaScript using little amount of JQuery. Saving data on server is handled with PHP script and getting data with asynchronous request is handled by AJAX, namely with XMLHttpRequest WEB API.

## Authors

David Poslušný


## Acknowledgments

Inspiration, code snippets, etc.
* [Depth-first search algorithm](https://en.wikipedia.org/wiki/Maze_generation_algorithm)
* [maze game by k-hung](https://codepen.io/k-hung/pen/eYmQdZq)
