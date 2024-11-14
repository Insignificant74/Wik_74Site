window.onload = function () {
	formatTextBoxes.call();
	resizeImages.call();
	setToggleIndex.call();
}
function setToggleIndex(){
	const Index = document.getElementById('Index');
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
function formatTextBoxes(){
	const TextBoxes = document.querySelectorAll('.TextBox');
	var counter = 3;
	TextBoxes.forEach((textBox) => {
		counter++;
		textBox.style.backgroundImage = "url(Assets/Paper_Middle_" + counter + ".png)";
		console.log("url(\"Paper_Middle_" + counter + ".png\")");
		if (counter == 4){
			counter = 0;
		}
	});
}