# Oxid navigationbar

## Description

Replace existing categorie navigation bar. Main goal is a better usibility for mobile pages and shop which has
many categories. 

![](shop1.png)

![](shop2.png)

![](shop3.png)

This module is made for Oxid 6 wave theme.

## Good to know

The module use "scss" instead of "css". For use out of the box you need the "oxid-optimize" module which convert the styles.

Each theme has it´s own "scss" file and you can add your own and link to that in the module settings. The files are located at

    Modules Folder/out/src/css/theme

## Install

1. Copy files into following directory
        
        source/modules/rs/navigationbar
        
2. Add to composer.json at shop root
  
        "autoload": {
            "psr-4": {
                "rs\\navigationbar\\": "./source/modules/rs/navigationbar"
            }
        },

3. Refresh autoloader files with composer.

        composer dump-autoload
        
4. Enable module in the oxid admin area, Extensions => Modules
