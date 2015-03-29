# Bejeweled

This repository contains a Bejeweled leverages CSS transitions to allow blocks to move simultaneously.

[Live](http://jasminenoack.github.io/bejeweled/)

# TODO:

- More complex scoring.

# FEATURES

* Allows the player to play a 60 second game.
* Calculates a time bonus based on the score and the number of moves taken.
* Allows moving blocks by clicking.
* Blocks cascade simultaneously during change.
* Blocks are different shapes.

# TECHNOLOGY

* jQuery
* JavaScript
* HTML
* CSS
* CSS pseudo selectors are used to shape the blocks.
* Implements jQuery UI drag and drop.
* The most complex part of this code was creating the cascade after the blocks were matched. This is managed through two methods in the game class the cascade method and the isTransitionsEnd method. The first method is used to move blocks. The second method ensures that all CSS transitions have ended before triggering another round of transitions. This allows the program to move several blocks at once.
