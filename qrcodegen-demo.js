/* 
 * QR Code generator demo (JavaScript)
 * 
 * Copyright (c) Project Nayuki. (MIT License)
 * https://www.nayuki.io/page/qr-code-generator-library
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 * - The above copyright notice and this permission notice shall be included in
 *   all copies or substantial portions of the Software.
 * - The Software is provided "as is", without warranty of any kind, express or
 *   implied, including but not limited to the warranties of merchantability,
 *   fitness for a particular purpose and noninfringement. In no event shall the
 *   authors or copyright holders be liable for any claim, damages or other
 *   liability, whether in an action of contract, tort or otherwise, arising from,
 *   out of or in connection with the Software or the use or other dealings in the
 *   Software.
 */

"use strict";

var app = new function() {
	
	function initialize() {
		var elems = document.querySelectorAll("input[type=number], textarea");
		for (var i = 0; i < elems.length; i++) {
			if (elems[i].id.indexOf("version-") != 0)
				elems[i].oninput = redrawQrCode;
		}
		elems = document.querySelectorAll("input[type=radio], input[type=checkbox]");
		for (var i = 0; i < elems.length; i++)
			elems[i].onchange = redrawQrCode;
		redrawQrCode();
	}
	
	function redrawQrCode() {
		// Reset output images in case of early termination
		var canvas = document.getElementById("qrcode-canvas");
		var svg = document.getElementById("qrcode-svg");
		canvas.style.display = "none";
		svg.style.display = "none";
		//Second Barcode Below
		var canvas2 = document.getElementById("qrcode-canvas2");
		var svg2 = document.getElementById("qrcode-svg2");
		canvas2.style.display = "none";
		svg2.style.display = "none";
		
		// Get form inputs and compute QR Code
		var ecl = qrcodegen.QrCode.Ecc.MEDIUM;//getInputErrorCorrectionLevel();
		var text = document.getElementById("text-input").value;
		var segs = qrcodegen.QrSegment.makeSegments(text);
		var minVer = 1;//parseInt(document.getElementById("version-min-input").value, 10);
		var maxVer = 40;//parseInt(document.getElementById("version-max-input").value, 10);
		var mask = -1;//parseInt(document.getElementById("mask-input").value, 10);
		var boostEcc = true;//document.getElementById("boost-ecc-input").checked;
		var qr = qrcodegen.QrCode.encodeSegments(segs, ecl, minVer, maxVer, mask, boostEcc);
		// Draw image output
		var border = 4;//parseInt(document.getElementById("border-input").value, 10);
			var code = qr.toSvgString(border);
			svg.setAttribute("viewBox", / viewBox="([^"]*)"/.exec(code)[1]);
			svg.querySelector("path").setAttribute("d", / d="([^"]*)"/.exec(code)[1]);
			svg.style.removeProperty("display");
			document.getElementById("qrLabel1").textContent = text; //was .innerHTML
			document.getElementById("qrLabel2").textContent = text;
			//Second Barcode Below
			svg2.setAttribute("viewBox", / viewBox="([^"]*)"/.exec(code)[1]);
			svg2.querySelector("path").setAttribute("d", / d="([^"]*)"/.exec(code)[1]);
			svg2.style.removeProperty("display");
			document.getElementById("qrLabel3").textContent = text;
			document.getElementById("qrLabel4").textContent = text;
		
	}
	/*	
	this.handleVersionMinMax = function(which) {
		//var minElem = document.getElementById("version-min-input");
		//var maxElem = document.getElementById("version-max-input");
		var minVal = 1;//parseInt(minElem.value, 10);
		var maxVal = 40;//parseInt(maxElem.value, 10);
		minVal = Math.max(Math.min(minVal, qrcodegen.QrCode.MAX_VERSION), qrcodegen.QrCode.MIN_VERSION);
		maxVal = Math.max(Math.min(maxVal, qrcodegen.QrCode.MAX_VERSION), qrcodegen.QrCode.MIN_VERSION);
		if (which == "min" && minVal > maxVal)
			maxVal = minVal;
		else if (which == "max" && maxVal < minVal)
			minVal = maxVal;
		//minElem.value = minVal.toString();
		//maxElem.value = maxVal.toString();
		redrawQrCode();
	}
	*/
	initialize();
}

