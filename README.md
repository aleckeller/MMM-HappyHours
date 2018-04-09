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

## Configuration Options
| Option | Description |
|--------|-------------|
| `state` | <p>A string that specifies the state you would like to find the happy hours in.</p><p>**Type:** `string` **OPTIONAL BUT ENCOURAGED**<br>**Example:** `us_ca`<br>**OPTIONS:** `us_al us_ak us_az us_ar us_ca us_co us_ct us_de us_fl us_ga us_hi us_id us_il us_in us_ia us_ks us_ky us_la us_me us_md us_ma us_mi us_mn us_ms us_mo us_mt us_ne us_nv us_nh us_nj us_nm us_ny us_nc us_nd us_oh us_ok us_or us_pa us_ri us_sc us_sd us_tn us_tx us_ut us_vt us_va us_wa us_dc us_wv us_wi us_wy`<br> **Default Value:** `us_va`</p> |
| `city` | <p>A string that specifies the city you would like to find the happy hours in.</p><p>**Type:** `string` **OPTIONAL BUT ENCOURAGED**<br>**Example:** `los-angeles`<br>**OPTIONS:** `If you are having trouble finding your city, go [here](http://thehappyhourfinder.com/), go to the bottom of the site, find your state, find your city in that state and click on the link, then look at the url and see what the correct value is for your city.`<br> **Default Value:** `richmond-6`</p> |
| `useDayOfWeek` | <p>A boolean that specifies if you would like to only find the happy hours for the current day.</p><p>**Type:** `boolean` **OPTIONAL**<br>**Example:** `false`<br>**Default Value:** `true`</p> |
| `maxWidth` | <p>A string that specifies the width of the module.</p><p>**Type:** `string` **OPTIONAL**<br>**Example:** `325px`<br>**Default Value:** `400px`</p> |
| `maxHeight` | <p>A string that specifies the height of the module.</p><p>**Type:** `string` **OPTIONAL**<br>**Example:** `250px`<br>**Default Value:** `200px`</p> |
| `scrollSpeed` | <p>An integer that specifies how fast you would like the module to scroll through the happy hours. The larger the number, the slower it will scroll.</p><p>**Type:** `integer` **OPTIONAL**<br>**Example:** `80`<br>**Default Value:** `100`</p> |
