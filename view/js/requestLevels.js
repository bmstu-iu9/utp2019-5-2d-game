/*module.exports.createLelelElement = function(level) {
	var newMap = document.createElement("div")
		, nameOfMap = document.createElement("p")
		, userName = document.createElement("p")
		, dataAndTime = document.createElement("p")
		, description = document.createElement("p")
		, image = document.createElement("img");

	nameOfMap.appendChild(document.createTextNode(level.nameOfMap));
	userName.appendChild(document.createTextNode(level.userName));
	dataAndTime.appendChild(document.createTextNode(level.dataAndTime));
	description.appendChild(document.createTextNode(level.description));
	image.setAttribute('src', level.image);

	newMap.appendChild(nameOfMap);
	newMap.appendChild(userName);
	newMap.appendChild(description);
	newMap.appendChild(dataAndTime);
	newMap.appendChild(image);

	return newMap;
}


//Example of level in fucntion createLelelElement, that's what I need in json file: nameOfMap, userName, data, description, source of image;
//Could be changed in the future
let Veronika = {
	nameOfMap: "BMSTU",
	userName: "Alexandrova",
	dataAndTime: "11.08.2019 / 22:33",
	description: "Let's try it",
	image: "ver.jpg"
}



//Same goes for output, for each level

module.exports.requestLevel = function() {
	fetch('/levels')
	.then(function(res) { return res.json(); })
	.then(function(levels) {
		levels.foreach(level => {
			let element = createLevelElement(level);
			levelList.appendChild(element);
		})
	})
}

document.getElementById("but1").addEventListener("click", requestLevel);


*/


var create = function(level) {
	var newMap = document.createElement("div")
		, nameOfMap = document.createElement("p")
		, userName = document.createElement("p")
		, dataAndTime = document.createElement("p")
		, description = document.createElement("p")
		, image = document.createElement("img");

	nameOfMap.appendChild(document.createTextNode(level.nameOfMap));
	userName.appendChild(document.createTextNode(level.userName));
	dataAndTime.appendChild(document.createTextNode(level.dataAndTime));
	description.appendChild(document.createTextNode(level.description));
	image.setAttribute('src', level.image);

	newMap.setAttribute("id", "Lalal");
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

let Veronika = {
    nameOfMap: "BMSTU",
    userName: "Alexandrova",
    dataAndTime: "11.08.2019 / 22:33",
    description: "Let's try it",
    image: "visual/ver.png"
}



var tryIt = function(level) {
	var element = create(level);
	result.appendChild(element);
}


document.getElementById("but1").addEventListener("click", function(){ tryIt(Veronika) });
