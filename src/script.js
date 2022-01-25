'use strict';

let data = [];

let visibleData =[];

let currentIndex = 0;

const LOAD_COUNT = 5;

const main = document.getElementsByClassName('main')[0];

function init() {
 fetch('https://raw.githubusercontent.com/altkraft/for-applicants/master/frontend/titanic/passengers.json')
   .then(response => response.json())
   .then((result)=> {
       data = result; 

       const initialData = getData(currentIndex ,LOAD_COUNT); 

       visibleData = visibleData.concat(initialData); 

       currentIndex = currentIndex + LOAD_COUNT; 

       createElementInTable(initialData);
    });

}

function getData(index, count) {
    if ((index + count) > data.length) {
        count = data.length - index;
    }

    return data.slice(index, index+count);
}

init();


main.addEventListener('scroll', function(event) {
    if (main.clientHeight + main.scrollTop === main.scrollHeight) {
        const newData = getData(currentIndex ,LOAD_COUNT); 

        visibleData = visibleData.concat(newData); 

        currentIndex = currentIndex + LOAD_COUNT; 

        createElementInTable(newData);
    }
});

function findByName() {
	const name = document.getElementById("name").value;

	const searchResult = visibleData.filter(item => item.name.indexOf(name)!== -1);

	showSearchResult(searchResult);
}

function findByGender() {
	const gender = document.querySelector('input[name="gender"]:checked')?.value;

    const searchResult = visibleData.filter(item => item.gender === gender);

	showSearchResult(searchResult);
}

function findByAge() {
	const age = document.getElementById("age").value;

	const searchResult = visibleData.filter(item => item.age === +age);

	showSearchResult(searchResult);
}

function findBySurvived() {
	const survived = document.getElementById("survived").checked;

	const searchResult = visibleData.filter(item => item.survived === survived);

	showSearchResult(searchResult);
}


function showSearchResult(searchResult) {
    let output = document.getElementById("ul-output");

    output.innerHTML = "";
    
    searchResult.forEach(item => {
        const div = document.createElement('div');

        div.className = 'content';

        div.innerHTML =`
            <li>Name: ${item.name}</li>
            <li>Gender: ${item.gender}</li>
            <li>Age: ${Math.floor(item.age)}</li>
            <li>Survived: ${item.survived}</li>
        `;
        
        output.appendChild(div);
    });
}


function createElementInTable(arr) {
    const table = document.getElementById('ul');
  
    arr.forEach(item => {
        const div = document.createElement('div');

        div.className = 'content';

        div.innerHTML =`
            <li>Name: ${item.name}</li>
            <li>Gender: ${item.gender}</li>
            <li>Age: ${Math.floor(item.age)}</li>
            <li>Survived: ${item.survived}</li>
        `;
        
        table.appendChild(div);
    });
}
