Ti.UI.backgroundColor = '#222'
var firstpage = Titanium.UI.createWindow({  
    title:'Hello World Example',
    backgroundColor:'#fff'
});
getdisplaymsg("welcome to JustBooks");

var label1 = Titanium.UI.createLabel({
	color:'#999',
	text:'JustBooks',
	font:{fontSize:30,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'100%',
	height:'20%',
	top:'2%',
	left:'20%',

});

var label2 = Titanium.UI.createLabel({
	color:'#999',
	text:'Enter MemberShipNo',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'50%',
	height:'10%',
	top:'25%',
	left:'1%',

});


var textinput = Titanium.UI.createTextField({
	width:'50%',
	height:'10%',
	top:'25%',
	left:'50%',
});

var getMemDt = Titanium.UI.createButton({
	title:'Validate_MembershipNO',
	width:'70%',
	height:'10%',
	top:'40%',
	left:'10%',
});

getMemDt.addEventListener('click', getuserinfo);


/* {
 * 	
 
	
    
var n = Ti.UI.createNotification({message:"hello::"+ textinput.value});
	n.duration = Ti.UI.NOTIFICATION_DURATION_LONG;
	// Also valid is NOTIFICATION_DURATION_SHORT
 
	// Optionally, set the X & Y Offsets, by default
	n.offsetX = 100;
	n.offsetY = 75;
	// display the toast message
	n.show();

});*/



firstpage.add(textinput);
firstpage.add(getMemDt);
firstpage.add(label1);
firstpage.add(label2);
firstpage.open();

//funcitons

function getuserinfo(e){
	var data = textinput.value;
	if(data.length > 4 && data.charAt(0) == 'M')
	{
	getdisplaymsg(data);
	//call web serive 
	var responsedata = getmemberdetails(data);
	
	
	}
	else
	{
		getdisplaymsg("Plz enter correct MemberShip No");
	}

}

function getmemberdetails(data)
{
	
		var url = "http://jbserver2.interactivedns.com:800/memberships/"+data+"/rentals.xml";
		var xhr = Ti.Network.createHTTPClient({
   			 onload: function(e) {
        	// this function is called when data is returned from the server and available for use
        	// this.responseText holds the raw text return of the message (used for text/JSON)
        	// this.responseXML holds any returned XML (including SOAP)
        	// this.responseData holds any returned binary data
       		Ti.API.debug(this.responseText);
       		
        	alert('success');
        	var doc = this.responseXML.documentElement;
			displayResults(doc);
    		},
   			onerror: function(e) {
        	// this function is called when an error occurs, including a timeout
	        Ti.API.debug(e.error);
		    alert('error');
		    	
	    	},
	    	timeout:50000  /* in milliseconds */
		});
		
	var timeSHA="";
	var epoch = Math.round(new Date().getTime() / 1000);
	var addtime = 1267170461;
    timeSHA = SHA1(parseInt(epoch)+parseInt(addtime));   
  
	xhr.open("GET", url);
	xhr.setRequestHeader('Content-Type','text/csv');
	xhr.setRequestHeader('X-STRATA-TIME', epoch);
	xhr.setRequestHeader("X-STRATA-AUTH", timeSHA);
	xhr.setRequestHeader('X-STRATA-EMAIL','test@strata.co.in');
	xhr.send();  // request is actually sent with this statement	
   
     
	
}
//display results
function displayResults(responsedata)
{
	
	//var listview = Ti.UI.createImageView({
		
	//});
	
	//getElementsByTagName("someTag");
   myNodes=responsedata.getElementsByTagName("rental");
   //Extract the different values using a loop.
   for(var counter=0;counter<myNodes.length;counter++) {
		var bookname = myNodes.item(counter).getElementsByTagName("book-search-string").item(0).text;
		var mynextnodes = myNodes.item(counter).getElementsByTagName("book");
		
		for(var count1 = 0; count1< mynextnodes.length; count1++)
		{
			var mynextnodes1 = mynextnodes.item(count1).getElementsByTagName("title");
			
			
			
		    var titlename = mynextnodes1.item(0).getElementsByTagName("title").item(0).text;
				alert(titlename);
			var isbn = mynextnodes1.item(0).getElementsByTagName("isbn").item(0).text;
				alert(isbn);
		}       

   }
	
	
}
//display message

function getdisplaymsg(data){
	var n = Ti.UI.createNotification({message:"hello::"+ data});
	n.duration = Ti.UI.NOTIFICATION_DURATION_LONG;
	// Also valid is NOTIFICATION_DURATION_SHORT
 
	// Optionally, set the X & Y Offsets, by default
	n.offsetX = 100;
	n.offsetY = 75;
	// display the toast message
	n.show();
	
}



//sha1


function SHA1 (str) {
    // Calculate the sha1 hash of a string  
    // 
    // version: 1109.2015
    // discuss at: http://phpjs.org/functions/sha1
    // +   original by: Webtoolkit.info (http://www.webtoolkit.info/)
    // + namespaced by: Michael White (http://getsprink.com)
    // +      input by: Brett Zamir (http://brett-zamir.me)
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // -    depends on: utf8_encode
    // *     example 1: sha1('Kevin van Zonneveld');
    // *     returns 1: '54916d2e62f65b3afa6e192e6a601cdbe5cb5897'
    var rotate_left = function (n, s) {
        var t4 = (n << s) | (n >>> (32 - s));
        return t4;
    };
 
/*var lsb_hex = function (val) { // Not in use; needed?
        var str="";
        var i;
        var vh;
        var vl;
 
        for ( i=0; i<=6; i+=2 ) {
            vh = (val>>>(i*4+4))&0x0f;
            vl = (val>>>(i*4))&0x0f;
            str += vh.toString(16) + vl.toString(16);
        }
        return str;
    };*/
   //utf star
   
   function utf8_encode (argString) {
    // Encodes an ISO-8859-1 string to UTF-8  
    // 
    // version: 1109.2015
    // discuss at: http://phpjs.org/functions/utf8_encode
    // +   original by: Webtoolkit.info (http://www.webtoolkit.info/)
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: sowberry
    // +    tweaked by: Jack
    // +   bugfixed by: Onno Marsman
    // +   improved by: Yves Sucaet
    // +   bugfixed by: Onno Marsman
    // +   bugfixed by: Ulrich
    // +   bugfixed by: Rafal Kukawski
    // *     example 1: utf8_encode('Kevin van Zonneveld');
    // *     returns 1: 'Kevin van Zonneveld'
    if (argString === null || typeof argString === "undefined") {
        return "";
    }
 
    var string = (argString + ''); // .replace(/\r\n/g, "\n").replace(/\r/g, "\n");
    var utftext = "",
        start, end, stringl = 0;
 
    start = end = 0;
    stringl = string.length;
    for (var n = 0; n < stringl; n++) {
        var c1 = string.charCodeAt(n);
        var enc = null;
 
        if (c1 < 128) {
            end++;
        } else if (c1 > 127 && c1 < 2048) {
            enc = String.fromCharCode((c1 >> 6) | 192) + String.fromCharCode((c1 & 63) | 128);
        } else {
            enc = String.fromCharCode((c1 >> 12) | 224) + String.fromCharCode(((c1 >> 6) & 63) | 128) + String.fromCharCode((c1 & 63) | 128);
        }
        if (enc !== null) {
            if (end > start) {
                utftext += string.slice(start, end);
            }
            utftext += enc;
            start = end = n + 1;
        }
    }
 
    if (end > start) {
        utftext += string.slice(start, stringl);
    }
 
    return utftext;
}
   
   //utf stop
 
    var cvt_hex = function (val) {
        var str = "";
        var i;
        var v;
 
        for (i = 7; i >= 0; i--) {
            v = (val >>> (i * 4)) & 0x0f;
            str += v.toString(16);
        }
        return str;
    };
 
    var blockstart;
    var i, j;
    var W = new Array(80);
    var H0 = 0x67452301;
    var H1 = 0xEFCDAB89;
    var H2 = 0x98BADCFE;
    var H3 = 0x10325476;
    var H4 = 0xC3D2E1F0;
    var A, B, C, D, E;
    var temp;
 
    str = utf8_encode(str);
    var str_len = str.length;
 
    var word_array = [];
    for (i = 0; i < str_len - 3; i += 4) {
        j = str.charCodeAt(i) << 24 | str.charCodeAt(i + 1) << 16 | str.charCodeAt(i + 2) << 8 | str.charCodeAt(i + 3);
        word_array.push(j);
    }
 
    switch (str_len % 4) {
    case 0:
        i = 0x080000000;
        break;
    case 1:
        i = str.charCodeAt(str_len - 1) << 24 | 0x0800000;
        break;
    case 2:
        i = str.charCodeAt(str_len - 2) << 24 | str.charCodeAt(str_len - 1) << 16 | 0x08000;
        break;
    case 3:
        i = str.charCodeAt(str_len - 3) << 24 | str.charCodeAt(str_len - 2) << 16 | str.charCodeAt(str_len - 1) << 8 | 0x80;
        break;
    }
 
    word_array.push(i);
 
    while ((word_array.length % 16) != 14) {
        word_array.push(0);
    }
 
    word_array.push(str_len >>> 29);
    word_array.push((str_len << 3) & 0x0ffffffff);
 
    for (blockstart = 0; blockstart < word_array.length; blockstart += 16) {
        for (i = 0; i < 16; i++) {
            W[i] = word_array[blockstart + i];
        }
        for (i = 16; i <= 79; i++) {
            W[i] = rotate_left(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);
        }
 
 
        A = H0;
        B = H1;
        C = H2;
        D = H3;
        E = H4;
 
        for (i = 0; i <= 19; i++) {
            temp = (rotate_left(A, 5) + ((B & C) | (~B & D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B, 30);
            B = A;
            A = temp;
        }
 
        for (i = 20; i <= 39; i++) {
            temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B, 30);
            B = A;
            A = temp;
        }
 
        for (i = 40; i <= 59; i++) {
            temp = (rotate_left(A, 5) + ((B & C) | (B & D) | (C & D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B, 30);
            B = A;
            A = temp;
        }
 
        for (i = 60; i <= 79; i++) {
            temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B, 30);
            B = A;
            A = temp;
        }
 
        H0 = (H0 + A) & 0x0ffffffff;
        H1 = (H1 + B) & 0x0ffffffff;
        H2 = (H2 + C) & 0x0ffffffff;
        H3 = (H3 + D) & 0x0ffffffff;
        H4 = (H4 + E) & 0x0ffffffff;
    }
 
    temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);
    return temp.toLowerCase();
}