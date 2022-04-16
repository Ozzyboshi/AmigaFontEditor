var COPIED_SQUARE;
var PNG_MAPPING = [];

function FontColor(hex,code)
{
	this.hex=hex;
	this.code=code;
	this.binaryCode=(code >>> 0).toString(2);
	var rgb=hexToRgb(this.hex);
	this.amigaR=Math.round(rgb.r*15/255).toString(16);
	this.amigaG=Math.round(rgb.g*15/255).toString(16);
	this.amigaB=Math.round(rgb.b*15/255).toString(16);
}

function FontColorsTable(nBitplanes)
{
	this.nBitplanes = nBitplanes;
	this.FontColorsArray = [],
	this.fgIndexColor = 0,
	this.bgIndexColor = 0,
	this.changeBitplanes = function (nBitplanes) { 
		// Shrink the array
		if (nBitplanes<this.nBitplanes)
		{
			this.FontColorsArray = this.FontColorsArray.slice(0,Math.pow(2,nBitplanes));
		}
		// Increase array size
		else if (nBitplanes>this.nBitplanes)
		{
			for (var i=Math.pow(2,this.nBitplanes);i<Math.pow(2,nBitplanes);i++)
				this.FontColorsArray.push(new FontColor('#000000',this.FontColorsArray.length));
		}
		this.nBitplanes=nBitplanes 
	},
	this.addFont24BitHexColor = function (hex) {
		if (this.FontColorsArray.length<Math.pow(2,this.nBitplanes))
			this.FontColorsArray.push(new FontColor(hex,this.FontColorsArray.length));
	};
	this.addFont24BitHexColorAtPos = function (hex,pos) {
		if (pos<this.FontColorsArray.length)
			this.FontColorsArray[pos]=new FontColor(hex,pos);
	};
	this.setFgColorIndex = function (index) {
		this.fgIndexColor = index;
	};
	this.setBgColorIndex = function (index) {
		this.bgIndexColor = index;
	};
	this.getBgFontColor = function () {
		return this.FontColorsArray[this.bgIndexColor];
	};
	this.getFontColorById = function (id) {
		return this.FontColorsArray[id];
	};
	this.getFgFontColor = function (index) {
		return this.FontColorsArray[this.fgIndexColor];
	};
	this.getTableSize = function () { return this.FontColorsArray.length };
	this.changeColor = function (index,hex) {
		this.FontColorsArray[index]=new FontColor(hex,index);
	}
}

function createSpriteTable(characters,palette,resolution)
{
	var newObj=createFontTable(characters,palette,resolution);
	newObj.createList = function (parent) {
		var fontArray=[];
		this.characters.forEach(function(element) {
	  		var li = document.createElement("li");
	  		li.setAttribute("id", "lifont"+element);
			var p = document.createElement("p");
			var oTxt = document.createTextNode("Sprite: `"+String.fromCharCode(element)+"' Ascii code: "+element);

			p.appendChild(oTxt);
	  		li.appendChild(p);
					
	  		parent.appendChild(li);
			var fontObj = createFontObj(SQUARE_PIXELS,resolution.x,resolution.y,li,this.palette);
	  		fontObj.createCanvas();
	  		fontArray.push(fontObj);
		});
		this.fontArray=fontArray;
		return;
	};
	return newObj;
}

function createMonitorTable(characters,palette,resolution,clickCallback=null,mouseMoveCallback=null)
{
	var newObj=createFontTable(characters,palette,resolution);
	newObj.createList = function (parent) {
		var fontArray=[];
		this.characters.forEach(function(element) {
	  		var li = document.createElement("li");
	  		li.setAttribute("id", "lifont"+element);
			var p = document.createElement("p");
			var oTxt = document.createTextNode("Draw positions");

			p.appendChild(oTxt);
	  		li.appendChild(p);
					
	  		parent.appendChild(li);
			var fontObj = createTableObj(SQUARE_PIXELS,resolution.x,resolution.y,li,this.palette,clickCallback,mouseMoveCallback);
	  		fontObj.createCanvas();
	  		fontArray.push(fontObj);
		});
		this.fontArray=fontArray;
		return;
	};
	newObj.appendListToUl = function () { return ; };
	newObj.changeHorizontalPixelToDraw = function (horizontalPixelToDraw) {
		for (var i = 0; i < table.fontArray.length; i++)
		{
			table.fontArray[i].setHorizontalPixelToDraw(horizontalPixelToDraw);
		}
	};

	newObj.changeVerticalPixelToDraw = function (verticalPixelToDraw) {
		for (var i = 0; i < table.fontArray.length; i++)
		{
			table.fontArray[i].setVerticalPixelToDraw(verticalPixelToDraw);
		}
	};
	newObj.changeFunctionPixelToDraw = function (verticalPixelToDraw) {
		for (var i = 0; i < table.fontArray.length; i++)
		{
			table.fontArray[i].setFunctionPixelToDraw(verticalPixelToDraw);
		}
	};

	newObj.changeSpriteWidth = function (horizontalPixels) {
		for (var i = 0; i < table.fontArray.length; i++)
		{
			table.fontArray[i].setFunctionSpriteWidth(horizontalPixels);
		}
	};

	return newObj;
}

function createTableObj(square_pixels,xres,yres,parentObject,palette,clickCallback=null,mouseMoveCallback=null)
{
	var newObj=createFontObj(square_pixels,xres,yres,parentObject,palette);
	newObj.horizontalPixelToDraw=1;
	newObj.setHorizontalPixelToDraw = function (horizontalPixelToDraw) {
		this.horizontalPixelToDraw=horizontalPixelToDraw;
	};
	newObj.setVerticalPixelToDraw = function (verticalPixelToDraw) {
		this.verticalPixelToDraw=verticalPixelToDraw;
	};
	newObj.setFunctionPixelToDraw = function (functionPixelToDraw) {
		this.functionPixelToDraw=functionPixelToDraw;
	};
	newObj.setFunctionSpriteWidth = function (functionSpriteWidth) {
		this.functionSpriteWidth=functionSpriteWidth;
	};
	newObj.createCanvas = function () {
		canvas = document.createElement('canvas');
	  	canvas.width  = square_pixels*xres;
	  	canvas.height = square_pixels*yres;
		this.canvas = canvas;
	  	parentObject.appendChild(canvas);

	  	// Create and assign data
		context = canvas.getContext('2d');
		canvas.data = this;

	  	for (ysquarecont=0;ysquarecont<this.yres;ysquarecont++)
				for (xsquarecont=0;xsquarecont<this.xres;xsquarecont++)
				{
					var square = createSquareObj(context,xsquarecont,ysquarecont);
					square.draw(this.palette.getBgFontColor());
					this.squaresObjs.push(square);
	  			}
			canvas.addEventListener("mousemove",function(e){
			   	var pos = this.data.findPos(this);
				var x = e.pageX - pos.x;
				var y = e.pageY - pos.y;
				var coord = "x=" + x + ", y=" + y;
				var c = this.getContext('2d');
				var p = c.getImageData(x, y, 1, 1).data; 
				square_selected=this.data.getSquare(Math.floor(x/this.data.square_pixels),Math.floor(y/this.data.square_pixels));
				if (square_selected==undefined) return; 
				if (mouseMoveCallback!=null) mouseMoveCallback(square_selected);
				other_squares=this.data.getOtherSquares(Math.floor(x/this.data.square_pixels),Math.floor(y/this.data.square_pixels));
				// On hover i fill the square	
				square_selected.fill(this.data.palette.getFgFontColor());
				for (var i = 0; i < other_squares.length; i++) {
					if (other_squares[i].pixel_clicked==false) other_squares[i].unfill(this.data.palette.getBgFontColor());
				}
			});
			// On mouse exit canvas unfill all non clicked squares
			canvas.addEventListener("mouseout",function(e){
				all_squares=this.data.getAllSquares();
				for (var i = 0; i < all_squares.length; i++) {
					if (all_squares[i].pixel_clicked==false) all_squares[i].unfill(this.data.palette.getBgFontColor());
				}
			});
			canvas.addEventListener("click",function(e){
				var pos = this.data.findPos(this);
				var x = e.pageX - pos.x;
				var y = e.pageY - pos.y;

				var squareX = Math.floor(x/this.data.square_pixels);
				var squareY = Math.floor(y/this.data.square_pixels);

				
				if (this.data.functionPixelToDraw!=undefined && this.data.functionPixelToDraw.length>0)
				{
					//var paraboleDraw="f(x)=1/500x^2+1/100x+0";
					var paraboleDraw=this.data.functionPixelToDraw;
					//alert(paraboleDraw);
					var scope = {
					  a: 3,
					  b: 4
					};
					square_selected=this.data.getSquare(squareX,squareY);
					var f = math.eval(paraboleDraw, scope);

					var contParabola=0;
					for (contParabola=0;contParabola<this.data.xres-square_selected.x-this.data.functionSpriteWidth+1;contParabola++)
					{
						console.log(Math.floor(f(square_selected.x+contParabola))); 
						console.log(yres);
						square_selected2=this.data.getSquare(square_selected.x+contParabola,yres-Math.floor(f(square_selected.x+contParabola)));
						if (square_selected2!=undefined)
						{
							square_selected2.storeClick(this.data.palette.getFgFontColor(),this.data.palette.getFgFontColor());
							if (clickCallback) clickCallback(square_selected2);	
						}
					}
					//console.log(square_selected.x);
					return;               
				}

				for (var contHorizontalPixelToDraw=0;contHorizontalPixelToDraw<this.data.horizontalPixelToDraw;contHorizontalPixelToDraw++)
				{
					square_selected=this.data.getSquare(squareX+contHorizontalPixelToDraw,squareY);
					if (square_selected!=undefined)
					{
						square_selected.storeClick(this.data.palette.getFgFontColor(),this.data.palette.getFgFontColor());
						if (clickCallback) clickCallback(square_selected);	
					}
				}

				for (var contVerticalPixelToDraw=1;contVerticalPixelToDraw<this.data.verticalPixelToDraw;contVerticalPixelToDraw++)
				{
					square_selected=this.data.getSquare(squareX,squareY+contVerticalPixelToDraw);
					if (square_selected!=undefined)
					{
						square_selected.storeClick(this.data.palette.getFgFontColor(),this.data.palette.getFgFontColor());
						if (clickCallback) clickCallback(square_selected);	
					}
				}
			});
	};
	return newObj;
}

function createFontTable(characters,palette,resolution)
{
	return {
		characters:characters,
		fontArray:[],
		palette:palette,
		resolution:resolution,
		createList: function (parent) {
			var fontArray=[];
			this.characters.forEach(function(element) {
	  			var li = document.createElement("li");
	  			li.setAttribute("id", "lifont"+element);
				var p = document.createElement("p");
				var oTxt = document.createTextNode("Font: `"+String.fromCharCode(element)+"' Ascii code: "+element);

				p.appendChild(oTxt);
	  			li.appendChild(p);
					
	  			parent.appendChild(li);
				var fontObj = createFontObj(SQUARE_PIXELS,resolution.x,resolution.y,li,this.palette);
	  			fontObj.createCanvas();
	  			fontArray.push(fontObj);
			});
			this.fontArray=fontArray;
			return;
		},
		appendListToUl: function (parent) {
			this.characters.forEach(function(element) {
				var li = document.createElement("li");
				li.appendChild(document.createTextNode(String.fromCharCode(parseInt(element))));
				parent.appendChild(li);
				li.addEventListener('click',function () { window.location.href='#lifont'+ parseInt(element)});
			});
		},
		getHexDataString: function (nBitplanes) {
			var binaryCharacters="";
			for (var j=0;j<nBitplanes;j++)
				for (var i = 0; i < table.fontArray.length; i++)
				{
					var canvas=this.fontArray[i].canvas;
					binaryCharacters+=canvas.data.getBinaryDataStringForBitplane(j);
				}
			var s = binaryCharacters;
			var i, k, part, accum, ret = '';
			for (i = s.length-1; i >= 3; i -= 4) {
				// extract out in substrings of 4 and convert to hex
				part = s.substr(i+1-4, 4);
				accum = 0;
				for (k = 0; k < 4; k += 1) {
					if (part[k] !== '0' && part[k] !== '1') {
					    // invalid character
					    return { valid: false };
					}
					// compute the length 4 substring
					accum = accum * 2 + parseInt(part[k], 10);
				}
				if (accum >= 10) {
					// 'A' to 'F'
					ret = String.fromCharCode(accum - 10 + 'A'.charCodeAt(0)) + ret;
				} else {
					// '0' to '9'
					ret = String(accum) + ret;
				}
			}
			// remaining characters, i = 0, 1, or 2
			if (i >= 0) {
				accum = 0;
				// convert from front
				for (k = 0; k <= i; k += 1) {
					if (s[k] !== '0' && s[k] !== '1') {
					    return { valid: false };
					}
					accum = accum * 2 + parseInt(s[k], 10);
				}
				// 3 bits, value cannot exceed 2^3 - 1 = 7, just convert
				ret = String(accum) + ret;
			}
			return ret;
		},
		getBinaryDataString: function (nBitplanes) {
			var binaryCharacters="";
			for (var j=0;j<nBitplanes;j++)
				for (var i = 0; i < table.fontArray.length; i++)
				{
					var canvas=this.fontArray[i].canvas;
					binaryCharacters+=canvas.data.getBinaryDataStringForBitplane(j);
				}
			return binaryCharacters;
		},
		getBinaryDataStringAsm: function (nBitplanes) {
			var binaryCharacters="";
			for (var j=0;j<nBitplanes;j++)
			{
				binaryCharacters+="; Bitplane "+j+":\n";
				for (var i = 0; i < table.fontArray.length; i++)
				{
					var canvas=this.fontArray[i].canvas;
					binaryCharacters+=canvas.data.getBinaryDataStringForBitplaneASM(j);
				}
			}
			return binaryCharacters;
		},
		getBinaryData: function (nBitplanes) {
			var xres=this.resolution.x;
			var yres=this.resolution.y;
			var binaryData = new Uint8Array(xres*yres/8*this.fontArray.length*nBitplanes);
			var offset=0;
			for (var j=0;j<nBitplanes;j++)
				for (var i = 0; i < table.fontArray.length; i++)
				{
					var canvas=this.fontArray[i].canvas;
					var sampleBytes=canvas.data.getBinaryDataForBitplane(j);			
					binaryData.set(sampleBytes,offset);
					offset+=sampleBytes.length;
				}
			return binaryData;
		},
		drawRawData: function (rawData,nBitplanes,module=0) {
			//console.log(rawData);

			// Set resolution variables
			var xres=this.resolution.x;
			var yres=this.resolution.y;

			// init contmodule and xContBytes for interleaved processing
			var contModule=0;
			var xContBytes=xres/8;
			console.log(module);

			// Init resultarray
			for (var z = 0; z < table.fontArray.length; z++,contModule=0)
			{
				var binaryArray = [nBitplanes];
				for (var i=0;i<nBitplanes;i++)
					binaryArray[i]=new Uint8Array(xres*yres/8);
				//Cycle an entire font
				for (var i=0;i<xres*yres/8;i++)
				{
					//console.log("Byte"+i);
					// Cycle all the bitplanes
					for (var j=0;j<nBitplanes;j++)
					{
						//console.log("Bitplane"+j);

						// Enter here for interleaved fonts with 1 bitplane
						if (nBitplanes==1 && module>0)
						{
							
							var skipBytes=z*xContBytes;
							var byte=rawData[skipBytes+contModule+(i%xContBytes)];
							if ((i+1)%xContBytes==0)
								contModule+=module;
						}
						else var byte=rawData[(z*xres*yres/8)+i+j*xres*yres/8*table.fontArray.length];
						//console.log(byte);
						binaryArray[j][i]=byte;
					}
					//console.log(rawData[i]);
				}
				// Binaryarray is an array of Uint8Array, each element of the array is a bitplane representation of a font, bitplane0 is at index 0, bitplane1 is at index 1 and so on
				//console.log(binaryArray);
				this.fontArray[z].drawFontFromData(binaryArray);
			}
		},
		clearRawImg: function () {
			this.fontArray[0].clearAllSquares();
		},
		drawRawImg: function (rawData,nBitplanes,module=0) {
			//console.log(rawData);

			// Set resolution variables
			var xres=this.resolution.x;
			var yres=this.resolution.y;

			var binaryArray = [nBitplanes];
				for (var i=0;i<nBitplanes;i++)
					binaryArray[i]=new Uint8Array(xres*yres/8);
			//console.log("binary data allocaed");

			for (var i=0;i<xres*yres/8;i++)
			{
				var byte=rawData[i];
				if (byte>0)
				{
					binaryArray[0][i]=byte;
					//console.log("bitplane 0: byte "+i+"is "+byte);
				}

				// For each additional bitplane
				for (var contBitplane=1;contBitplane<nBitplanes;contBitplane++)
				{
					var byte=rawData[i+yres*40*contBitplane];
					if (byte>0)
					{
						//console.log(i+yres*40*contBitplane+" bitplane "+contBitplane+": byte "+i+"is "+byte);
						binaryArray[contBitplane][i]=byte;
					}
				}
			}
			this.fontArray[0].drawFontFromData(binaryArray);
		},

		// Update each square with color currently selected (second parameter is unused)
		updateColor: function (index,color) {
			for (var i = 0; i < table.fontArray.length; i++)
			{
				for (var j=0;j<table.fontArray[i].squaresObjs.length;j++)
				{
					if (table.fontArray[i].squaresObjs[j].code==index)
					{
						//console.log(table.fontArray[i].squaresObjs[j].code);
						table.fontArray[i].squaresObjs[j].reset(table.fontArray[i].palette.getBgFontColor());
						if (index>0)
							table.fontArray[i].squaresObjs[j].storeClick(table.fontArray[i].palette.getBgFontColor(),table.fontArray[i].palette.getFgFontColor());
					}
				}
			}
		},
		// Update each square with color currently selected (second parameter is unused)
		refreshColor: function (index,colorindex) {
			for (var i = 0; i < table.fontArray.length; i++)
			{
				for (var j=0;j<table.fontArray[i].squaresObjs.length;j++)
				{
					if (table.fontArray[i].squaresObjs[j].code==index)
					{
						//console.log(table.fontArray[i].squaresObjs[j].code);
						table.fontArray[i].squaresObjs[j].reset(table.fontArray[i].palette.getBgFontColor());
						if (index>0)
							table.fontArray[i].squaresObjs[j].storeClick(table.fontArray[i].palette.getBgFontColor(),table.fontArray[i].palette.getFontColorById(index));
					}
				}
			}
		},
		// Update each square color with color index
		swapColors: function (index1,index2) {
			for (var i = 0; i < table.fontArray.length; i++)
			{
				for (var j=0;j<table.fontArray[i].squaresObjs.length;j++)
				{
					if (table.fontArray[i].squaresObjs[j].code==index1)
					{
						table.fontArray[i].squaresObjs[j].reset(table.fontArray[i].palette.getBgFontColor());
						if (index2>0)
							table.fontArray[i].squaresObjs[j].storeClick(table.fontArray[i].palette.getBgFontColor(),table.fontArray[i].palette.getFontColorById(index2));
					}
					else if (table.fontArray[i].squaresObjs[j].code==index2)
					{
						table.fontArray[i].squaresObjs[j].reset(table.fontArray[i].palette.getBgFontColor());
						if (index1>0)
							table.fontArray[i].squaresObjs[j].storeClick(table.fontArray[i].palette.getBgFontColor(),table.fontArray[i].palette.getFontColorById(index1));
					}
				}
			}
		},
		updateSquareSize: function (newSize)
		{
			SQUARE_PIXELS = newSize;
			table.square_pixels = SQUARE_PIXELS;
			for (var i = 0; i < table.fontArray.length; i++)
			{
				for (var j=0;j<table.fontArray[i].squaresObjs.length;j++)
				{
					table.fontArray[i].square_pixels=newSize;
					table.fontArray[i].changeCanvasXResolution(table.fontArray[i].xres);
					table.fontArray[i].changeCanvasYResolution(table.fontArray[i].yres);
				}
			}
		},
		updatePalette: function (newPalette) {
			this.palette=newPalette;
			for (var i = 0; i < table.fontArray.length; i++)
				table.fontArray[i].updatePalette(newPalette);

		},
		changeFontXRes: function (newXres) {
			for (var i = 0; i < table.fontArray.length; i++)
				table.fontArray[i].changeCanvasXResolution(newXres);
			this.resolution.x=newXres;
		},
		changeFontYRes: function (newYres) {
			for (var i = 0; i < table.fontArray.length; i++)
				table.fontArray[i].changeCanvasYResolution(newYres);
			this.resolution.y=newYres;
		},
		setChangePaletteCallback: function (callback) {
			for (var i = 0; i < table.fontArray.length; i++)
				table.fontArray[i].setChangePaletteCallback(callback);
		}
	};
}

function createFontObj(square_pixels,xres,yres,parentObject,palette)
{
	return { 
		square_pixels:square_pixels,
		xres:xres,
		yres:yres,
		palette:palette,
		canvas:undefined,
		context:undefined,
		squaresObjs:[],
		changePaletteCallback:undefined,
		createCanvas: function () {
			canvas = document.createElement('canvas');
	  		canvas.width  = square_pixels*xres;
	  		canvas.height = square_pixels*yres;
			this.canvas = canvas;
	  		parentObject.appendChild(canvas);

			// Create clear button
			var p = document.createElement("p");
			var clearBtn = document.createElement("BUTTON");
			var clearTxt = document.createTextNode("Clear");
			clearBtn.appendChild(clearTxt);
			p.appendChild(clearBtn);
			parentObject.appendChild(p);

			// Copy button
			var copyBtn = document.createElement("BUTTON");
			var copyTxt = document.createTextNode("Copy");
			copyBtn.appendChild(copyTxt);
			p.appendChild(copyBtn);
			parentObject.appendChild(p);

			// Create paste button
			var pasteBtn = document.createElement("BUTTON");
			var pasteTxt = document.createTextNode("Paste");
			pasteBtn.appendChild(pasteTxt);
			p.appendChild(pasteBtn);
			parentObject.appendChild(p);
			parentObject.appendChild(p);

			// Create load PNG button
			var loadPngBtnReal = document.createElement("INPUT");
			loadPngBtnReal.type="file";
			loadPngBtnReal.style="display:none;";
			p.appendChild(loadPngBtnReal);
			var loadPngBtn = document.createElement("BUTTON");
			var loadPngTxt = document.createTextNode("Load png");
			loadPngBtn.appendChild(loadPngTxt);
			p.appendChild(loadPngBtn);
			parentObject.appendChild(p);

			// Create and assign data
			context = canvas.getContext('2d');
			canvas.data = this;
			clearBtn.data = this;
			copyBtn.data = this;
			pasteBtn.data = this;
			loadPngBtnReal.data = this;

			for (ysquarecont=0;ysquarecont<this.yres;ysquarecont++)
				for (xsquarecont=0;xsquarecont<this.xres;xsquarecont++)
				{
					var square = createSquareObj(context,xsquarecont,ysquarecont);
					square.draw(this.palette.getBgFontColor());
					this.squaresObjs.push(square);
	  			}
			canvas.addEventListener("mousemove",function(e){
			   	var pos = this.data.findPos(this);
				var x = e.pageX - pos.x;
				var y = e.pageY - pos.y;
				var coord = "x=" + x + ", y=" + y;
				var c = this.getContext('2d');
				var p = c.getImageData(x, y, 1, 1).data; 
					//var hex = "#" + ("000000" + this.data.rgbToHex(p[0], p[1], p[2])).slice(-6);
					//console.log(coord);
					//console.log(hex);
				square_selected=this.data.getSquare(Math.floor(x/this.data.square_pixels),Math.floor(y/this.data.square_pixels));
				if (square_selected==undefined) return; 
				other_squares=this.data.getOtherSquares(Math.floor(x/this.data.square_pixels),Math.floor(y/this.data.square_pixels));
				// On hover i fill the square	
				square_selected.fill(this.data.palette.getFgFontColor());
				for (var i = 0; i < other_squares.length; i++) {
					if (other_squares[i].pixel_clicked==false) other_squares[i].unfill(this.data.palette.getBgFontColor());
				}
			});
			// On mouse exit canvas unfill all non clicked squares
			canvas.addEventListener("mouseout",function(e){
				all_squares=this.data.getAllSquares();
				for (var i = 0; i < all_squares.length; i++) {
					if (all_squares[i].pixel_clicked==false) all_squares[i].unfill(this.data.palette.getBgFontColor());
				}
			});
			canvas.addEventListener("click",function(e){
				var pos = this.data.findPos(this);
				var x = e.pageX - pos.x;
				var y = e.pageY - pos.y;
				square_selected=this.data.getSquare(Math.floor(x/this.data.square_pixels),Math.floor(y/this.data.square_pixels));
				square_selected.storeClick(this.data.palette.getBgFontColor(),this.data.palette.getFgFontColor());
			});

			// Handler for clearing image at button press
			clearBtn.addEventListener("click",function(e){
				this.data.clearAllSquares();
			});

			// Handle for storing font
			copyBtn.addEventListener("click",function(e){
				COPIED_SQUARE=[];
				for (var i=0;i<this.data.palette.nBitplanes;i++)
				{
					COPIED_SQUARE[i]=new Uint8Array(this.xres*this.yres/8);
					COPIED_SQUARE[i]=this.data.getBinaryDataForBitplane(i);
				}
				alert('Image copied');
			});

			// Handle for pasting font
			pasteBtn.addEventListener("click",function(e){
				this.data.drawFontFromData(COPIED_SQUARE);
				alert('Image pasted');
			});

			// Handle load png button click (fake)
			loadPngBtn.addEventListener("click",function(e){
				this.previousSibling.click();
			});

			// Handle load png button click (true)
			loadPngBtnReal.addEventListener("change",function(e){
				var palette=this.data.palette;
				var squaresObjs=this.data.squaresObjs;
				var rgbToHex = this.data.rgbToHex;
				var xres=this.data.xres;
				var yres=this.data.yres;
				var changePaletteCallback=this.data.changePaletteCallback;

				var fileReader = new FileReader();
				fileReader.onloadend = function (e) 
				{
    					var arrayBuffer = e.target.result;
					//console.log(arrayBuffer);
					var img = UPNG.decode(arrayBuffer);
					if (img.width!=xres || img.height!=yres)
					{
						alert('Image resolution invalid, png resolution : '+img.width+'X'+img.height+' pixels, change the png resolution or adjust settings in this page');
						return ;
					}
					if (img.depth>palette.nBitplanes)
					{
						alert('Image color depth '+img.depth+' is too high, please change the png color depth or increase the bitplanes (if possible)');
						return ;
					}
					//console.log(img);
					var img2=UPNG.toRGBA8(img);
					//console.log(img2);

					var usePreviousPNGPaletteSchema=0;
					if (PNG_MAPPING.length>0)
					{
						if (window.confirm("Use previous png palette schema?"))
							usePreviousPNGPaletteSchema=1;
						else
							PNG_MAPPING=[];
					}
					var arrayPixel=[];
					for (var i=0;i<img2.length;i+=4)
					{
						var pixel = {r:img2[i],g:img2[i+1],b:img2[i+2]};
						var found=0;
						for (var j=0;found==0&&j<arrayPixel.length;j++)
						{
							if (arrayPixel[j].r==pixel.r && arrayPixel[j].g==pixel.g && arrayPixel[j].b==pixel.b)
							{
								found=1;
								if (squaresObjs[i/4]!=undefined){
									squaresObjs[i/4].code=j;
								}
								squaresObjs[i/4].reset(palette.getBgFontColor());
								if (j>0)
									squaresObjs[i/4].storeClick(palette.getBgFontColor(),palette.getFontColorById(j));
							}
						}
						if (found==0) {
							var mapping_found=0;
							for (var cont_mapping=0;usePreviousPNGPaletteSchema==1&&cont_mapping<PNG_MAPPING.length&&mapping_found==0;cont_mapping++)
							{
								var pngMap=PNG_MAPPING[cont_mapping].pixel;
								if (pngMap.r==pixel.r && pngMap.g==pixel.g && pngMap.b==pixel.b)
								{
									mapping_found=1;
									var code=PNG_MAPPING[cont_mapping].code;
									if (squaresObjs[i/4]!=undefined) squaresObjs[i/4].code=code;
									squaresObjs[i/4].reset(palette.getBgFontColor());
									if (code>0)
										squaresObjs[i/4].storeClick(palette.getBgFontColor(),palette.getFontColorById(code));
								}
							}
							if (mapping_found==0)
							{
								if (squaresObjs[i/4]!=undefined) squaresObjs[i/4].code=arrayPixel.length;
								squaresObjs[i/4].reset(palette.getBgFontColor());
								if (arrayPixel.length>0)
									squaresObjs[i/4].storeClick(palette.getBgFontColor(),palette.getFontColorById(arrayPixel.length));
								PNG_MAPPING.push({'code':arrayPixel.length,'pixel':pixel});
								arrayPixel.push(pixel);
							}
						}
					}
					//console.log(arrayPixel);
					if (!window.confirm('Use new colors extracted from the png file?')) return ;
					var arrayPixelRgb = [];
					for (var i=0;i<arrayPixel.length;i++)
					{
						var rgbRes=rgbToHex(arrayPixel[i].r,arrayPixel[i].g,arrayPixel[i].b);
						while (rgbRes.length < 6)  rgbRes="0"+rgbRes;
						arrayPixelRgb.push('#'+rgbRes);
					}
					changePaletteCallback(arrayPixelRgb);
				};
				fileReader.readAsArrayBuffer(this.files[0]);
				this.value=null;
			});
		},
		setChangePaletteCallback: function (callback) { this.changePaletteCallback = callback },
		changeCanvasXResolution : function (newXres)
		{

			this.canvas.width  = this.square_pixels*newXres;
			var newSquaresObj=[];
			for (ysquarecont=0;ysquarecont<this.yres;ysquarecont++)
				for (xsquarecont=0;xsquarecont<newXres;xsquarecont++)
				{
					var square = createSquareObj(this.canvas.getContext('2d'),xsquarecont,ysquarecont);
					var oldSquare = this.getSquare(xsquarecont,ysquarecont);
					if (oldSquare==undefined)
						square.draw(this.palette.getBgFontColor());
					else
					{
						if (oldSquare.code>0) square.storeClick(this.palette.getBgFontColor(),this.palette.getFontColorById(oldSquare.code));
						else square.draw(this.palette.getBgFontColor());
					}
					newSquaresObj.push(square);
	  			}
	  		
	  		this.squaresObjs=newSquaresObj;
	  		this.xres=newXres;
	  		return ;
		},
		changeCanvasYResolution : function (newYres)
		{
			this.canvas.height  = this.square_pixels*newYres;
			var newSquaresObj=[];
			for (ysquarecont=0;ysquarecont<newYres;ysquarecont++)
				for (xsquarecont=0;xsquarecont<this.xres;xsquarecont++)
				{
					var square = createSquareObj(this.canvas.getContext('2d'),xsquarecont,ysquarecont);
					var oldSquare = this.getSquare(xsquarecont,ysquarecont);
					if (oldSquare==undefined)
						square.draw(this.palette.getBgFontColor());
					else
					{
						if (oldSquare.code>0) square.storeClick(this.palette.getBgFontColor(),this.palette.getFontColorById(oldSquare.code));
						else square.draw(this.palette.getBgFontColor());
					}
					newSquaresObj.push(square);
	  			}
	  		
	  		this.squaresObjs=newSquaresObj;
	  		this.yres=newYres;
	  		return ;
		},
		// Get a square object from a coordinate pair
		getSquare: function (x,y)
		{
			for (var i = 0; i < this.squaresObjs.length; i++) {
				if (this.squaresObjs[i].x==x && this.squaresObjs[i].y==y )
					return this.squaresObjs[i];
			}
		},
		// Removes a square object from a coordinate pair
		removeSquare: function (x,y)
		{
			for (var i = 0; i < this.squaresObjs.length; i++) {
				if (this.squaresObjs[i].x==x && this.squaresObjs[i].y==y )
				{
					this.squaresObjs.splice(i);
					return;
				}
			}
		},
		// Get all squares not matching the coordinate given
		getOtherSquares: function (x,y)
		{
			var res = [];
			for (var i = 0; i < this.squaresObjs.length; i++) {
				if (this.squaresObjs[i].x!=x || this.squaresObjs[i].y!=y )
					res.push(this.squaresObjs[i]);
			}
			return res;
		},
		getAllSquares: function ()
		{
			return this.squaresObjs;
		},
		clearAllSquares: function ()
		{
			for (var i = 0; i < this.squaresObjs.length; i++) {
				//this.squaresObjs[i].unfill(this.palette.getBgFontColor());
				this.squaresObjs[i].reset(this.palette.getBgFontColor());
			}
		},
		getBinaryBitplanes: function () {
			var resultArray = [];
			for (var i=0;i<this.palette.nBitplanes;i++)
				resultArray[i]="";
			for (var i = 0; i < this.squaresObjs.length; i++) 
			{
				var binaryCode=(this.squaresObjs[i].code >>> 0).toString(2);
				while (binaryCode.length<this.palette.nBitplanes)
					binaryCode=binaryCode+"0";
				for (var contBitplanes=0;contBitplanes<this.palette.nBitplanes;contBitplanes++)
					resultArray[contBitplanes]+=binaryCode[contBitplanes];
			}
			return resultArray;
		},
		// Get a specific bitplane binarydata in string from
		getBinaryDataStringForBitplane: function (bitplaneNumber) {
			var res="";
			if (bitplaneNumber>this.palette.nBitplanes) return res;
			for (var i = 0; i < this.squaresObjs.length; i++) 
			{
				var binaryCode=(this.squaresObjs[i].code >>> 0).toString(2);
				while (binaryCode.length<this.palette.nBitplanes)
					binaryCode="0"+binaryCode;
				binaryCode=binaryCode.split("").reverse().join("");
				res+=binaryCode[bitplaneNumber];
			}
			return res;
		},
		// Get a specific bitplane binarydata in string from
		getBinaryDataStringForBitplaneASM: function (bitplaneNumber) {
			var total=0;
			var contbytes=0;
			var byteIndex=7;
			var contcomma=0;
			var rowcount=0;
			var res="dc.l $";
			if (bitplaneNumber>this.palette.nBitplanes) return res;
			for (var i = 0; i < this.squaresObjs.length; i++) 
			{
				var temp=0;
				
				var binaryCode=(this.squaresObjs[i].code >>> 0).toString(2);
				while (binaryCode.length<this.palette.nBitplanes)
					binaryCode="0"+binaryCode;
				binaryCode=binaryCode.split("").reverse().join("");

				if (binaryCode[bitplaneNumber]!='0')
				{
					temp=Math.pow(2, byteIndex);
					total+=temp;
				}
				if (byteIndex==0)
				{
					byteIndex=7;
					var number = total.toString(16);
					res+=("0" + number).slice(-2);
					/*if ((++contdollar)>=0)
					{
						res+="$"+number;
						contdollar = 0;
					}*/
					total=0;
					if ((++contcomma)>=4)
					{
						res+=",$";
						contcomma=0;
					}
				}
				else byteIndex--;

				//res+=binaryCode[bitplaneNumber]+",";
				// end of row
				//if (i&&!(i%319))
				if ((++contbytes)>=320)
				{
					res = res.slice(0, -2); 
					res+=" ;row "+(rowcount++)+"\ndc.l $";
					contbytes = 0;
				}
			}
			res = res.slice(0, -7); 
			return res;
		},
		// Get a specific bitplane binarydata in Uint8Array format
		getBinaryDataForBitplane: function (bitplaneNumber) {
			var resIndex=0;
			var byteIndex=7;
			var res = new Uint8Array(this.xres*this.yres/8);
			if (bitplaneNumber>this.palette.nBitplanes) return res;
			for (var i = 0; i < this.squaresObjs.length; i++) 
			{
				var temp=0;
				var binaryCode=(this.squaresObjs[i].code >>> 0).toString(2);
				while (binaryCode.length<this.palette.nBitplanes)
					binaryCode="0"+binaryCode;
				binaryCode=binaryCode.split("").reverse().join("");

				if (binaryCode[bitplaneNumber]!='0')
				{
					temp=Math.pow(2, byteIndex);
					res[resIndex]+=temp;
				}
				if (byteIndex==0){ byteIndex=7; resIndex++; }
				else byteIndex--;
			}

			return res;
		},
		// Get a string representing binary data of the image
		getBinaryDataString: function () {
			var res="";
			var resultArray = this.getBinaryBitplanes();
			for (var i=0;i<this.palette.nBitplanes;i++)
				res+=resultArray[i];
			return res;
		},
		// Find mouse position inside canvas
		findPos: function (obj) {
			var curleft = 0, curtop = 0;
			if (obj.offsetParent) {
				do {
					curleft += obj.offsetLeft;
					curtop += obj.offsetTop;
				} while (obj = obj.offsetParent);
				return { x: curleft, y: curtop };
			}
			return undefined;
		},
		rgbToHex : function (r,g,b) {
			if (r > 255 || g > 255 || b > 255)
				throw "Invalid color component";
			return ((r << 16) | (g << 8) | b).toString(16);
		},
		/*getHexDataString: function () {
			var s = this.getBinaryDataString();
			var i, k, part, accum, ret = '';
			for (i = s.length-1; i >= 3; i -= 4) {
				// extract out in substrings of 4 and convert to hex
				part = s.substr(i+1-4, 4);
				accum = 0;
				for (k = 0; k < 4; k += 1) {
					if (part[k] !== '0' && part[k] !== '1') {
					    // invalid character
					    return { valid: false };
					}
					// compute the length 4 substring
					accum = accum * 2 + parseInt(part[k], 10);
				}
				if (accum >= 10) {
					// 'A' to 'F'
					ret = String.fromCharCode(accum - 10 + 'A'.charCodeAt(0)) + ret;
				} else {
					// '0' to '9'
					ret = String(accum) + ret;
				}
			}
			// remaining characters, i = 0, 1, or 2
			if (i >= 0) {
				accum = 0;
				// convert from front
				for (k = 0; k <= i; k += 1) {
					if (s[k] !== '0' && s[k] !== '1') {
					    return { valid: false };
					}
					accum = accum * 2 + parseInt(s[k], 10);
				}
				// 3 bits, value cannot exceed 2^3 - 1 = 7, just convert
				ret = String(accum) + ret;
			}
			//return { valid: true, result: ret };
			return ret;
		},*/
		// Function to set squares status according to a binaryData array, this array must be made by 0 or 1 only and his length must match the font resolution
		setSquares : function (binaryData) {
			//console.log(binaryData);
			if (binaryData.length!=this.squaresObjs.length) return ;
			for (var i = 0; i < this.squaresObjs.length; i++) {
				if (binaryData[i]==0)
				{
					this.squaresObjs[i].unfill(this.palette.getBgFontColor());
					this.squaresObjs[i].pixel_clicked=false;
				}
				else
				{
					this.squaresObjs[i].fill(this.palette.getFgFontColor());
					this.squaresObjs[i].pixel_clicked=true;
				}				
			}
		},
		drawFontFromData: function(data){
			var squaresObjsCont=0;
			// Get length of the first bitplane
			var imgLength=data[0].length;

			// read n-th byte
			for (var n=0;n<imgLength;n++)
			{
				// Cycle each bitplane and read the nth byte of every bitplane
				var bitArray=[];
				for (var i=0;i<8;i++) bitArray[i]=0;

				for (var i=0;i<data.length;i++)
				{
					//console.log("Leggo byte "+i+" del bitplane "+i);
					//Cycle from 0 to 7 to read the byte bit by bit
					for (var j=0,byteValue=data[i][n];j<8;j++)
					{
						bitArray[j]+=(byteValue%2)*Math.pow(2,i);
						byteValue=Math.floor(byteValue/2);
					}
				}
				bitArray=bitArray.reverse();
				//console.log("Bittarray per carattere "+n+"-"+bitArray);
				for (var i=0;i<8;i++)
				{
					this.squaresObjs[squaresObjsCont].reset(this.palette.getBgFontColor());
					if (bitArray[i]>0)
					{
						this.squaresObjs[squaresObjsCont].storeClick(this.palette.getBgFontColor(),this.palette.getFontColorById(bitArray[i]));
					}
					squaresObjsCont++;
				}
				
			}
			return ;
		},
		updatePalette: function (newPalette){
			this.palette=newPalette;
			for (var i = 0; i < this.squaresObjs.length; i++) {
				if (this.squaresObjs[i].code>=Math.pow(2,newPalette.nBitplanes))
					this.squaresObjs[i].reset(this.palette.getBgFontColor());
			}
		}

	};
}

// Function to create a square (single pixel within a canvas
function createSquareObj(context,x,y)
{
	return {
		context: context,
   		x: x,
   		y: y,
   		code: 0,
		pixel_clicked: false,  // If true the pixel has been clicked
		pixel_filled: false,   // If true the pixel has been filled (this occurs whether the pixel has been click or the mouse pointer is hovering on it
		draw: function (color) {
			context.beginPath();
			context.rect(x*SQUARE_PIXELS, y*SQUARE_PIXELS, SQUARE_PIXELS, SQUARE_PIXELS);
			context.fillStyle = color.hex;
			context.fill();
			context.lineWidth = 1;
			context.strokeStyle = 'black';
			context.stroke();
		},
		//Fill the square with black
		fill: function (color) {
			if (this.pixel_filled==true) return ;
			context.beginPath();
			context.rect(x*SQUARE_PIXELS, y*SQUARE_PIXELS, SQUARE_PIXELS, SQUARE_PIXELS);
			context.fillStyle = color.hex;
			context.fill();
			context.lineWidth = 1;
			context.strokeStyle = 'black';
			context.stroke();
			this.pixel_filled=true;
		},
		// Fill the square with white
		unfill: function (color) {
			if (this.pixel_filled==false) return ;
			context.beginPath();
			context.rect(x*SQUARE_PIXELS, y*SQUARE_PIXELS, SQUARE_PIXELS, SQUARE_PIXELS);
			context.fillStyle = color.hex;
			context.fill();
			context.lineWidth = 1;
			context.strokeStyle = 'black';
			context.stroke();
			this.pixel_filled=false;
		},
		// Change the state of the square
		storeClick(bgcolor,fgcolor) {
			this.pixel_clicked=!this.pixel_clicked;
			if (this.pixel_clicked==true)	{this.fill(fgcolor);this.code=fgcolor.code;}
			else				{this.unfill(bgcolor);this.code=bgcolor.code;}
		},
		reset(color) {
			this.pixel_clicked=false;
			this.pixel_filled=false;
			this.code=0;
			context.beginPath();
			context.rect(x*SQUARE_PIXELS, y*SQUARE_PIXELS, SQUARE_PIXELS, SQUARE_PIXELS);
			context.fillStyle = color.hex;
			context.fill();
			context.lineWidth = 1;
			context.strokeStyle = 'black';
			context.stroke();
		}
	};
}
function hexToRgb(hex) 
{
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}
