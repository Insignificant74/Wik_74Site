window.onload = function () {
	const ImageLefts = document.querySelectorAll('.ImageLeft');
	const ImageRights = document.querySelectorAll('.ImageRight');
	
	const Index = document.querySelector('#Index');
	if (window.innerWidth > 900){
		Index.addEventListener('mouseover', function () {
			Index.classList.add('is-active');
		});
	
		Index.addEventListener('mouseout', function () {
			Index.classList.remove('is-active');
		});
		ImageLefts.forEach(resizeBackground);
		ImageRights.forEach(resizeBackground);
		
		window.addEventListener('resize', function(event) {
			ImageLefts.forEach(resizeBackground);
			ImageRights.forEach(resizeBackground);
		}, true);
	}
	else{
		Index.addEventListener('click', function () {
			Index.classList.toggle('is-active');
		});
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