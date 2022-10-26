var containers = document.getElementsByClassName('container');

function fadeOutOnScroll(element) {
	if (!element) {
		return;
	}
	
	var distanceToTop = window.pageYOffset + element.getBoundingClientRect().top;
	var elementHeight = element.offsetHeight;
	var scrollTop = document.documentElement.scrollTop;
	
	var opacity = 1;
	
	if (scrollTop > distanceToTop) {
		opacity = 1 - (scrollTop - distanceToTop) / elementHeight;
        opacity = Math.max(0.3,opacity)
	}
	
	if (opacity >= 0) {
		element.style.opacity = opacity;
	}
}

function scrollHandler() {
    for(var i=0;i<containers.length;i++)
        fadeOutOnScroll(containers[i]);
}

window.addEventListener('scroll', scrollHandler);