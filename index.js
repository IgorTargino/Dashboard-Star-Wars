const charactersCount = document.getElementById("characters");
const moonsCount = document.getElementById("moons");
const planetsCount = document.getElementById("planets");
const shipsCount = document.getElementById("space-ships");

const getData = (param) => {
  return axios.get(`https://swapi.dev/api/${param}`);
}

const fillCounters = () => {
  Promise.all([getData("people/"), getData("vehicles/"), getData("planets/"), getData("starships/")])
    .then(function (results) {
      console.log(results);
      charactersCount.innerHTML = results[0].data.count;
      moonsCount.innerHTML = results[1].data.count;
      planetsCount.innerHTML = results[2].data.count;
      shipsCount.innerHTML = results[3].data.count;
    });
}

const fillTable = async () => {
  const { data } = await getData('films/');
  const filmsData = data.results;
  filmsData.forEach(film => {
    $("#films-table").append(`<tr>
    <td>${film.title}</td>
    <td>${moment(film.release_date).format("DD/MM/YYYY")}</td>
    <td>${film.director}</td>
    <td>${film.episode_id}</td>
    </tr>`);
  });
}

const drawChart = async () => {
  const response = await getData("vehicles/");
  const vehiclesArray = response.data.results;

  const dataArray = [];
  vehiclesArray.forEach(vehicle => {
    dataArray.push([vehicle.name, Number(vehicle.passengers)]);
  });

  var data = new google.visualization.DataTable(dataArray);
  data.addColumn('string', 'Topping');
  data.addColumn('number', 'Slices');
  data.addRows(dataArray);

  var options = {'title':'Número de passageiros por veículos',
                 'width':400,
                 'height':300};

  var chart = new google.visualization.PieChart(document.getElementById('chart'));
  chart.draw(data, options);
}

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

fillCounters();
fillTable();


