function resizeImages(){
	const ImageLefts = document.querySelectorAll('.ImageLeft');
	const ImageRights = document.querySelectorAll('.ImageRight');
	if (window.innerWidth > 900){
		ImageLefts.forEach(resizeBackground);
		ImageRights.forEach(resizeBackground);
		
		window.addEventListener('resize', function(event) {
			ImageLefts.forEach(resizeBackground);
			ImageRights.forEach(resizeBackground);
		}, true);
	}
}
function resizeBackground(element){
	const elementHeight = element.offsetHeight;
	var parentElement = element.parentElement;
	
	if (parentElement.nodeName == 'A'){
		parentElement = parentElement.parentElement;
	};

	if (parentElement.offsetHeight < elementHeight) {
		parentElement.style.height = `${elementHeight}px`;
	}
}