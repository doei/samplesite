//Debug checkbox Handler
var debugInput = document.querySelector("input");
function updateDebugState() {
   document.body.classList.toggle('debug-on', debugInput.checked);
}
debugInput.addEventListener("click", updateDebugState);


//hide/show nav
var wrapper = document.querySelector('.wrapper')
var nav = document.querySelector('nav');
var oldpos = wrapper.scrollTop;

wrapper.onscroll = navtoggle;

function navtoggle () {
	newpos = wrapper.scrollTop;
	var delta = oldpos -newpos;
	if (delta < -60) {
		nav.classList.add('hidden');
		oldpos = newpos;
	} else if(delta > 60){
		nav.classList.remove('hidden');
		oldpos = newpos;
	}
}


// scrolling functions
var links = document.querySelectorAll('a');
var requestId = 0;
var vector;
var targetposition;
var timetosection = 0.6;
var fps = 60;
var pxperframe;
var trip;
var scrolled;

//adding the event listener to all nav buttons
for (i = 0; i<4; i++) {
	links[i].addEventListener('click', scrollzinit);
} 


function scrollzinit (el) {
	var id = el.target.id 
	for (i=4; i < 8 ; i++) {
		if (links[i].id == id) {
			if(id == 'about') {
				targetposition = 2293
			} else  {
				targetposition =  links[i].offsetParent.offsetTop;				
			}
			vector = targetposition - wrapper.scrollTop;
			pxperframe = vector / timetosection / fps;
			trip = Math.abs(vector);
			scrolled = 0;
			scrollz();
		}
	}
}

function scrollz () {
	wrapper.scrollTop += pxperframe;
	scrolled += Math.abs(pxperframe);
	if ( scrolled >= trip ) {
		window.cancelAnimationFrame(requestId);
		wrapper.scrollTop = targetposition;
	} else {
		requestId = window.requestAnimationFrame(scrollz);
	}
};




/////////////DEBUG
	// console.log('TARGET NAME :' + links[i].id);
	// console.log('SCROLLED :' + scrolled);
	// console.log('targetposition :' + targetposition);
	// console.log('PXPERFRAME :' + pxperframe);
	// console.log('PXPERFRAME/2 :' + pxperframe);
	// console.log('POSITION:' + wrapper.scrollTop);
	// 	console.log('>>>>>>STOPPED<<<<<<')



