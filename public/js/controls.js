/*-------------------------------
Booleans to store whether a specific button is pressed or not
 --------------------------------*/
var w = false;
var a = false;
var s = false;
var d = false;
var m = false;
var enter = false;
var tab = false;
var esc = false;

/*---Key Press Code-----------*/

document.addEventListener(`keydown`, press);
function press(e)
{
    if(e.keyCode == 87){w = true;}
    if(e.keyCode == 83){s = true;}
    if(e.keyCode == 65){a = true;}
    if(e.keyCode == 68){d = true;}
    if(e.keyCode == 13){enter = true;}
    if(e.keyCode == 9){tab = true;}
    if(e.keyCode == 27){esc = true;}
    if(e.keyCode == 77){m = true;}
}

/*---Key Release Code-----------*/
document.addEventListener(`keyup`, release);
function release(e)
{
    if(e.keyCode == 87){w = false;}
    if(e.keyCode == 83){s = false;}
    if(e.keyCode == 65){a = false;}
    if(e.keyCode == 68){d = false;}
    if(e.keyCode == 13){enter = false;}
    if(e.keyCode == 9){tab = false;}
    if(e.keyCode == 27){esc = false;}
    if(e.keyCode == 77){m = false;}
}