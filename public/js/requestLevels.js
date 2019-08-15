
var create = function(level) {
	var newMap = document.createElement("div")
		, nameOfMap = document.createElement("p")
		, userName = document.createElement("p")
		, dataAndTime = document.createElement("p")
		, description = document.createElement("p")
		, image = document.createElement("img");

	nameOfMap.appendChild(document.createTextNode(level.name));
	userName.appendChild(document.createTextNode(level.author));
	dataAndTime.appendChild(document.createTextNode(level.date));
	description.appendChild(document.createTextNode(level.description));
	image.setAttribute('src', level.image);

	newMap.setAttribute("id", "answer");
	image.setAttribute('id', "vis");
	nameOfMap.setAttribute('id', "nom");
	userName.setAttribute('id', "usr");
	dataAndTime.setAttribute('id', "tim");
	description.setAttribute('id', "des");

	newMap.appendChild(nameOfMap);
	newMap.appendChild(userName);
	newMap.appendChild(description);
	newMap.appendChild(dataAndTime);
	newMap.appendChild(image);


	return newMap;
}


//Example of level info
let Veronika = {
    name: "BMSTU",
  	author: "Alexandrova",
    date: "11.08.2019 / 22:33",
    description: "Let's try it",
    image: "visual/ver.png"
}



var findLevel = function(name) {
    result.innerText = '';
	while (result.firstChild) {
        result.removeChild(first.firstChild)
    }
    fetch(`/levels/${name}`)
    .then(function (res) {
        console.log(res);
        return res.json();
    })
    .then(function (levels) {
        console.log(levels);
        levels.forEach(function (level) {
            result.appendChild(create(level));
        })
    })
}

//this for final version. 'Search' is something that you're trying to find
//document.getElementById("but1").addEventListener("click", function(){ findLevel(Search) });


var TryIt = function(level) {
	console.log(level);
	result.appendChild(create(level));
}

//but for testing it out use this
document.getElementById("but1").addEventListener("click", function(){ tryIt(Veronika) });
