"use strict";

var app = new function() {
	
	function initialize() {
		var elements = document.querySelectorAll("input[type=number], textarea");
		for (var i = 0; i < elements.length; i++) {
			if (elements[i].id.indexOf("version-") != 0)
				elements[i].oninput = redrawQrCode;
		}
		redrawQrCode();
	}
	
	function redrawQrCode() {
		//First QR code
		var canvas = document.getElementById("qrcode-canvas");
		var svg = document.getElementById("qrcode-svg");
		canvas.style.display = "none";
		//Second QR code
		var canvas2 = document.getElementById("qrcode-canvas2");
		var svg2 = document.getElementById("qrcode-svg2");
		canvas2.style.display = "none";
		
		// Get text input and compute QR code
		var ecl = qrcodegen.QrCode.Ecc.MEDIUM;
		var text = document.getElementById("text-input").value;
		var segs = qrcodegen.QrSegment.makeSegments(text);
		var minVer = 1;
		var maxVer = 40;
		var mask = -1;
		var boostEcc = true;
		var qr = qrcodegen.QrCode.encodeSegments(segs, ecl, minVer, maxVer, mask, boostEcc);
		
		// Draw first QR code
		var border = 4;
		var code = qr.toSvgString(border);
		svg.setAttribute("viewBox", / viewBox="([^"]*)"/.exec(code)[1]);
		svg.querySelector("path").setAttribute("d", / d="([^"]*)"/.exec(code)[1]);
		document.getElementById("qrLabel1").textContent = text;
		document.getElementById("qrLabel2").textContent = text;
		//Draw second QR code
		svg2.setAttribute("viewBox", / viewBox="([^"]*)"/.exec(code)[1]);
		svg2.querySelector("path").setAttribute("d", / d="([^"]*)"/.exec(code)[1]);
		document.getElementById("qrLabel3").textContent = text;
		document.getElementById("qrLabel4").textContent = text;
		
		//Fix text positioning if browser is MicrosoftEdge, Chrome, or Firefox (default is Internet Explorer)
		var sBrowser, sUsrAg = navigator.userAgent;
		if (sUsrAg.indexOf("Edge") > -1) {
			document.getElementById("qrLabel1").setAttribute("y", "2");
			document.getElementById("qrLabel2").setAttribute("y", "29");
			document.getElementById("qrLabel3").setAttribute("y", "2");
			document.getElementById("qrLabel4").setAttribute("y", "29");
		} else if (sUsrAg.indexOf("Chrome") > -1) {
			document.getElementById("qrLabel1").setAttribute("y", "6%");
			document.getElementById("qrLabel2").setAttribute("y", "91%");
			document.getElementById("qrLabel3").setAttribute("y", "6%");
			document.getElementById("qrLabel4").setAttribute("y", "91%");
		} else if (sUsrAg.indexOf("Firefox") > -1) {
			document.getElementById("qrLabel1").setAttribute("y", "6%");
			document.getElementById("qrLabel2").setAttribute("y", "96%");
			document.getElementById("qrLabel3").setAttribute("y", "6%");
			document.getElementById("qrLabel4").setAttribute("y", "96%");
		}

	}
	initialize();
}
