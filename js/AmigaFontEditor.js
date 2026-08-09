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
			li.style.display = "inline-block";
			li.style.margin = "0px";
			var p = document.createElement("p");
			var oTxt = document.createTextNode("Sprite: "+String.fromCharCode(element));

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

	  	for (var ysquarecont=0;ysquarecont<this.yres;ysquarecont++)
				for (var xsquarecont=0;xsquarecont<this.xres;xsquarecont++)
				{
					// PATCH: don't stroke a path per square here either; collect them
					// and let redrawAll() paint the whole canvas in one batched pass.
					var square = createSquareObj(context,xsquarecont,ysquarecont);
					this.squaresObjs.push(square);
	  			}
			this.redrawAll();
			// PATCH: the original handler did, on EVERY mouse move:
			//   - getImageData(x,y,1,1) -> a synchronous GPU readback on a canvas that
			//     can be 51 Mpixel, and the result was never used;
			//   - getOtherSquares() -> allocated an 81919-element array (~700 KB of
			//     garbage per event, at ~100 events/s) and then walked it.
			// Only one square can be hovered at a time, so we just remember the
			// previous one and unfill that. O(1) per event instead of O(N).
			canvas.addEventListener("mousemove",function(e){
			   	var pos = this.data.findPos(this);
				var x = e.pageX - pos.x;
				var y = e.pageY - pos.y;
				var square_selected = this.data.getSquare(Math.floor(x/this.data.square_pixels),Math.floor(y/this.data.square_pixels));
				if (square_selected==undefined) return;
				if (square_selected===this.data._lastHover) return;   // same square, nothing to redraw
				var prev = this.data._lastHover;
				if (prev!=undefined && prev.pixel_clicked==false) prev.unfill(this.data.palette.getBgFontColor());
				this.data._lastHover = square_selected;
				if (mouseMoveCallback!=null) mouseMoveCallback(square_selected);
				// On hover i fill the square
				square_selected.fill(this.data.palette.getFgFontColor());
			});
			// On mouse exit canvas unfill the hovered square (only one can be filled)
			canvas.addEventListener("mouseout",function(e){
				var prev = this.data._lastHover;
				if (prev!=undefined && prev.pixel_clicked==false) prev.unfill(this.data.palette.getBgFontColor());
				this.data._lastHover = undefined;
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
		getHexDataStringByFont: function (fontIndex,nBitplanes) {
			var binaryCharacters="";
			for (var j=0;j<nBitplanes;j++)
				for (var i = 0; i < table.fontArray.length; i++)
				{
					if (i == fontIndex)
					{
						var canvas=this.fontArray[i].canvas;
						binaryCharacters+=canvas.data.getBinaryDataStringForBitplane(j);
					}
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
		getBinaryDataStringByFont: function (fontIndex,nBitplanes) {
			var binaryCharacters="";
			for (var j=0;j<nBitplanes;j++)
				for (var i = 0; i < table.fontArray.length; i++)
				{
					if (fontIndex == i)
					{
						var canvas=this.fontArray[i].canvas;
						binaryCharacters+=canvas.data.getBinaryDataStringForBitplane(j);
					}
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
		getBinaryDataByFont: function (fontIndex,nBitplanes) {
			var xres=this.resolution.x;
			var yres=this.resolution.y;
			var binaryData = new Uint8Array(xres*yres/8*nBitplanes);
			var offset=0;
			for (var j=0;j<nBitplanes;j++)
				for (var i = 0; i < table.fontArray.length; i++)
				{
					if (fontIndex == i)
					{
						var canvas=this.fontArray[i].canvas;
						var sampleBytes=canvas.data.getBinaryDataForBitplane(j);			
						binaryData.set(sampleBytes,offset);
						offset+=sampleBytes.length;
					}
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
		drawRawDataByFont: function (fontIndex,rawData,nBitplanes,module=0) {

			// Set resolution variables
			var xres=this.resolution.x;
			var yres=this.resolution.y;

			// init contmodule and xContBytes for interleaved processing
			var contModule=0;
			var xContBytes=xres/8;

			// Init resultarray
			//for (var z = 0; z < table.fontArray.length; z++,contModule=0)
			//{
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
						else var byte=rawData[(xres*yres/8)+i+j*xres*yres/8];
						//console.log(byte);
						binaryArray[j][i]=byte;
					}
					//console.log(rawData[i]);
				}
				// Binaryarray is an array of Uint8Array, each element of the array is a bitplane representation of a font, bitplane0 is at index 0, bitplane1 is at index 1 and so on
				//console.log(binaryArray);
				this.fontArray[fontIndex].drawFontFromData(binaryArray);
			//}
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
					var byte=rawData[i+yres*(xres/8)*contBitplane];
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
		// PATCH: identical semantics, but the squares are only mutated here and the
		// canvas is repainted once at the end instead of up to 2 stroked paths per square.
		updateColor: function (index,color) {
			for (var i = 0; i < table.fontArray.length; i++)
			{
				var f  = table.fontArray[i];
				var fg = f.palette.getFgFontColor();
				for (var j=0;j<f.squaresObjs.length;j++)
				{
					var sq = f.squaresObjs[j];
					if (sq.code==index)
					{
						if (index>0) { sq.code = fg.code; sq.pixel_clicked = true;  sq.pixel_filled = true;  }
						else         { sq.code = 0;       sq.pixel_clicked = false; sq.pixel_filled = false; }
					}
				}
				f.redrawAll();
			}
		},
		// Update each square with color currently selected (second parameter is unused)
		// PATCH: state-only mutation + a single batched repaint (see updateColor).
		refreshColor: function (index,colorindex) {
			for (var i = 0; i < table.fontArray.length; i++)
			{
				var f = table.fontArray[i];
				for (var j=0;j<f.squaresObjs.length;j++)
				{
					var sq = f.squaresObjs[j];
					if (sq.code==index)
					{
						if (index>0) { sq.code = f.palette.getFontColorById(index).code; sq.pixel_clicked = true;  sq.pixel_filled = true;  }
						else         { sq.code = 0;                                      sq.pixel_clicked = false; sq.pixel_filled = false; }
					}
				}
				f.redrawAll();
			}
		},
		// Update each square color with color index
		// PATCH: state-only mutation + a single batched repaint (see updateColor).
		// Note index1/index2 arrive as strings from the <select>, so == is kept on purpose.
		swapColors: function (index1,index2) {
			for (var i = 0; i < table.fontArray.length; i++)
			{
				var f = table.fontArray[i];
				for (var j=0;j<f.squaresObjs.length;j++)
				{
					var sq = f.squaresObjs[j];
					if (sq.code==index1)
					{
						if (index2>0) { sq.code = f.palette.getFontColorById(index2).code; sq.pixel_clicked = true;  sq.pixel_filled = true;  }
						else          { sq.code = 0;                                       sq.pixel_clicked = false; sq.pixel_filled = false; }
					}
					else if (sq.code==index2)
					{
						if (index1>0) { sq.code = f.palette.getFontColorById(index1).code; sq.pixel_clicked = true;  sq.pixel_filled = true;  }
						else          { sq.code = 0;                                       sq.pixel_clicked = false; sq.pixel_filled = false; }
					}
				}
				f.redrawAll();
			}
		},
		updateSquareSize: function (newSize)
		{
			// PATCH: the original code had an inner loop over squaresObjs whose body
			// never used the loop variable, so it repeated identical work 81920 times
			// at 320x256. Combined with the O(N^2) getSquare that was ~5e14 operations
			// plus 163840 canvas backing-store reallocations (~205 MB each at size 25).
			// Changing the zoom does not change the data: we only need to repaint once.
			SQUARE_PIXELS = newSize;
			table.square_pixels = SQUARE_PIXELS;
			for (var i = 0; i < table.fontArray.length; i++)
			{
				table.fontArray[i].square_pixels = newSize;
				table.fontArray[i].redrawAll();
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
		_lastHover:undefined,   // PATCH: currently hovered square, for O(1) hover handling
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

			for (var ysquarecont=0;ysquarecont<this.yres;ysquarecont++)
				for (var xsquarecont=0;xsquarecont<this.xres;xsquarecont++)
				{
					// PATCH: don't stroke a path per square here either; collect them
					// and let redrawAll() paint the whole canvas in one batched pass.
					var square = createSquareObj(context,xsquarecont,ysquarecont);
					this.squaresObjs.push(square);
	  			}
			this.redrawAll();
			// PATCH: see the note in createTableObj - same fix, O(1) hover instead of
			// a per-event GPU readback plus a full-array allocation and scan.
			canvas.addEventListener("mousemove",function(e){
			   	var pos = this.data.findPos(this);
				var x = e.pageX - pos.x;
				var y = e.pageY - pos.y;
				var square_selected = this.data.getSquare(Math.floor(x/this.data.square_pixels),Math.floor(y/this.data.square_pixels));
				if (square_selected==undefined) return;
				if (square_selected===this.data._lastHover) return;
				var prev = this.data._lastHover;
				if (prev!=undefined && prev.pixel_clicked==false) prev.unfill(this.data.palette.getBgFontColor());
				this.data._lastHover = square_selected;
				// On hover i fill the square
				square_selected.fill(this.data.palette.getFgFontColor());
			});
			// On mouse exit canvas unfill the hovered square
			canvas.addEventListener("mouseout",function(e){
				var prev = this.data._lastHover;
				if (prev!=undefined && prev.pixel_clicked==false) prev.unfill(this.data.palette.getBgFontColor());
				this.data._lastHover = undefined;
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
		// PATCH: repaint the whole canvas in a single O(N) pass.
		// The original code drew every square with its own beginPath/rect/fill/stroke,
		// i.e. 81920 separate stroked paths at 320x256. Here we do:
		//   1 fillRect for the background
		// + 1 path per palette colour actually used (max 32)
		// + 1 path for the entire grid (xres+yres lines)
		// Used when only the zoom level changed, so the square objects (and their
		// colour codes) stay exactly as they are and do not need to be recreated.
		redrawAll : function ()
		{
			var sp = this.square_pixels;
			var w  = sp*this.xres, h = sp*this.yres;

			// Assigning width/height reallocates and clears the backing store,
			// so only touch them when the size actually changed.
			if (this.canvas.width  != w) this.canvas.width  = w;
			if (this.canvas.height != h) this.canvas.height = h;

			var ctx = this.canvas.getContext('2d');

			// 1) background in one shot
			ctx.fillStyle = this.palette.getBgFontColor().hex;
			ctx.fillRect(0,0,w,h);

			// 2) lit pixels, grouped by colour code
			var byColor = {};
			for (var i=0;i<this.squaresObjs.length;i++)
			{
				var s = this.squaresObjs[i];
				s.pixel_filled = (s.code>0);   // keep the flag in sync with what is on screen
				if (s.code>0)
				{
					if (byColor[s.code]==undefined) byColor[s.code]=[];
					byColor[s.code].push(s);
				}
			}
			for (var code in byColor)
			{
				var col = this.palette.getFontColorById(parseInt(code,10));
				if (col==undefined) continue;   // palette shrank below this code
				var list = byColor[code];
				ctx.fillStyle = col.hex;
				ctx.beginPath();
				for (var k=0;k<list.length;k++)
					ctx.rect(list[k].x*sp, list[k].y*sp, sp, sp);
				ctx.fill();
			}

			// 3) grid as a single path; pointless (and unreadable) below ~4 px
			if (sp >= 4)
			{
				ctx.beginPath();
				for (var x=0;x<=this.xres;x++) { ctx.moveTo(x*sp+0.5,0); ctx.lineTo(x*sp+0.5,h); }
				for (var y=0;y<=this.yres;y++) { ctx.moveTo(0,y*sp+0.5); ctx.lineTo(w,y*sp+0.5); }
				ctx.lineWidth   = 1;
				ctx.strokeStyle = 'black';
				ctx.stroke();
			}

			this._lastHover = undefined;   // the hover highlight was just painted over
			return ;
		},
		changeCanvasXResolution : function (newXres)
		{
			// PATCH: build the new square array without drawing anything (the old code
			// issued one stroked path per square, 81920 of them), then repaint once
			// with redrawAll(). getSquare() is now O(1), so this whole function is O(N).
			var newSquaresObj=[];
			var ctx = this.canvas.getContext('2d');
			for (var ysquarecont=0;ysquarecont<this.yres;ysquarecont++)
				for (var xsquarecont=0;xsquarecont<newXres;xsquarecont++)
				{
					var square = createSquareObj(ctx,xsquarecont,ysquarecont);
					var oldSquare = this.getSquare(xsquarecont,ysquarecont);
					if (oldSquare!=undefined && oldSquare.code>0)
					{
						square.code          = oldSquare.code;
						square.pixel_clicked = true;
						square.pixel_filled  = true;
					}
					newSquaresObj.push(square);
	  			}

	  		this.squaresObjs=newSquaresObj;
	  		this.xres=newXres;          // must come AFTER the getSquare() calls above
	  		this.redrawAll();
	  		return ;
		},
		changeCanvasYResolution : function (newYres)
		{
			// PATCH: same treatment as changeCanvasXResolution above.
			var newSquaresObj=[];
			var ctx = this.canvas.getContext('2d');
			for (var ysquarecont=0;ysquarecont<newYres;ysquarecont++)
				for (var xsquarecont=0;xsquarecont<this.xres;xsquarecont++)
				{
					var square = createSquareObj(ctx,xsquarecont,ysquarecont);
					var oldSquare = this.getSquare(xsquarecont,ysquarecont);
					if (oldSquare!=undefined && oldSquare.code>0)
					{
						square.code          = oldSquare.code;
						square.pixel_clicked = true;
						square.pixel_filled  = true;
					}
					newSquaresObj.push(square);
	  			}

	  		this.squaresObjs=newSquaresObj;
	  		this.yres=newYres;          // must come AFTER the getSquare() calls above
	  		this.redrawAll();
	  		return ;
		},
		// Get a square object from a coordinate pair
		// PATCH: squaresObjs is always built in row-major order, so the index can be
		// computed directly. This turns an O(N) scan into O(1) and, since getSquare is
		// called once per square inside changeCanvas*Resolution, it turns those from
		// O(N^2) (~3.3 billion ops at 320x256) into O(N).
		// NOTE: this.xres / this.yres are only updated at the END of
		// changeCanvasXResolution / changeCanvasYResolution, so while those functions
		// run we are still indexing the OLD array with the OLD geometry: correct.
		getSquare: function (x,y)
		{
			if (x<0 || y<0 || x>=this.xres || y>=this.yres) return undefined;
			return this.squaresObjs[y*this.xres + x];
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
			// PATCH: clear the state, then one batched repaint instead of N stroked paths.
			for (var i = 0; i < this.squaresObjs.length; i++) {
				this.squaresObjs[i].code          = 0;
				this.squaresObjs[i].pixel_clicked = false;
				this.squaresObjs[i].pixel_filled  = false;
			}
			this.redrawAll();
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
				// PATCH: only mutate the square state here. The original called
				// reset() (and sometimes storeClick()) per pixel, i.e. up to 163840
				// separate stroked canvas paths on every file load. One redrawAll()
				// at the end paints the same result in a single batched pass.
				for (var i=0;i<8;i++)
				{
					var sq = this.squaresObjs[squaresObjsCont];
					if (sq!=undefined)
					{
						sq.code          = (bitArray[i]>0) ? bitArray[i] : 0;
						sq.pixel_clicked = (bitArray[i]>0);
						sq.pixel_filled  = (bitArray[i]>0);
					}
					squaresObjsCont++;
				}

			}
			this.redrawAll();
			return ;
		},
		updatePalette: function (newPalette){
			// PATCH: state first, single repaint after.
			this.palette=newPalette;
			var limit = Math.pow(2,newPalette.nBitplanes);
			for (var i = 0; i < this.squaresObjs.length; i++) {
				if (this.squaresObjs[i].code>=limit) {
					this.squaresObjs[i].code          = 0;
					this.squaresObjs[i].pixel_clicked = false;
					this.squaresObjs[i].pixel_filled  = false;
				}
			}
			this.redrawAll();
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
