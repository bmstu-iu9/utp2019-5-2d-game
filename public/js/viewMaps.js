var create = function(level) {
    var newMap = document.createElement("div")
        , nameOfMap = document.createElement("p")
        , sizeOfMap = document.createElement("p")
        , dataAndTime = document.createElement("p")
        , description = document.createElement("p")
        , image = document.createElement("img");

    nameOfMap.appendChild(document.createTextNode(level.name));
    sizeOfMap.appendChild(document.createTextNode(level.size));
    dataAndTime.appendChild(document.createTextNode(level.date));
    description.appendChild(document.createTextNode(level.description));
    image.setAttribute('src', level.image);
    image.setAttribute('onclick', "location.href='" + id + "'");


    newMap.setAttribute('class', "answer");
    image.setAttribute('class', "vis");
    nameOfMap.setAttribute('class', "nom");
    sizeOfMap.setAttribute('class', "sizeLab");
    dataAndTime.setAttribute('class', "tim");
    description.setAttribute('class', "des");

    newMap.appendChild(nameOfMap);
    newMap.appendChild(sizeOfMap);
    newMap.appendChild(description);
    newMap.appendChild(dataAndTime);
    newMap.appendChild(image);

    return newMap;
}



//Example of level info
let Veronika = {
	name: "BMSTU",
	date: "11.08.2019 / 22:33",
	description: "Let's try it",
	image: "visual/ver.png",
  size: "10x25",
  id: "creation"
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
//document.getElementById("nameLab").addEventListener("click", findLevel(Search) );


var tryIt = function(level) {
	console.log(level);
	result.appendChild(create(level));
}

//but for testing it out use this
document.getElementById("nameLab").addEventListener("click", tryIt(Veronika) );
