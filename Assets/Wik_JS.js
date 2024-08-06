window.onload = function () {
	const Index = document.querySelector('#Index');
	if (window.innerWidth > 900){
		Index.addEventListener('mouseover', function () {
			Index.classList.add('is-active');
		});
	
		Index.addEventListener('mouseout', function () {
			Index.classList.remove('is-active');
		});
	}
	else{
		Index.addEventListener('click', function () {
			Index.classList.toggle('is-active');
		});
	}
}