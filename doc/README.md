GOUNO
=====

GamePlay
--------

WIP

Data
----

### Card ###

we use int16 to represent a card in uno game.  

```plain
| type | reserved | color | value |
| t r c c v v v v |

00 standard
10 wild cards

00 red
01 yellow
10 blue
11 green

0000 0 
1001 9
1010 skip
1011 reverse
1100 draw 2
1101 wild
1110 wild draw 4
```
