// Set the dimensions of the canvas / graph
var margin = {top: 30, right: 10, bottom: 70, left: 80},
    width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// Parse the date / time
var parseDate = d3.timeParse("%d/%m/%y");

// Set the ranges
var x = d3.scaleTime().range([0, width]);  
var y = d3.scaleLinear().range([height, 0]);

// Define the line
var valueline = d3.line()	
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.value); });
    
var svgParEst = d3.select("#ParamEstPlot")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform",
"translate(" + margin.left + "," + margin.top + ")");

// Get the data
d3.csv("assets/data/ParamEstimate.csv", function(error, data) {
    data.forEach(function(d) {
		d.date = parseDate(d.Date);
		d.value = +d.value;
    });
    
    // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain([0, d3.max(data, function(d) { return d.value; })]);

    // Nest the entries by symbol
    var dataNest = d3.nest()
        .key(function(d) {return d.variable;})
        .entries(data);

    // set the colour scale
    var color = d3.scaleOrdinal(d3.schemeCategory10);

    legendSpace = width/dataNest.length; // spacing for the legend

    // Loop through each symbol / key
    dataNest.forEach(function(d,i) { 

        svgParEst.append("path")
            .attr("class", "line")
            .style("stroke", function() { // Add the colours dynamically
                return d.color = color(d.key); })
            .attr("d", valueline(d.values));

        // Add the Legend
        svgParEst.append("text")
            .attr("x", (legendSpace/2)+i*legendSpace)  // space legend
            .attr("y", height + (margin.bottom/2)+ 5)
            .attr("class", "legend")    // style the legend
            .style("fill", function() { // Add the colours dynamically
                return d.color = color(d.key); })
            .text(d.key); 

    });

  // Add the X Axis
  svgParEst.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  // Add the Y Axis
  svgParEst.append("g")
      .attr("class", "axis")
      .call(d3.axisLeft(y));

});