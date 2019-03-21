# QR Code Web App
This is a Web App that generates multiple/unlimited QR codes via text input and
inserts the text at the top and bottom of the code.  It's convenient for those 
needing to print many QR codes in this (or something close) to this format 
as opposed to some websites that are available.  It can also be easily modified
to integrate back-end functionality, such as:

User types in text --> queries a database --> data then formatted at the top 
and bottom of the QR code 

This could save users time and effort as opposed to looking up the info
themselves.

### Printing
When printing, I used CSS to hide everything except for the QR codes.  The QR 
codes are positioned at the top left of the page.  These changes are to avoid 
wasting ink and paper. 

### Browser Compatibility
Compatible with Chrome, Firefox, Internet Explorer 9+, and Microsoft Edge browsers.

### Notes
* It currently displays 2 QR codes for every text entry per project 
requirements, but the second can be easily removed.

* To add space between QR codes in the web page, add a span element in 
qr.html (per instructions in mods.md). This resulted in less efficient
paper usage when printing so I did not use this.

![alt text](https://github.com/kjacks89/QRcodes/blob/master/example.png "Chrome example")
