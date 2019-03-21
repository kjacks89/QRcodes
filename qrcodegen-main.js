"use strict";

var app = new function() {
	
	function initialize() {
		var elems = document.querySelectorAll("input[type=number], textarea");
		for (var i = 0; i < elems.length; i++) {
			if (elems[i].id.indexOf("version-") != 0)
				elems[i].oninput = redrawQrCode;
		}
		redrawQrCode();
	}
	
	function redrawQrCode() {
		// Reset output images in case of early termination
		var canvas = document.getElementById("qrcode-canvas");
		var svg = document.getElementById("qrcode-svg");
		canvas.style.display = "none";
		//Second Barcode Below
		var canvas2 = document.getElementById("qrcode-canvas2");
		var svg2 = document.getElementById("qrcode-svg2");
		canvas2.style.display = "none";
		
		// Get text input and compute QR Code
		var ecl = qrcodegen.QrCode.Ecc.MEDIUM;
		var text = document.getElementById("text-input").value;
		var segs = qrcodegen.QrSegment.makeSegments(text);
		var minVer = 1;
		var maxVer = 40;
		var mask = -1;
		var boostEcc = true;
		var qr = qrcodegen.QrCode.encodeSegments(segs, ecl, minVer, maxVer, mask, boostEcc);
		// Draw QR code
		var border = 4;
			var code = qr.toSvgString(border);
			svg.setAttribute("viewBox", / viewBox="([^"]*)"/.exec(code)[1]);
			svg.querySelector("path").setAttribute("d", / d="([^"]*)"/.exec(code)[1]);
			document.getElementById("qrLabel1").textContent = text;
			document.getElementById("qrLabel2").textContent = text;
			//Second Barcode Below
			svg2.setAttribute("viewBox", / viewBox="([^"]*)"/.exec(code)[1]);
			svg2.querySelector("path").setAttribute("d", / d="([^"]*)"/.exec(code)[1]);
			document.getElementById("qrLabel3").textContent = text;
			document.getElementById("qrLabel4").textContent = text;
			
			//Fix text positioning if browser is Chrome or Firefox
			if((navigator.userAgent.indexOf("Chrome") != -1 || navigator.userAgent.indexOf("Firefox")) != -1 ) 
			{
				document.getElementById("qrLabel1").setAttribute("y", "6%");
				document.getElementById("qrLabel2").setAttribute("y", "91%");
				document.getElementById("qrLabel3").setAttribute("y", "6%");
				document.getElementById("qrLabel4").setAttribute("y", "91%");
			}

	}
	initialize();
}

