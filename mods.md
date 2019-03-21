### Add space between codes
To add space between codes, add this in the head section of qr.html:

span {
                margin: 1.5em;
}

and this at the bottom of addCodes() in the else statement:

var span = document.createElement("span");
document.getElementById('printDiv').appendChild(span);

