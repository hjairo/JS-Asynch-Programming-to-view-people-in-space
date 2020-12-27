const astrosUrl = 'http://api.open-notify.org/astros.json';
const wikiUrl = 'https://en.wikipedia.org/api/rest_v1/page/summary/';
const peopleList = document.getElementById('people');
const btn = document.querySelector('button');

// Make an AJAX request
function getJSON(url, callback) { // doesnt have to be named 'callback'
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.onload = () => { // callback function start
    if(xhr.status === 200) {
      let data = JSON.parse(xhr.responseText);
      return callback(data);
    }
  }; // cb fn end
  xhr.send();
}

// Handles mapping over the astronauts
function getProfiles(json) {
  json.people.map(person => {
      getJSON(wikiUrl + person.name, generateHTML); // uses function as a variable so as to not execute function right away. Meaning, getJSON will call it back/invoke it, providing the data it needs when it becomes available.
    });
};

// Generate the markup for each profile. HTML template 
function generateHTML(data) {
  const section = document.createElement('section');
  peopleList.appendChild(section);
  section.innerHTML = `
    <img src=${data.thumbnail.source}>
    <h2>${data.title}</h2>
    <p>${data.description}</p>
    <p>${data.extract}</p>
  `;
}

btn.addEventListener('click', (event) => {
  getJSON(astrosUrl, getProfiles);
  event.target.remove();
});