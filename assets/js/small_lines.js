var widthsmall=75, heightsmall=25;

// The number of datapoints
var n = 200;

// 5. X scale will use the index of our data
var xScale0 = d3.scaleLinear()
    .domain([0, n-1]) // input
    .range([0, widthsmall]); // output

// 6. Y scale will use the randomly generate number 
var yScale0 = d3.scaleLinear()
    .domain([0, 2700]) // input 
    .range([heightsmall, 0]); // output 

// 7. d3's line generator
var line0 = d3.line()
    .x(function(d, i) { return xScale0(i); }) // set the x values for the line generator
    .y(function(d) { return yScale0(d.y0); }) // set the y values for the line generator 
    .curve(d3.curveMonotoneX) // apply smoothing to the line

var line25 = d3.line()
    .x(function(d, i) { return xScale0(i); }) // set the x values for the line generator
    .y(function(d) { return yScale0(d.y25); }) // set the y values for the line generator 
    .curve(d3.curveMonotoneX) // apply smoothing to the line

var line50 = d3.line()
    .x(function(d, i) { return xScale0(i); }) // set the x values for the line generator
    .y(function(d) { return yScale0(d.y50); }) // set the y values for the line generator 
    .curve(d3.curveMonotoneX) // apply smoothing to the line

var line75 = d3.line()
    .x(function(d, i) { return xScale0(i); }) // set the x values for the line generator
    .y(function(d) { return yScale0(d.y75); }) // set the y values for the line generator 
    .curve(d3.curveMonotoneX) // apply smoothing to the line

// 1. Add the SVG to the page and employ #2
var svg0 = d3.select("#line0").append("svg")
    .attr("width", widthsmall)
    .attr("height", heightsmall)
    .append("g");

var svg25 = d3.select("#line25").append("svg")
    .attr("width", widthsmall)
    .attr("height", heightsmall)
    .append("g");

var svg50 = d3.select("#line50").append("svg")
    .attr("width", widthsmall)
    .attr("height", heightsmall)
    .append("g");

var svg75 = d3.select("#line75").append("svg")
    .attr("width", widthsmall)
    .attr("height", heightsmall)
    .append("g");

d3.csv("assets/data/infected.csv", function(error, data) {
    if (error) throw error;
    // format the data
    data.forEach(function(d) {
        d.y0 = +d.nolock;
        d.y25 = +d.lock25;
        d.y50 = +d.lock50;
        d.y75 = +d.lock75;
    });
    svg0.append("path")
        .datum(data) // 10. Binds data to the line 
        .attr("class", "linesmall") // Assign a class for styling 
        .attr("d", line0); // 11. Calls the line generator 

    svg25.append("path")
        .datum(data) // 10. Binds data to the line 
        .attr("class", "linesmall") // Assign a class for styling 
        .attr("d", line25); // 11. Calls the line generator 

    svg50.append("path")
        .datum(data) // 10. Binds data to the line 
        .attr("class", "linesmall") // Assign a class for styling 
        .attr("d", line50); // 11. Calls the line generator 

    svg75.append("path")
        .datum(data) // 10. Binds data to the line 
        .attr("class", "linesmall") // Assign a class for styling 
        .attr("d", line75); // 11. Calls the line generator 
});