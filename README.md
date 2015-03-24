# Bejeweled

This repository contains a Bejeweled game that I built in jQuery and CSS.
Live: http://jasminenoack.github.io/bejeweled/

# TODO:

- More complex scoring.

# Cascading

The most complex part of this code was creating the cascade after the blocks were matched. This is managed through two methods in the [game](..lib/game.js) class the cascade method and the isTransitionsEnd method. The first method is used to move blocks. The second method ensures that all CSS transitions have ended before triggering another round of transitions. This allows the program to move several blocks at once without losing track of where the blocks end up.
