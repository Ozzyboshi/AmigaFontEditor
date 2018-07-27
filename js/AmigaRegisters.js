var AMIGAREGISTERS = [];


AMIGAREGISTERS.push(
{
	address: "BFE001",
	name:	 "pra",
	description:	"CIAA",
	bits:[
		{
			name:"OVL",
			description:""
		},{
			name:"/LED",
			description:""
		},{
			name:"/CHNG",
			description:""
		},{
			name:"/WPRO",
			description:""
		},{
			name:"/TK0",
			description:""
		},{
			name:"/RDY",
			description:""
		},{
			name:"/FIR0",
			description:""
		},{
			name:"/FIR1",
			description:""
		},{
			name:"",
			description:""
		},{
			name:"",
			description:""
		},{
			name:"",
			description:""
		},{
			name:"",
			description:""
		},{
			name:"",
			description:""
		},{
			name:"",
			description:""
		},{
			name:"",
			description:""
		},{
			name:"",
			description:""
		},
	]
});

AMIGAREGISTERS.push(
{
	address: "DFF004",
	name:	 "VPOSR",
	description:	"Read vert most sig. bits (and frame flop)",
	bits:[
		{
			name:"V8",
			description:"Hires chips only (20,30 identifiers)"
		},{
			name:"V9",
			description:"Hires chips only (20,30 identifiers)"
		},{
			name:"V9",
			description:"Hires chips only (20,30 identifiers)"
		},{
			name:"xx",
			description:""
		},{
			name:"xx",
			description:""
		},{
			name:"xx",
			description:""
		},{
			name:"xx",
			description:""
		},{
			name:"LOL",
			description:"Long line bit. When low, it indicates short raster line."
		},{
			name:"I0",
			description:""
		},{
			name:"I1",
			description:""
		},{
			name:"I2",
			description:""
		},{
			name:"I3",
			description:""
		},{
			name:"I4",
			description:""
		},{
			name:"I5",
			description:""
		},{
			name:"I6",
			description:""
		},{
			name:"LOF",
			description:""
		},
	]
});

AMIGAREGISTERS.push(
{
	address: "DFF006",
	name:	 "VHPOSR",
	description:	"Read vert and horiz position of beam, or lightpen",
	bits:[
		{
			name:"H1",
			description:""
		},{
			name:"H2",
			description:""
		},{
			name:"H3",
			description:""
		},{
			name:"H4",
			description:""
		},{
			name:"H5",
			description:""
		},{
			name:"H6",
			description:""
		},{
			name:"H7",
			description:""
		},{
			name:"H8",
			description:""
		},{
			name:"V0",
			description:""
		},{
			name:"V1",
			description:""
		},{
			name:"V2",
			description:""
		},{
			name:"V3",
			description:""
		},{
			name:"V4",
			description:""
		},{
			name:"V5",
			description:""
		},{
			name:"V6",
			description:""
		},{
			name:"V7",
			description:""
		},
	]
});

AMIGAREGISTERS.push(
{
	address: "DFF040",
	name:	 "BLTCON0",
	description:	"Blitter control register 0",
	note: "Il blitter possiede degli shifter hardware per i canali A e B, che shiftano a\n\
destra tutti i bit delle word che vengono lette dai canali A e B.\n\
I bit vengono shiftati di numero di posizioni che puo` variare da 0 a 15.\n\
Shiftare di 0 posizioni equivale a non shiftare affatto: tutte le blittate che \n\
abbiamo visto (e fatto) finora erano blittate con shift di 0 posizioni.\n\
Il valore di shift per il canale A è assegnato con i bit dal 15 al 12 del\n\
registro BLTCON0 ($dff040);\n\
\n\
Minterms\n\
	A	B	C	 	posizione BLTCON0\n\
	-	-	-	        -----------------\n\
						\n\
	0	0	0			0\n\
						\n\
	0	0	1			1\n\
						\n\
	0	1	0			2\n\
						\n\
	0	1	1		 	3\n\
						\n\
	1	0	0			4\n\
						\n\
	1	0	1			5\n\
						\n\
	1	1	0			6\n\
\n\
	1	1	1			7\n\
\n\
		Fig. 27	MINTERMS\n\
\n\
Per esempio, se vogliamo che una blittata produca un'uscita pari a 1 quando\n\
l'ingresso A vale 0, il B vale 1 e il C vale 0, e che invece produca un uscita\n\
pari a 0 in tutti gli altri casi, dobbiamo settare a 1 il minterm 2, e azzerare\n\
tutti gli altri minterms. Quindi scriveremo il valore $04 nel byte LF.\n\
",
	bits:[
		{
			name:"LF0",
			description:"Logic function minterm select lines"
		},{
			name:"LF1",
			description:"Logic function minterm select lines"
		},{
			name:"LF2",
			description:"Logic function minterm select lines"
		},{
			name:"LF3",
			description:"Logic function minterm select lines"
		},{
			name:"LF4",
			description:"Logic function minterm select lines"
		},{
			name:"LF5",
			description:"Logic function minterm select lines"
		},{
			name:"LF6",
			description:"Logic function minterm select lines"
		},{
			name:"LF7",
			description:"Logic function minterm select lines"
		},{
			name:"USED",
			description:"Mode control bit to use source D"
		},{
			name:"USEC",
			description:"Mode control bit to use source C"
		},{
			name:"USEB",
			description:"Mode control bit to use source B"
		},{
			name:"USEA",
			description:"Mode control bit to use source A"
		},{
			name:"ASA0",
			description:"Shift value of A source"
		},{
			name:"ASH1",
			description:"Shift value of A source"
		},{
			name:"ASH2",
			description:"Shift value of A source"
		},{
			name:"ASH3",
			description:"Shift value of A source"
		},
	]
});

AMIGAREGISTERS.push(
{
	address: "DFF058",
	name:	 "BLTSIZE",
	description:	"Blitter start and size (width, height)",
	note : "Nei 6 bit bassi va espressa la dimensione orizzontale, ovvero il NUMERO DI\n\
WORD che costituisce ogni linea orizzontale; nei 10 bit alti va espresso\n\
IL NUMERO DI LINEE orizzontali che costituiscono il rettangolo: in sostanza,\n\
nei 6 bit bassi va la larghezza in X del rettangolo, nei 10 bit alti va\n\
l' altezza in Y del suddetto rettangolo.\n\
è da notare che se il valore dei 10 bit alti (altezza) è 0,il blitter \n\
blitterà 1024 linee, e se il valore dei 6 bit bassi (larghezza in word) è 0,\n\
il blitter blitterà 64 word: la più grande blittata, dunque, si ottiene\n\
scrivendo move.w  #$0000,$dff058.\n\
Essa sarà di 64 word X 1024 linee (=64*2*1024=128 Kb).",
	bits:[
		{
			name:"W0",
			description:"Width bit 0 - Horiz pixels (6 bits = 64 words = 1024 pixels max)"
		},{
			name:"W1",
			description:"Width bit 1 - Horiz pixels (6 bits = 64 words = 1024 pixels max)"
		},{
			name:"W2",
			description:"Width bit 2 - Horiz pixels (6 bits = 64 words = 1024 pixels max)"
		},{
			name:"W3",
			description:"Width bit 3 - Horiz pixels (6 bits = 64 words = 1024 pixels max)"
		},{
			name:"W4",
			description:"Width bit 4 - Horiz pixels (6 bits = 64 words = 1024 pixels max)"
		},{
			name:"W5",
			description:"Width bit 5 - Horiz pixels (6 bits = 64 words = 1024 pixels max)"
		},{
			name:"H0",
			description:"Height bit 6 - Vertical lines (10 bits = 1024 lines max)"
		},{
			name:"H1",
			description:"Height bit 1 - Vertical lines (10 bits = 1024 lines max)"
		},{
			name:"H2",
			description:"Height bit 2 - Vertical lines (10 bits = 1024 lines max)"
		},{
			name:"H3",
			description:"Height bit 3 - Vertical lines (10 bits = 1024 lines max)"
		},{
			name:"H4",
			description:"Height bit 4 - Vertical lines (10 bits = 1024 lines max)"
		},{
			name:"H5",
			description:"Height bit 5 - Vertical lines (10 bits = 1024 lines max)"
		},{
			name:"H6",
			description:"Height bit 6 - Vertical lines (10 bits = 1024 lines max)"
		},{
			name:"H7",
			description:"Height bit 7 - Vertical lines (10 bits = 1024 lines max)"
		},{
			name:"H8",
			description:"Height bit 8 - Vertical lines (10 bits = 1024 lines max)"
		},{
			name:"H9",
			description:"Height bit 9 - Vertical lines (10 bits = 1024 lines max)"
		},
	]
});

AMIGAREGISTERS.push(
{
	address: "DFF100",
	name:	 "BPLCON0",
	description:	"Bit Plane Control Register 0 (misc, control bits)",
	bits:[
		{
			name:		"ECSENA=0",
			description:"When low (default), the following bits in BPLCON3 are\n\
disabled: BRDRBLNK,BRDNTRAN,ZDCLKEN,BRDSPRT, and\n\
EXTBLKEN. These 5 bits can always be set by writing\n\
to BPLCON3, however there effects are inhibited until\n\
ECSENA goes high. This allows rapid context switching\n\
between pre-ECS viewports and new ones."
		},
		{
			name:"ERSY",
			description:"External resync (HSYNC, VSYNC pads become inputs) (reset on power up)"
		},
		{
			name:"LACE",
			description:"Interlace enable (reset on power up)"
		},
		{
			name:"LPEN",
			description:"Light pen enable (reset on power up)"
		},
		{
			name:"BPU3=0",
			description:"See above (BPUx)"
		},
		{
			name:"BYPASS=0	",
			description:"Bit planes are scrolled and prioritized normally, but\n\
bypass color table and 8 bit wide data appear on R(7:0)."
		},
		{
			name:"SHRES",
			description:"Super hi-res mode (35ns pixel width)"
		},
		{
			name:"UHRES",
			description:"Ultrahi res enables the UHRES pointers (for 1k*1k) also\n\
needs bits in DMACON (hires chips only).\n\
Disables hard stops for vert, horiz display windows"
		},
		{
			name:"GAUD",
			description:"Genlock audio enable. This level appears on the ZD\n\
pin on denise during all blanking periods, unless ZDCLK\n\
bit is set."
		},
		{
			name:"COLOR",
			description:"Enables color burst output signal"
		},
		{
			name:"DPF",
			description:"Double playfield (PF1 = odd & PF2 = even bit planes)\n\
now available in all resolutions.\n\
(If BPU = 6 and HAM = 0 and DPF = 0 a special mode is\n\
defined that allows bitplane 6 to cause an intensity\n\
reduction of the other 5 bitplanes. The color\n\
register output selected by 5 bitplanes is shifted\n\
to half intensity by the 6th bit plane. This is\n\
called EXTRA-HALFBRITE Mode."
		},
		{
			name:"HAM",
			description:"Hold and modify mode, now using either 6 or 8 bit planes."
		},
		{
			name:"BPU0",
			description:"Bit planes use"
		},
		{
			name:"BPU1",
			description:"Bit planes use"
		},
		{
			name:"BPU2",
			description:"Bit planes use"
		},
		{
			name:"HIRES",
			description:"HIRES = High resolution (640*200/640*400 interlace) mode"
		}

	]
});


AMIGAREGISTERS.push(
{
	address: "DFF106",
	name:	 "BPLCON3",
	description:	"Bit Plane Control Register (enhanced bits)",
	bits:[
		{
			name:		"EXTBLKEN=0",
			description:"Causes BLANK output to be programmable instead of reflecting internal fixed decodes. Disabled when ESCENA low."
		},
		{
			name:"BRDSPRT=0",
			description:"Enables sprites outside the display window. disabled when ESCENA low."
		},
		{
			name:"ZDCLKEN=0	",
			description:"ZD pin outputs a 14MHz clock whose falling edge coincides with hires (7MHz) video data. this bit when set disables all other ZD functions. Disabled when ESCENA low."
		},
		{
			name:"x",
			description:"Don`t care but drive to 0 for upward compatibility"
		},
		{
			name:"BRDNTRAN=0",
			description:"\"Border area\" is non minus transparant (ZD pin is low when border is displayed). Disabled when ECSENA low."
		},
		{
			name:"BRDRBLNK=0",
			description:"Border area is blanked instead of color (0). Disabled when ECSENA low."
		},
		{
			name:"SPRESx=0",
			description:"Determine resolution of all 8 sprites (x = 0,1):\n\
\n\
00 : ECS defaults (LORES, HIRES=140ns, SHRES=70ns)\n\
01 : LORES (140ns)\n\
10 : HIRES (70ns)\n\
11 : SHRES (35ns)"
		},
		{
			name:"SPRESx=0",
			description:"Determine resolution of all 8 sprites (x = 0,1):\
\
00 : ECS defaults (LORES, HIRES=140ns, SHRES=70ns)\
01 : LORES (140ns)\
10 : HIRES (70ns)\
11 : SHRES (35ns)"
		},
		{
			name:"x",
			description:"Don`t care but drive to 0 for upward compatibility"
		},
		{
			name:"LOCT=0",
			description:"Dictates that subsequent color palette values will be\n\
written to a second 12-bit color palette, constituting\n\
the RGB low minus order bits. Writes to the normal hi\n\
minus order color palette automattically copied to the\n\
low order for backwards compatibility."
		},
		{
			name:"PF2OFx",
			description:"Determine bit plane color table offset when playfield 2\n\
has priority in dual playfield mode :\n\
\n\
000 : none\n\
001 : 2 (plane 2 affected)\n\
010 : 4 (plane 3 affected)\n\
011 : 8 (plane 3 affected) (default)\n\
100 : 16 (plane 5 affected)\n\
101 : 32 (plane 6 affected)\n\
110 : 64 (plane 7 affected)\n\
111 : 128 (plane 8 affected)"
		},
		{
			name:"PF2OFx",
			description:"Determine bit plane color table offset when playfield 2\n\
has priority in dual playfield mode :\n\
\n\
000 : none\n\
001 : 2 (plane 2 affected)\n\
010 : 4 (plane 3 affected)\n\
011 : 8 (plane 3 affected) (default)\n\
100 : 16 (plane 5 affected)\n\
101 : 32 (plane 6 affected)\n\
110 : 64 (plane 7 affected)\n\
111 : 128 (plane 8 affected)"
		},
		{
			name:"PF2OFx",
			description:"Determine bit plane color table offset when playfield 2\n\
has priority in dual playfield mode :\n\
\n\
000 : none\n\
001 : 2 (plane 2 affected)\n\
010 : 4 (plane 3 affected)\n\
011 : 8 (plane 3 affected) (default)\n\
100 : 16 (plane 5 affected)\n\
101 : 32 (plane 6 affected)\n\
110 : 64 (plane 7 affected)\n\
111 : 128 (plane 8 affected)"
		},
		{
			name:"BANKx",
			description:"Selects one of eight color banks, x = 0-2."
		},
		{
			name:"BANKx",
			description:"Selects one of eight color banks, x = 0-2."
		},
		{
			name:"BANKx",
			description:"Selects one of eight color banks, x = 0-2."
		}

	]
});

AMIGAREGISTERS.push(
{
	address: "DFF10C",
	name:	 "BPLCON4",
	description:	"Bit Plane Control Register (display masks)",
	bits:[
		{
			name:"OSPRM7=1",
			description:"4 Bit field provides the 4 high order color table address\n\
bits for odd sprites: SPR1,SPR3,SPR5,SPR7. Default value\n\
is 0001 binary. (x=7-4)"
		},{
			name:"OSPRM7=1",
			description:"4 Bit field provides the 4 high order color table address\n\
bits for odd sprites: SPR1,SPR3,SPR5,SPR7. Default value\n\
is 0001 binary. (x=7-4)"
		},{
			name:"OSPRM7=1",
			description:"4 Bit field provides the 4 high order color table address\n\
bits for odd sprites: SPR1,SPR3,SPR5,SPR7. Default value\n\
is 0001 binary. (x=7-4)"
		},{
			name:"OSPRM7=1",
			description:"4 Bit field provides the 4 high order color table address\n\
bits for odd sprites: SPR1,SPR3,SPR5,SPR7. Default value\n\
is 0001 binary. (x=7-4)"
		},{
			name:"ESPRMx=1",
			description:"4 Bit field provides the 4 high order color table address\n\
bits for even sprites: SPR0,SPR2,SPR4,SPR6. Default value\n\
is 0001 binary. (x=7-4)"
		},{
			name:"ESPRMx=1",
			description:"4 Bit field provides the 4 high order color table address\n\
bits for even sprites: SPR0,SPR2,SPR4,SPR6. Default value\n\
is 0001 binary. (x=7-4)"
		},{
			name:"ESPRMx=1",
			description:"4 Bit field provides the 4 high order color table address\n\
bits for even sprites: SPR0,SPR2,SPR4,SPR6. Default value\n\
is 0001 binary. (x=7-4)"
		},{
			name:"ESPRMx=1",
			description:"4 Bit field provides the 4 high order color table address\n\
bits for even sprites: SPR0,SPR2,SPR4,SPR6. Default value\n\
is 0001 binary. (x=7-4)"
		},{
			name:"BPLAMx=0",
			description:"This 8 bit field is XOR`ed with the 8 bit plane color\n\
address, thereby altering the color address sent to the\n\
color table. Default value is 00000000 binary. (x=0-7)"
		},{
			name:"BPLAMx=0",
			description:"This 8 bit field is XOR`ed with the 8 bit plane color\n\
address, thereby altering the color address sent to the\n\
color table. Default value is 00000000 binary. (x=0-7)"
		},{
			name:"BPLAMx=0",
			description:"This 8 bit field is XOR`ed with the 8 bit plane color\n\
address, thereby altering the color address sent to the\n\
color table. Default value is 00000000 binary. (x=0-7)"
		},{
			name:"BPLAMx=0",
			description:"This 8 bit field is XOR`ed with the 8 bit plane color\n\
address, thereby altering the color address sent to the\n\
color table. Default value is 00000000 binary. (x=0-7)"
		},{
			name:"BPLAMx=0",
			description:"This 8 bit field is XOR`ed with the 8 bit plane color\n\
address, thereby altering the color address sent to the\n\
color table. Default value is 00000000 binary. (x=0-7)"
		},{
			name:"BPLAMx=0",
			description:"This 8 bit field is XOR`ed with the 8 bit plane color\n\
address, thereby altering the color address sent to the\n\
color table. Default value is 00000000 binary. (x=0-7)"
		},{
			name:"BPLAMx=0",
			description:"This 8 bit field is XOR`ed with the 8 bit plane color\n\
address, thereby altering the color address sent to the\n\
color table. Default value is 00000000 binary. (x=0-7)"
		},{
			name:"BPLAMx=0",
			description:"This 8 bit field is XOR`ed with the 8 bit plane color\n\
address, thereby altering the color address sent to the\n\
color table. Default value is 00000000 binary. (x=0-7)"
		},
	]
});

/*
AMIGAREGISTERS.push(
{
	address: "",
	name:	 "",
	description:	"",
	bits:[
		{
			name:"",
			description:""
		},{
			name:"",
			description:""
		},{
			name:"",
			description:""
		},{
			name:"",
			description:""
		},{
			name:"",
			description:""
		},{
			name:"",
			description:""
		},{
			name:"",
			description:""
		},{
			name:"",
			description:""
		},{
			name:"",
			description:""
		},{
			name:"",
			description:""
		},{
			name:"",
			description:""
		},{
			name:"",
			description:""
		},{
			name:"",
			description:""
		},{
			name:"",
			description:""
		},{
			name:"",
			description:""
		},{
			name:"",
			description:""
		},
	]
});
*/
