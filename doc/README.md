GOUNO
===

## Gameplay

WIP

## Data

### Card

we use int16 to represent a card in uno game.  

```plain
| reserved | category | color | value |

category:
001 - standard
010 - function
100 - wild

color:
0001 - red
0010 - yellow
0100 - blue
1000 - green
0000 - black (wild)

value:
0000~0101 - digit 0~9

0000 - skip
0010 - reverse
0100 - draw 2

0000 - wild
0001 - wild draw 4
```
