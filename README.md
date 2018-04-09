# MMM-HappyHours
A module for the [MagicMirror](https://github.com/MichMich/MagicMirror) project by [Michael Teeuw](https://github.com/MichMich) getting the happy hours that are in a certain location.


[![Maintainability](https://api.codeclimate.com/v1/badges/2742abc792b88536f6e2/maintainability)](https://codeclimate.com/github/aleckeller/MMM-HappyHours)
[![Build Status](https://travis-ci.org/aleckeller/MMM-HappyHours.svg?branch=master)](https://travis-ci.org/aleckeller/MMM-HappyHours)

## Gif
| ![gif of module working](img/readme/bottomRight.gif) |
|---|
| The module running in a corner |

## How it works
This module uses a [happy hour finder website](http://thehappyhourfinder.com/) to find happy hours that are in your area.
In your config.js, you are able to specify what city and state you would like to use. You can also specify if you would like to find happy hours
for a specific day.

## Installation
Installation is like most other Magic Mirror modules.

```bash
cd /MagicMirror/modules
git clone https://github.com/aleckeller/MMM-HappyHours.git
cd MMM-HappyHours
npm install
```
