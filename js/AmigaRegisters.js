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
	address: "BFED01",
	name:	 "icr",
	description:	"CIAA ICR",
	note: "Questo registro controlla gli interrupt generabili dal CIAA.\n\
Ogni interrupt risulta abilitato se il corrispondente bit della maschera X settato ad 1, infatti ogni interrupt CIAA, come farebbe con un INTREQ ($dff09c), setta il suo bit di richiesta in questo registro.\n\
A questo punto, se tale interrupt e' abilitato, si setta il bit 7 (IR), che  una specie di set/clr bit, come in dmacon, ossia \n\
quando tale bit e' azzerato gli altri 6 bit settati sono azzerati, quando il bit 7 e' settato, invece, gli altri bit settati sono settati,\n\ mentre quelli a zero non vengono modificati.\n\
La cosa che puo' confondere e' che quando si legge il registro il suo contenuto viene azzerato, sia che si faccia un 'tst.b $bfed01' che qualsiasi azione di lettura.\n\
Azzerando il registro si elimina anche la richiesta di interrupt, in modo analogo all' azzeramento dei bit di INTREQ ($dff09c).\n\
",
	bits:[
		{
			name:"IT",
			description:"If 1 there's an active interrupt"
		},{
			name:"",
			description:""
		},{
			name:"",
			description:""
		},{
			name:"FLG",
			description:""
		},{
			name:"SP",
			description:"If 1 there's an active interrupt from the keyboard"
		},{
			name:"ALRM",
			description:""
		},{
			name:"TB",
			description:""
		},{
			name:"TA",
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
	address: "DFF018",
	name:	 "SERDATR",
	description:	"Serial port data and status read.",
	note: "This address reads data from a recive data buffer. Data in this\n\
buffer is loaded from a receiving shift register whenever it is full.\n\
Several interrupt request bits are also read at this address, along\n\
with the data as shown below.",
	bits:[
		{
			name:"DB0",
			description:"Data bit."
		},{
			name:"DB1",
			description:"Data bit."
		},{
			name:"DB2",
			description:"Data bit."
		},{
			name:"DB3",
			description:"Data bit."
		},{
			name:"DB4",
			description:"Data bit."
		},{
			name:"DB5",
			description:"Data bit."
		},{
			name:"DB6",
			description:"Data bit."
		},{
			name:"DB7",
			description:"Data bit."
		},{
			name:"STP-DB8",
			description:"Stop bit if LONG, data bit if not."
		},{
			name:"STP",
			description:"Stop bit"
		},{
			name:"X",
			description:"Not used."
		},{
			name:"RXD",
			description:"RXD pin receives UART serial data for direct bit test by the micro."
		},{
			name:"TSRE",
			description:"Serial port transmit shift reg. empty"
		},{
			name:"TBE",
			description:"Serial port transmit buffer empty (mirror)"
		},{
			name:"RBF",
			description:"Serial port receive buffer full (mirror)"
		},{
			name:"OVRUN",
			description:"Serial port receiver overun"
		}
	]
});

AMIGAREGISTERS.push(
{
	address: "DFF030",
	name:	 "SERDAT",
	note:	"This address writes data to a transmit data buffer. Data from this\n\
buffer is moved into a serial shift register for output transmission\n\
whenever it is empty. This sets the interrupt request TBE\n\
(transmit buffer empty).\n\
A stop bit must be provided as part of the data word.\n\
The length of the data word is set by the position of the stop bit.\n",
	description:	"Serial port data and stop bits write",
	bits:[
		{
			name:"D0",
			description:"Data bit."
		},{
			name:"D1",
			description:"Data bit."
		},{
			name:"D2",
			description:"Data bit."
		},{
			name:"D3",
			description:"Data bit."
		},{
			name:"D4",
			description:"Data bit."
		},{
			name:"D5",
			description:"Data bit."
		},{
			name:"D6",
			description:"Data bit."
		},{
			name:"D7",
			description:"Data bit."
		},{
			name:"D8",
			description:"Data bit."
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
		}
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
	address: "DFF042",
	name:	 "BLTCON1",
	description:	"Blitter control register 0 - (lower 8 bits) This is to speed up software - the upper bits are often the same.",
	note: "",
	bits:[
		{
			name:"LINE(=0)",
			description:"Line mode control bit"
		},{
			name:"DESC",
			description:"Descending (dec address)control bit"
		},{
			name:"FCI",
			description:"Fill carry input"
		},{
			name:"IFE",
			description:"Inclusive fill enable"
		},{
			name:"EFE",
			description:"Exclusive fill enable"
		},{
			name:"0",
			description:""
		},{
			name:"0",
			description:""
		},{
			name:"DOFF",
			description:"Disables the D output- for external ALUs\n\
The cycle occurs normally, but the data\n\
bus is tristate (hires chips only)"
		},{
			name:"0",
			description:""
		},{
			name:"0",
			description:""
		},{
			name:"0",
			description:""
		},{
			name:"0",
			description:""
		},{
			name:"BSH1",
			description:"Shift value of B source and line texture"
		},{
			name:"BSH2",
			description:"Shift value of B source and line texture"
		},{
			name:"BSH3",
			description:"Shift value of B source and line texture"
		},{
			name:"BSH4",
			description:"Shift value of B source and line texture"
		},
	]
});

AMIGAREGISTERS.push(
{
	address: "DFF044",
	name:	 "BLTAFWM",
	description:	"Blitter first word mask for source A",
	note: "La prima word di ogni riga (cioe` la word piu` a sinistra) e' andizzata con BLTAFWM \n\
E` importante notare che le maschere vengono applicate ai dati PRIMA di eseguire lo SHIFT. I canali B e C non hanno invece la possibilita` di mascherare le words lette.\n\
Questo registro va impostato a $ffff per il fill mode o per disegnare una linea continua",
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

AMIGAREGISTERS.push(
{
	address: "DFF046",
	name:	 "BLTALWM",
	description:	"Blitter last word mask for source A",
	note: "La ultima word di ogni riga (cioe` la word piu` a sinistra) e' andizzata con BLTALWM \n\
E` importante notare che le maschere vengono applicate ai dati PRIMA di eseguire lo SHIFT. I canali B e C non hanno invece la possibilita` di mascherare le words lette.\n\
Questo registro va impostato a $ffff per il fill mode o per disegnare una linea continua",
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
	address: "DFF060",
	name:	 "BLTCMOD",
	description:	"Blitter modulo for source C",
	note : "I valori del modulo sono \n\
in byte, non words. Siccome il blitter pur operare solo su words, il bit meno\n\
significativo h ignorato, questo significa che il valore del modulo deve essere\n\
pari.\n\
Il valore, positivo o negativo, viene aggiunto automaticamente ai registri che\n\
puntano agli indirizzi (BLTxPT) ogni volta che il blitter ha finito di copiare\n\
una riga, in modo da calcolare l'indirizzo della prima word della riga\n\
successiva.",
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
		}
	]
});

AMIGAREGISTERS.push(
{
	address: "DFF062",
	name:	 "BLTBMOD",
	description:	"Blitter modulo for source B",
	note : "I valori del modulo sono \n\
in byte, non words. Siccome il blitter pur operare solo su words, il bit meno\n\
significativo h ignorato, questo significa che il valore del modulo deve essere\n\
pari.\n\
Il valore, positivo o negativo, viene aggiunto automaticamente ai registri che\n\
puntano agli indirizzi (BLTxPT) ogni volta che il blitter ha finito di copiare\n\
una riga, in modo da calcolare l'indirizzo della prima word della riga\n\
successiva.",
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
		}
	]
});

AMIGAREGISTERS.push(
{
	address: "DFF064",
	name:	 "BLTAMOD",
	description:	"Blitter modulo for source A",
	note : "I valori del modulo sono \n\
in byte, non words. Siccome il blitter pur operare solo su words, il bit meno\n\
significativo h ignorato, questo significa che il valore del modulo deve essere\n\
pari.\n\
Il valore, positivo o negativo, viene aggiunto automaticamente ai registri che\n\
puntano agli indirizzi (BLTxPT) ogni volta che il blitter ha finito di copiare\n\
una riga, in modo da calcolare l'indirizzo della prima word della riga\n\
successiva.",
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
		}
	]
});

AMIGAREGISTERS.push(
{
	address: "DFF066",
	name:	 "BLTDMOD",
	description:	"Blitter modulo for source D",
	note : "I valori del modulo sono \n\
in byte, non words. Siccome il blitter pur operare solo su words, il bit meno\n\
significativo h ignorato, questo significa che il valore del modulo deve essere\n\
pari.\n\
Il valore, positivo o negativo, viene aggiunto automaticamente ai registri che\n\
puntano agli indirizzi (BLTxPT) ogni volta che il blitter ha finito di copiare\n\
una riga, in modo da calcolare l'indirizzo della prima word della riga\n\
successiva.",
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
		}
	]
});

AMIGAREGISTERS.push(
{
	address: "DFF096",
	name:	 "DMACON",
	description:	"DMA Control write (clear or set)",
	note : "",
	bits:[
		{
			name:"AUD0EN",
			description:"Audio channel 0 DMA enable"
		},{
			name:"AUD1EN",
			description:"Audio channel 1 DMA enable"
		},{
			name:"AUD2EN",
			description:"Audio channel 2 DMA enable"
		},{
			name:"AUD3EN",
			description:"Audio channel 3 DMA enable"
		},{
			name:"DSKEN",
			description:"Disk DMA enable"
		},{
			name:"SPREN",
			description:"Sprite DMA enable"
		},{
			name:"BLTEN",
			description:"Blitter DMA enable"
		},{
			name:"COPEN",
			description:"Coprocessor DMA enable"
		},{
			name:"BPLEN",
			description:"Bit plane DMA enable"
		},{
			name:"DMAEN",
			description:"Enable all DMA below (also UHRES DMA)"
		},{
			name:"BLTPRI",
			description:"Blitter DMA priority (over CPU micro)\n\
(also called blitter nasty)\n\
(disables /BLS pin, preventing micro\n\
from stealing any bus cycles while\n\
blitter DMA is running)"
		},{
			name:"X",
			description:""
		},{
			name:"X",
			description:""
		},{
			name:"BZERO",
			description:"Blitter logic zero status bit (read only)"
		},{
			name:"BBUSY",
			description:"Blitter busy status bit (read only)"
		},{
			name:"SET/CLR	",
			description:"Set/Clear control bit. Determines if bits\n\
written with a 1 get set or cleared\n\
Bits written with a zero are unchanged"
		}
	]
});

AMIGAREGISTERS.push(
{
	address: "DFF09A",
	name:	 "INTENA",
	description:	"This register contains interrupt enable bits. The bit assignment for both the request, and enable registers is given below.",
	note : "",
	bits:[
		{
			name:"TBE",
			description:"Serial port transmit buffer empty (level 1)"
		},{
			name:"DSKBLK",
			description:"Disk block finished (level 1)"
		},{
			name:"SOFT",
			description:"Reserved for software initiated interrupt (level 1)"
		},{
			name:"PORTS",
			description:"I/O Ports and timers (level 2)"
		},{
			name:"COPER",
			description:"Coprocessor (level 3)"
		},{
			name:"VERTB",
			description:"Start of vertical blank (level 3)"
		},{
			name:"BLIT",
			description:"Blitter has finished (level 3)"
		},{
			name:"AUD0",
			description:"Audio channel 0 block finished (level 4)"
		},{
			name:"AUD1",
			description:"Audio channel 1 block finished (level 4)"
		},{
			name:"AUD2",
			description:"Audio channel 2 block finished (level 4)"
		},{
			name:"AUD3",
			description:"Audio channel 3 block finished (level 4)"
		},{
			name:"RBF",
			description:"Serial port receive buffer full (level 5)"
		},{
			name:"DSKSYN",
			description:"Disk sync register (DSKSYNC) matches disk (level 5)"
		},{
			name:"EXTER",
			description:"External interrupt (Level 6)"
		},{
			name:"INTEN",
			description:"Master interrupt (enable only, no request)"
		},{
			name:"SET/CLR	",
			description:"Set/Clear control bit. Determines if bits\n\
written with a 1 get set or cleared\n\
Bits written with a zero are unchanged"
		}
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
	address: "DFF104",
	name:	 "BPLCON2",
	description:	"Bit Plane Control Register (new control bits)",
	bits:[
		{
			name:"PF1P0",
			description:"Playfield 1 priority code (with resp. to sprites)."
		},
		{
			name:"PF1P1",
			description:"Playfield 1 priority code (with resp. to sprites)."
		},
		{
			name:"PF1P2",
			description:"Playfield 1 priority code (with resp. to sprites)."
		},
		{
			name:"PF2P0",
			description:"Playfield 2 priority code (with resp. to sprites)."
		},
		{
			name:"PF2P1",
			description:"Playfield 2 priority code (with resp. to sprites)."
		},
		{
			name:"PF2P2",
			description:"Playfield 2 priority code (with resp. to sprites)."
		},
		{
			name:"PF2PRI",
			description:"Gives playfield 2 priority over playfield 1."
		},
		{
			name:"SOGEN=0",
			description:"When set causes SOG output pin to go high"
		},
		{
			name:"RDRAM=0",
			description:"Causes color table address to read the color table instead of writing to it."
		},
		{
			name:"KILLEHB",
			description:"Disables extra halfbrite mode."
		},
		{
			name:"ZDCTEN",
			description:"Causes ZD pin to mirror bit #15 of the active entry in high color table. When ZDCTEN is reset ZD reverts to mirroring color (0)."
		},
		{
			name:"ZDBPEN",
			description:"Causes ZD pin to mirror bitplane selected by ZDBPSELx bits. This does not disable the ZD mode defined by ZDCTEN, but rather is 'ored' with it."
		},
		{
			name:"ZDBPSEL0",
			description:"3 bit field which selects which bitplane is to be used for ZD when ZDBBPEN is set- 000 selects BB1 and 111 selects BP8."
		},
		{
			name:"ZDBPSEL1",
			description:"3 bit field which selects which bitplane is to be used for ZD when ZDBBPEN is set- 000 selects BB1 and 111 selects BP8."
		},
		{
			name:"ZDBPSEL2",
			description:"3 bit field which selects which bitplane is to be used for ZD when ZDBBPEN is set- 000 selects BB1 and 111 selects BP8."
		},
		{
			name:"x",
			description:"don`t care- but drive to 0 for upward compatibility"
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
