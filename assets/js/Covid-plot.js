// set the dimensions and margins of the graph
var screen_width = screen.width;
var margin = {top: 30, right: 20, bottom: 70, left: 80},
    height = 400 - margin.top - margin.bottom;
    
// var width = Math.min(600, screen_width) - margin.left - margin.right;
var width = 600 - margin.left - margin.right;
console.log(width);


// append the svg object to the body of the page
var svg = d3.select("#totalcasesplot")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform",
"translate(" + margin.left + "," + margin.top + ")");

var div = d3.select("body").append("div")	
.attr("class", "tooltip")				
.style("opacity", 0);

var formatTime = d3.timeFormat("%e %B");

//Read the data
d3.csv("https://covid.ourworldindata.org/data/ecdc/total_cases.csv",

// When reading the csv, I must format variables:
function(d){
    return { date : d3.timeParse("%Y-%m-%d")(d.date), World : +d.World }
},

// Now I can use this dataset:
function(data) {
    console.log(data);
    
    var arr_len = data.length;
    var max_date = data[arr_len-1].date;
    console.log(max_date);

    // Add X axis --> it is a date format
    var x = d3.scaleTime()
    .domain(d3.extent(data, function(d) { return d.date; }))
    .range([ 0, width ]);
    svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x)
            .ticks(5));

    // Add Y axis
    var y = d3.scaleLinear()
    .domain([0, d3.max(data, function(d) { return +d.World; })])
    .range([ height, 0 ]);
    svg.append("g")
    .call(d3.axisLeft(y));
    
    // Add the line
    svg.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1.5)
    .attr("d", d3.line()
    .x(function(d) { return x(d.date) })
    .y(function(d) { return y(d.World) })
    )
    
    svg.selectAll(".dot")
    .data(data)
    .enter().append("circle") // Uses the enter().append() method
    .attr("class", "dot") // Assign a class for styling
    .attr("cx", function(d) { return x(d.date) })
    .attr("cy", function(d) { return y(d.World) })
    .attr("r", 2)
    .on("mouseover", function(d) {		
        div.transition()		
        .duration(200)		
        .style("opacity", .9);		
        div.html("<b>Date: </b>" + formatTime(d.date) + "<br/> <b> Cases: </b>"  + d.World)	
        .style("left", (d3.event.pageX - 150) + "px")		
        .style("top", (d3.event.pageY - 25) + "px");	
    })					
    .on("mouseout", function(d) {		
        div.transition()		
        .duration(500)		
        .style("opacity", 0);	
    });

    // Adding the Title of chart
    svg.append("g")
    .append("text")
    .style("font-size", "18px")
    .attr("y", margin.top/2)
    .attr("x", "50px")
    .text("Total Cumulative Cases (worldwide)");

    // Adding the source of chart
    svg.append("g")
    .append("text")
    .style("font-size", "14px")
    .attr("y", margin.top/2+20)
    .attr("x", "50px")
    .text("(Hover for case count)");

    // Adding the source of chart
    svg.append("g")
    .append("text")
    .style("font-size", "14px")
    .attr("y", height+45)
    .attr("x", "50px")
    .text("Source: Our World in Data (Updated on " + formatTime(max_date) + ")");
    
})
