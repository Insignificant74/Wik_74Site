window.onload = function () {
	const Index = document.querySelector('#Index');

	Index.addEventListener('mouseover', function () {
		Index.classList.add('is-active');
	});

	Index.addEventListener('mouseout', function () {
		Index.classList.remove('is-active');
	});
}