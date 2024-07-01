# maze-runner
Simple JavaScript Maze game.

![image](https://user-images.githubusercontent.com/72783924/222011583-99a2a70e-56c3-4bf3-8da9-19d04bd2daf1.png)


## Description

Goal of the game is to find your way through the randomly generated maze as fast as possible. Maze generation is implemented by 'Maze generation algorithm', more precisly, using the 'Randomized depth-first search', also known as 'recursive backtracker'. Player can move around the maze in 4 basic directions and can choose from 4 different difficulties. Each game is measured with timer and when the player wins the game, that specific time will save and is up to player whether he wants to save his score to database or not.

## Technologies

Entire application is made in **JavaScript** using little amount of **jQuery**. Saving data on server is handled with **PHP** script. Getting data from the server back to the user is made with asynchronous requests handled by **AJAX**, precisely with **XMLHttpRequest** Web API.

## Authors

David Poslušný

## Acknowledgments

Resources:
* [Depth-first search algorithm](https://en.wikipedia.org/wiki/Maze_generation_algorithm)
* [Snippet of maze gen logic by k-hung](https://codepen.io/k-hung/pen/eYmQdZq)
