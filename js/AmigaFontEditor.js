	function createFontTable(characters,parent)
	{
		return {
			characters:characters,
			fontArray:[],
			createList: function (parent) {
				var fontArray=[];
				this.characters.forEach(function(element) {
	  				var li = document.createElement("li");
					var p = document.createElement("p");
					var oTxt = document.createTextNode("Font: `"+String.fromCharCode(element)+"' Ascii code: "+element);

					p.appendChild(oTxt);
	  				li.appendChild(p);
					
	  				parent.appendChild(li);
					var fontObj = createFontObj(SQUARE_PIXELS,XRES,YRES,li);
	  				fontObj.createCanvas();
	  				fontArray.push(fontObj);
				});
				this.fontArray=fontArray;
				return;
			}
		};
	}

	function createFontObj(square_pixels,xres,yres,parentObject)
	{
		return { 
			square_pixels:square_pixels,
			xres:xres,
			yres:yres,
			canvas:undefined,
			context:undefined,
			squaresObjs:[],
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

				context = canvas.getContext('2d');
				canvas.data = this;
				clearBtn.data = this;

				for (ysquarecont=0;ysquarecont<YRES;ysquarecont++)
					for (xsquarecont=0;xsquarecont<XRES;xsquarecont++)
					{
						var square = createSquareObj(context,xsquarecont,ysquarecont);
						square.draw();
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
					square_selected.fill();
					for (var i = 0; i < other_squares.length; i++) {
						if (other_squares[i].pixel_clicked==false) other_squares[i].unfill();
					}
				});
				// On mouse exit canvas unfill all non clicked squares
				canvas.addEventListener("mouseout",function(e){
					//this.data.clearAllSquares();
					all_squares=this.data.getAllSquares();
					for (var i = 0; i < all_squares.length; i++) {
						if (all_squares[i].pixel_clicked==false) all_squares[i].unfill();
					}
				});
				canvas.addEventListener("click",function(e){
					var pos = this.data.findPos(this);
					var x = e.pageX - pos.x;
					var y = e.pageY - pos.y;
					square_selected=this.data.getSquare(Math.floor(x/this.data.square_pixels),Math.floor(y/this.data.square_pixels));
					square_selected.storeClick();
				});

				// Handler for clearing image at button press
				clearBtn.addEventListener("click",function(e){
					this.data.clearAllSquares();
				});
			},
			// Get a square object from a coordinate pair
			getSquare: function (x,y)
			{
				for (var i = 0; i < this.squaresObjs.length; i++) {
					if (this.squaresObjs[i].x==x && this.squaresObjs[i].y==y )
						return this.squaresObjs[i];
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
					this.squaresObjs[i].unfill();
				}
			},
			// Get a string representing binary data of the image
			getBinaryDataString: function () {
				var res="";
				for (var i = 0; i < this.squaresObjs.length; i++) {
					if (this.squaresObjs[i].pixel_clicked) res+="1";
					else								   res+="0";
				}
				return res;
			},
			// Get a UInt8Array of the image
			getBinaryData: function () {
				var resIndex=0;
				var byteIndex=7;
				var res = new Uint8Array(this.xres*this.yres/8);
				
				for (var i = 0; i < this.squaresObjs.length; i++) {
					var temp=0;
					if (this.squaresObjs[i].pixel_clicked==true)
						temp=Math.pow(2, byteIndex);
					res[resIndex]+=temp;
					if (byteIndex==0){ byteIndex=7; resIndex++; }
					else byteIndex--;
				}
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
			getHexDataString: function () {
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
			},

			// Function to set squares status according to a binaryData array, this array must be made by 0 or 1 only and his length must match the font resolution
			setSquares : function (binaryData) {
				//console.log(binaryData);
				if (binaryData.length!=this.squaresObjs.length) return ;
				for (var i = 0; i < this.squaresObjs.length; i++) {
					if (binaryData[i]==0)
					{
						this.squaresObjs[i].unfill();
						this.squaresObjs[i].pixel_clicked=false;
					}
					else
					{
						this.squaresObjs[i].fill();
						this.squaresObjs[i].pixel_clicked=true;
					}				
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
			pixel_clicked: false,  // If true the pixel has been clicked
			pixel_filled: false,   // If true the pixel has been filled (this occurs whether the pixel has been click or the mouse pointer is hovering on it
    		getInfo: function () {
        		return ' apple';
    		},
			draw: function () {
				context.beginPath();
				context.rect(x*SQUARE_PIXELS, y*SQUARE_PIXELS, SQUARE_PIXELS, SQUARE_PIXELS);
				context.fillStyle = 'white';
				context.fill();
				context.lineWidth = 1;
				context.strokeStyle = 'black';
				context.stroke();
			},
			//Fill the square with black
			fill: function () {
				if (this.pixel_filled==true) return ;
				context.beginPath();
				context.rect(x*SQUARE_PIXELS, y*SQUARE_PIXELS, SQUARE_PIXELS, SQUARE_PIXELS);
				context.fillStyle = 'black';
				context.fill();
				context.lineWidth = 1;
				context.strokeStyle = 'black';
				context.stroke();
				this.pixel_filled=true;
			},
			// Fill the square with white
			unfill: function () {
				if (this.pixel_filled==false) return ;
				context.beginPath();
				context.rect(x*SQUARE_PIXELS, y*SQUARE_PIXELS, SQUARE_PIXELS, SQUARE_PIXELS);
				context.fillStyle = 'white';
				context.fill();
				context.lineWidth = 1;
				context.strokeStyle = 'black';
				context.stroke();
				this.pixel_filled=false;
			},
			// Change the state of the square
			storeClick() {
				this.pixel_clicked=!this.pixel_clicked;
				if (this.pixel_clicked==true)	this.fill();
				else							this.unfill();
			}
		};
	}
