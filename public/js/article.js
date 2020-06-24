
function clickstar(id){
	var element = document.getElementById("s"+id);
	if (element.classList.contains("empty")){
		color(id);
	} else if (element.classList.contains("filled")){
		decolor(id);
	}
}

function color(id){
	for (var i=1; i<= id; i++){
		var element = document.getElementById("s"+i);
		element.classList.remove("empty");
		element.classList.add("filled");
		element.innerHTML = "<i class='fas fa-star'></i>";
	}
}

function decolor(id){
	for (var i = id+1; i <= 5; i++){
		var element = document.getElementById("s"+i);
		element.classList.remove("filled");
		element.classList.add("empty");
		element.innerHTML = "<i class='far fa-star'></i>";
	}
}
