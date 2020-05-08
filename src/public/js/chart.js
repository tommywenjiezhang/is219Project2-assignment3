
(function ($) {

    google.charts.load('current', {
        'packages':['geochart',"corechart"],
        // Note: you will need to get a mapsApiKey for your project.
        // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
        'mapsApiKey': GOOGLE_API_KEY
    });
    google.charts.setOnLoadCallback(drawRegionsMap);
    google.charts.setOnLoadCallback(drawChart);

})(jQuery);

function drawChart() {

    fetch("/city/api").then((res) =>res.json()).then((cities) => {
        let dataArray = [];
        cities.forEach((city) => {
            let item =[city["cityName"], city['population']]
            dataArray.push(item)
        })
        var data = google.visualization.arrayToDataTable([
            ["City", "Population"],
            ...dataArray
        ]);

        var view = new google.visualization.DataView(data);

        var options = {
            title: "Population By Cities",
            width: 700,
            height: 400,
            bar: {groupWidth: "95%"},
            legend: { position: "none" },
        };
        var chart = new google.visualization.BarChart(document.getElementById("barchart_values"));
        chart.draw(view, options);
    })

}


function drawRegionsMap() {
    fetch("/city/api").then((res) =>res.json()).then((data => {
         let dataArr = [];
         let tranform = [];
         data.forEach( (city) => {
             let country = {};
             if(!country[city. country]){
                 country[city.country] = city.population;
             }
             else{
                 country[city.country] += city.population;
             }
             tranform.push(country);
         })
            console.log(tranform)
         for(let i=0; i<tranform.length; i++){
             let item = [
                 Object.keys(tranform[i])[0],
                 Object.values(tranform[i])[0]
             ]
             dataArr.push(item)
         }

        var data = google.visualization.arrayToDataTable([
            ['Country', 'Popularity'],
            ...dataArr
        ]);
        let width = document.getElementById("chart").parentNode.getBoundingClientRect().width;
        console.log(width)
        var options = { title: "Density of Precious Metals, in g/cm^3" ,
            width:700, colorAxis: {colors: ['#fcb045', '#f12711']},
            backgroundColor: '#81d4fa',
            legend:{textStyle: { fontSize: 16}}
        };

        var chart = new google.visualization.GeoChart(document.getElementById('chart'));

        chart.draw(data, options);

    }))
}





// var record=[];
// function drawChart(){
//     let h = 0.56 * $('#map').parent().height();
//     let w  =  $('#map').parent().width();
//     var projection = d3.geoMercator()
//         .scale(1)
//         .translate([0, 0]);
//
//     var path = d3.geoPath().projection(projection);
//
// // set-up svg canvas
//     var svg = d3.select("#map").append("svg")
//         .attr("height", h)
//         .attr("width", w);
//     var color = d3.scaleLinear()
//         .range(["blue", "red"]);
//     var showValue= "population";
//
//
//     var linear = d3.scaleLinear()
//         .range(["blue", "red"]);
//
//     function addRecord(d) {
//         d[showValue] = +d[showValue];
//         var obj = {key: d.cityName, value: d[showValue]};
//         record.push(obj);
//         return d;
//     }
//
//     fetch('/city/api')
//         .then(res => res.json())
//         .then(addRecord)
//         .then((data) => {
//         color.domain(d3.extent(data, function(d){
//             d[showValue] +=d[showValue];
//             return d[showValue]
//         }));
//         linear.domain(d3.extent(data, function(d){
//             d[showValue] +=d[showValue];
//             return d[showValue];
//         }));
//         })
//         .catch((err) => {
//         console.log(err)
//     });
//
//     d3.json("/static/asset/countries.geo.json")
//         .then((data) =>{
//             console.log(data.features)
//             var world = data.features;
//
//             var b = path.bounds(data),
//                 s = .95 / Math.max((b[1][0] - b[0][0]) / w, (b[1][1] - b[0][1]) / h),
//                 t = [(w - s * (b[1][0] + b[0][0])) / 2, (h - s * (b[1][1] + b[0][1])) / 2];
//             projection.scale(s)
//                 .translate(t);
//             projection.scale(s)
//                 .translate(t);
//
//             svg.selectAll("path")
//                 .data(world).enter()
//                 .append("path")
//                 .style("fill", getColor)
//                 .style("stroke", "grey")
//                 .style("stroke-width", "1px")
//                 .attr("d", path)
//                 .on("mouseover", function(d, i) {
//                     reporter(d);
//                 });
//
//             svg.append("g")
//                 .attr("class", "legendLinear")
//                 .attr("transform", "translate(20,20)");
//
//             var legendLinear = d3.legend.color()
//                 .shapeWidth(60)
//                 .scale(linear);
//
//             svg.select(".legendLinear")
//                 .call(legendLinear);});
//
// function getColor(data){
//     var value=-1;
//     record.forEach(function(d){
//         if(data.name === d.key){
//             value = d.value;
//
//         }
//     });
//     if(value==-1){
//         return "none";
//     }
//     return color(value);
// }
//
//
// }
//
//
//
//
// function reporter(x) {
//     console.log(x);
//     var value = "Not known";
//     record.forEach(function(d){
//         if(x.name === d.key){
//             value = d.value;
//
//         }
//     });
//     d3.select("#report").text(function() {
//         return x.name+": "+value;
//     });
//
// }
//
//
// // set-up unit projection and path
//
