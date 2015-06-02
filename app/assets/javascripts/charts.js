$.ajax({
  type: "GET",
  contentType: "application/json; charset=utf-8",
  url: '/test_d3',
  dataType: 'json',
  success: function (data) {
    drawBarChart(data);
    pie();
    pie2();
  },
  error: function (result) {
    error();
  }
});


function drawBarChart(data){
  var w = 500;
  var h = 200;
  var barPadding = 1;
  var svg = d3.select("body").append("svg").attr("width", w).attr('height', h);
  var tooltip = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .text("function(d){return d;}");
  svg.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", function(d, i){return i * (w / data.length);})
    .attr("y", function(d){ return 200; })
    .attr("width", w / data.length - barPadding)
    .on('mouseover', function (d) {
      d3.select(this).style({opacity: '0.8'});
      return tooltip.style("visibility", "visible").text(d);
    })
    .on('mouseout', function (d) {
      d3.select(this).style({opacity: '2.0'});
      d3.select(this).attr("fill", '#bcbd22')
      return tooltip.style("visibility", "hidden");
    })
    .on("mousemove", function(){
      return tooltip.style("top",
        (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");
    })
    .attr("height", '0').attr("fill", '#bcbd22')
    .transition()
    .delay(function(d, i) { return i *100; })
    .duration(200)
    .attr("y", function(d){ return h - (d*4); })
    .attr("height", function(d){ return d * 4; }).attr("fill", '#bcbd22')



  svg.selectAll("text")
    .data(data)
    .enter()
    .append("text")
    .text(function(d) {
      return d;
    })
    .attr("x", function(d, i) {
      return i * (w / data.length) + 5;
    })
    .attr("y", function(d) {
      return h - (d * 4) + 15;
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", "11px")
    .attr("fill", "white");
}


function pie(){
  var dataset = [
    { label: 'in-progress', count: 11 },
    { label: 'new', count: 3 },
    { label: 'on-sale', count: 5 },
    { label: 'failed', count: 10 }
  ];
  var width = 300;
  var height = 300;
  var radius = Math.min(width, height) / 2;
  var outerRadius = 100;


  //var color = d3.scale.category20b();
  var color = d3.scale.ordinal()
    .range(['#e6550d', '#fdd0a2','#fdae6b', '#fd8d3c']);

  var tooltip = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .text("Total number of sales");

  var svg = d3.select('body')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', 'translate(' + (width / 2) +
    ',' + (height / 2) + ')');

  var arc = d3.svg.arc()
    .outerRadius(radius)


  var pie = d3.layout.pie()
    .value(function(d) { return d.count; })
    .sort(null);

  var arcs =  svg.selectAll("g")
    .data(pie(dataset))
    .enter()
    .append("g")



  arcs.append('svg:path')
    .attr('fill', function(d, i) {
      return color(d.data.label);
    })
    //.transition()
    //.delay(function(d, i) { return  i * 200; })
    //.duration(500)
    .attr('d', arc)


  arcs.append('svg:text')
    .attr('dy', ".35em")
    .attr('text-anchor', 'middle')
    .text(function(d,i){return d.data.label})
    .attr('transform', function(d){
      d.outerRadius = outerRadius; // Set Outer Coordinate
      d.innerRadius = outerRadius/2;
      return "translate(" + arc.centroid(d) + ")";
    })

    .on('mouseover',function(){
      d3.select(this)
        .transition()
        .style("opacity", 0.4)
        .attr("fill", "white")
    })
    .on('mouseout',function(){
      d3.select(this).transition().style("opacity",1.5)
        .attr("fill", "black")
    });

  //var arcs = vis.selectAll("g")
  //  .data(pie)
  //  .enter()
  //  .append('g')
  //  .attr("d", arc);
  //
  //arcs.append("svg:path")
  //  .attr("fill", function(d,i){return color(i);})
  //  .attr("d", arc)


  //var path = svg.selectAll('path')
  //  .data(pie(dataset)) // This will pass the data and give meaning in the context of the pie chart.
  //  .enter() //This a place holder for the dom that will be created
  //  .append('path') // This where the actual path is element is created
  //  .attr('d', arc) // pass the arc function that's defined, this is used to create the complicated arc values
  //  .attr('fill', function(d, i) {
  //    return color(d.data.label);
  //  });
  //
  //var arcs = svg.selectAll("g")
  //  .data(pie(dataset))
  //  .enter()
  //  .append('g')
  //  .attr("d", arc)
  //  .append('text')
  //  .attr("dy", ".35em")
  //  .attr("text-anchor", "middle")
  //  .attr("transform", function(d) {
  //    d.outerRadius = outerRadius;
  //    d.innerRadius = outerRadius/2;
  //    return "translate(" + arc.centroid(d) + ")";
  //  })
  //  .text(function(d) { return d.data.count; });

  //arcs.selectAll('text')
  //  .data(pie(dataset))
  //  .enter()
  //  .append('text')
  //  .attr("dy", ".35em")
  //  .attr("text-anchor", "middle")
  //  .attr("transform", function(d) {
  //    return "translate(" + arc.centroid(d) + ")";
  //  })
  //  .text(function(d) { return d.data.count; });
}

function pie2(){
  var canvasWidth = 300, //width
    canvasHeight = 300,   //height
    outerRadius = 100,   //radius
    color = d3.scale.category10(); //builtin range of colors

  var dataSet = [
    {"legendLabel":"One", "magnitude":20},
    {"legendLabel":"Two", "magnitude":40},
    {"legendLabel":"Three", "magnitude":50},
    {"legendLabel":"Four", "magnitude":16},
    {"legendLabel":"Five", "magnitude":50},
    {"legendLabel":"Six", "magnitude":8},
    {"legendLabel":"Seven", "magnitude":30}];

  var vis = d3.select("body")
    .append("svg") //create the SVG element inside the <body>
    .data([dataSet]) //associate our data with the document
    .attr("width", canvasWidth) //set the width of the canvas
    .attr("height", canvasHeight) //set the height of the canvas
    .append("g") //make a group to hold our pie chart
    .attr("transform", "translate(" + 1.5*outerRadius + "," + 1.5*outerRadius + ")") // relocate center of pie to 'outerRadius,outerRadius'

  //// This will create <path> elements for us using arc data...
  var arc = d3.svg.arc()
    .outerRadius(outerRadius)
    .innerRadius(outerRadius/2);
  //
  var pie = d3.layout.pie() //this will create arc data for us given a list of values
    .value(function(d) { return d.magnitude; }) // Binding each value to the pie
    .sort( function(d) { return null; } );

  var arcs = vis.selectAll("g")
    .data(pie)
    .enter()
    .append('g')
    .attr("d", arc);

  arcs.append("svg:path")
    .attr("fill", function(d,i){return color(i);})
    .attr("d", arc)
    .transition()
    .ease("bounce")
    .duration(3500)
    .attrTween("d", tweenPie)



  // Add a magnitude value to the larger arcs, translated to the arc centroid and rotated.


  arcs.append("svg:text")
    .attr("dy", ".35em")
    .attr("text-anchor", "middle")
    //.attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")rotate(" + angle(d) + ")"; })
    .attr("transform", function(d) { //set the label's origin to the center of the arc
      //we have to make sure to set these before calling arc.centroid
      d.outerRadius = outerRadius; // Set Outer Coordinate
      d.innerRadius = outerRadius/2; // Set Inner Coordinate
      return "translate(" + arc.centroid(d) + ")rotate(" + angle(d) + ")";
    })
    .style("fill", "White")
    .style("font", "bold 12px Arial")
    .text(function(d) { return d.data.magnitude; });



  //// Select all <g> elements with class slice (there aren't any yet)
  //var arcs = vis.selectAll("g.slice")
  //  // Associate the generated pie data (an array of arcs, each having startAngle,
  //  // endAngle and value properties)
  //  .data(pie)
  //  // This will create <g> elements for every "extra" data element that should be associated
  //  // with a selection. The result is creating a <g> for every object in the data array
  //  .enter()
  //  // Create a group to hold each slice (we will have a <path> and a <text>
  //  // element associated with each slice)
  //  .append("svg:g")
  //  .attr("class", "slice");    //allow us to style things in the slices (like text)
  //
  //arcs.append("svg:path")
  //  //set the color for each slice to be chosen from the color function defined above
  //  .attr("fill", function(d, i) { return color(i); } )
  //  //this creates the actual SVG path using the associated data (pie) with the arc drawing function
  //  .attr("d", arc);
  //
  //// Add a legendLabel to each arc slice...
  //arcs.append("svg:text")
  //  .attr("transform", function(d) { //set the label's origin to the center of the arc
  //    //we have to make sure to set these before calling arc.centroid
  //    d.outerRadius = outerRadius + 50; // Set Outer Coordinate
  //    d.innerRadius = outerRadius + 45; // Set Inner Coordinate
  //    return "translate(" + arc.centroid(d) + ")";
  //  })
  //  .attr("text-anchor", "middle") //center the text on it's origin
  //  .style("fill", "Purple")
  //  .style("font", "bold 12px Arial")
  //  .text(function(d, i) { return dataSet[i].legendLabel; }); //get the label from our original data array
  //
  //// Add a magnitude value to the larger arcs, translated to the arc centroid and rotated.
  //arcs.filter(function(d) { return d.endAngle - d.startAngle > .2; }).append("svg:text")
  //  .attr("dy", ".35em")
  //  .attr("text-anchor", "middle")
  //  //.attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")rotate(" + angle(d) + ")"; })
  //  .attr("transform", function(d) { //set the label's origin to the center of the arc
  //    //we have to make sure to set these before calling arc.centroid
  //    d.outerRadius = outerRadius; // Set Outer Coordinate
  //    d.innerRadius = outerRadius/2; // Set Inner Coordinate
  //    return "translate(" + arc.centroid(d) + ")rotate(" + angle(d) + ")";
  //  })
  //  .style("fill", "White")
  //  .style("font", "bold 12px Arial")
  //  .text(function(d) { return d.data.magnitude; });
  //
  //// Computes the angle of an arc, converting from radians to degrees.
  function tweenPie(b) {
    b.innerRadius = 0;
    var i = d3.interpolate({startAngle: 0, endAngle: 0}, b);
    return function(t) { return arc(i(t)); };
  }

  function angle(d) {
    var a = (d.startAngle + d.endAngle) * 90 / Math.PI - 90;
    return a > 90 ? a - 180 : a;
  }
}


