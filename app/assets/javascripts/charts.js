$.ajax({
  type: "GET",
  contentType: "application/json; charset=utf-8",
  url: '/test_d3',
  dataType: 'json',
  success: function (data) {
    barchart(data);
    animatedPieChart();
    userMigration();
    linechart()
    pie();
  },
  error: function (result) {
    error();
  }
});

function userMigration() {

  var treeData = [
    {
      name: "Total(52k)",
      parent: null,
      value: 50,
      children: [
        {
          name: "with VA(35K)",
          parent: 'Total Users',
          value: 35,
          children: [
            {
              name: "customerid(10K)",
              parent: 'Total Users',
              value: 10
            },
            {
              name: "without customerid(25k)",
              parent: 'Total Users',
              value: 25
            }
          ]
        },
        {
          name: "without VA(17k)",
          parent: 'Total',
          value: 17
        }
      ]
    }
  ];

  var margin = {top: 20, right: 120, bottom: 20, left: 120},
      width = 960 - margin.right - margin.left,
      height = 500 - margin.top - margin.bottom;

  var i = 0,
    duration = 750,
    root;

  d3.select('body').append('a').attr("name", 'tree')

  var svg = d3.select('body').append('svg')
    .attr("width", width + margin.right + margin.left)
    .attr("height", 700)
    .append('g')
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var tree = d3.layout.tree()
    .size([width, height]);

  var diagonal = d3.svg.diagonal()
    .projection(function(d) { return  [d.y, d.x]; });

  root = treeData[0] // This computes the nodes. you have an entire
  root.x0 = 0;
  root.y0 = 10;

  update(root);

  function update(source) {

    var nodes = tree.nodes(root) // get all the computed position of all the nodes
    var links = tree.links(nodes);// return an array of objects with links


    nodes.forEach(function(d) { d.y = d.depth * 360; });

    var node = svg.selectAll("g.node")
      .data(nodes, function(d) { return d.id || (d.id = ++i); });

    var nodeEnter = node.enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) {
        return "translate(" + d.y + "," + d.x + ")"; });
    //
    nodeEnter.append("circle")
      .attr("r", function(d) { return d.value; })
      .style("fill", function(d) { return 'orange'; })
      .style("stroke", 'red')
      .style('stroke-width',3);
    //
    nodeEnter.append("text")
      .attr("x", function(d) {
        return d.children || d._children ?
        (d.value + 4) * -1 : d.value + 4 })
      .attr("dy", ".35em")
      .attr("text-anchor", function(d) {
        return d.children || d._children ? "end" : "start"; })
      .text(function(d) { return d.name; })
      .style("fill-opacity", 1);


    var link = svg.selectAll("path.link")
      .data(links, function(d) { return d.target.id; });

    link.enter().insert("path", "g")
      .attr("class", "link")
      .attr("d", diagonal);
  }
}

function barchart(data) {
  var w = 500;
  var h = 200;
  var barPadding = 1;
  d3.select('body').append('a').attr("name", 'bar-chart')
  var svg = d3.select('body').append("svg").attr("width", w).attr('height', h);
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
    .attr("x", function (d, i) {
      return i * (w / data.length);
    })
    .attr("y", function (d) {
      return h;
    })
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
    .on("mousemove", function () {
      return tooltip.style("top",
        (d3.event.pageY - 10) + "px").style("left", (d3.event.pageX + 10) + "px");
    })
    .attr("height", '0').attr("fill", '#bcbd22')
    .transition()
    .delay(function (d, i) {
      return i * 100;
    })
    .duration(1000)
    .ease('elastic')
    .attr("height", function (d) {
      return d * 4;
    }).attr("fill", '#bcbd22')
    .attr("y", function (d) {
      return h - (d * 4);
    })

  svg.selectAll("text")
    .data(data)
    .enter()
    .append("text")
    .text(function (d) {
      return d;
    })
    .attr("x", function (d, i) {
      return i * (w / data.length) + 5;
    })
    .attr("y", function (d) {
      return h - (d * 4) + 15;
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", "11px")
    .attr("fill", "white");
}


function pie() {
  d3.select('body').append('a').attr("name", 'pie')

  var dataset = [
    {label: 'in-progress', count: 11},
    {label: 'new', count: 3},
    {label: 'on-sale', count: 5},
    {label: 'failed', count: 10}
  ];
  var width = 300;
  var height = 300;
  var radius = Math.min(width, height) / 2;
  var outerRadius = 100;


  //var color = d3.scale.category20b();
  var color = d3.scale.ordinal()
    .range(['#e6550d', '#fdd0a2', '#fdae6b', '#fd8d3c']);

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
    .value(function (d) {
      return d.count;
    })
    .sort(null);

  var arcs = svg.selectAll("g")
    .data(pie(dataset))
    .enter()
    .append("g")


  arcs.append('svg:path')
    .attr('fill', function (d, i) {
      return color(d.data.label);
    })
    .attr('d', arc)


  arcs.append('svg:text')
    .attr('dy', ".35em")
    .attr('text-anchor', 'middle')
    .text(function (d, i) {
      return d.data.label
    })
    .attr('transform', function (d) {
      d.outerRadius = outerRadius; // Set Outer Coordinate
      d.innerRadius = outerRadius / 2;
      return "translate(" + arc.centroid(d) + ")";
    })
    .on('mouseover', function () {
      d3.select(this)
        .transition()
        .attr("fill", "white")
    })
    .on('mouseout', function () {
      d3.select(this).transition().style("opacity", 1.5)
        .attr("fill", "black")
    });


}

function animatedPieChart() {

  d3.select('body').append('a').attr("name", 'animated-pie-chart');

  var canvasWidth = 300, //width
    canvasHeight = 300,   //height
    outerRadius = 100,   //radius
    color = d3.scale.category10(); //builtin range of colors

  var dataSet = [
    {"legendLabel": "One", "magnitude": 20},
    {"legendLabel": "Two", "magnitude": 40},
    {"legendLabel": "Three", "magnitude": 50},
    {"legendLabel": "Four", "magnitude": 16},
    {"legendLabel": "Five", "magnitude": 55},
    {"legendLabel": "Six", "magnitude": 8},
    {"legendLabel": "Seven", "magnitude": 30}];

  var vis = d3.select("body")
    .append("svg")
    .data([dataSet])
    .attr("width", canvasWidth)
    .attr("height", canvasHeight)
    .append("g")
    .attr("transform", "translate(" + 1.5 * outerRadius + "," + 1.5 * outerRadius + ")")


  var arc = d3.svg.arc()
    .outerRadius(outerRadius)
    .innerRadius(outerRadius / 2);
  //
  var pie = d3.layout.pie()
    .value(function (d) {
      return d.magnitude;
    })
    .sort(function (d) {
      return null;
    });

  var arcs = vis.selectAll("g")
    .data(pie)
    .enter()
    .append('g')
    .attr("d", arc);

  arcs.append("svg:path")
    .attr("fill", function (d, i) {
      return color(i);
    })
    .attr("d", arc)
    .transition()
    .ease("bounce")
    .duration(3500)
    .attrTween("d", tweenPie)


  arcs.append("svg:text")
    .attr("dy", ".35em")
    .attr("text-anchor", "middle")
    .attr("transform", function (d) {
      d.outerRadius = outerRadius;
      d.innerRadius = outerRadius / 2;
      return "translate(" + arc.centroid(d) + ")rotate(" + angle(d) + ")";
    })
    .style("fill", "White")
    .style("font", "Arial")
    .text(function (d) {
      return d.data.magnitude;
    });

  function tweenPie(b) {
    b.innerRadius = 0;
    var i = d3.interpolate({startAngle: 0, endAngle: 0}, b);
    return function (t) {
      return arc(i(t));
    };
  }

  function angle(d) {
    var a = (d.startAngle + d.endAngle) * 90 / Math.PI - 90;
    return a > 90 ? a - 180 : a;
  }
}


function linechart(){

  var data1 = [60, 54,48,42,36,30,24,18,12,6,0 ];

  var data2 = [40,16,16,8,0,0,0,0,0];

  var WIDTH = 1000;

  var HEIGHT = 500;

  var MARGINS = {
    top: 30,
    right: 20,
    bottom: 30,
    left: 50
  };

  d3.select('body').append('a').attr('name', 'line-chart');

  var svg = d3.select('body').append('svg')
    .attr("width", WIDTH )
    .attr("height", HEIGHT)

  red_circle = svg.append('circle').attr('cx', 800).attr('cy','20').attr("r", 5).style('fill', 'red')
  svg.append('text').attr('x', 820).attr('y', '20').text("CURRENT");



  gree_circle = svg.append('circle').attr('cx', 800).attr('cy','35').attr("r", 5).style('fill', 'green')
  svg.append('text').attr('x', 820).attr('y', '40').text("IDEAL");



  xScale = d3.scale.linear().domain([0,12]).range([MARGINS.left, WIDTH - MARGINS.right])
  yScale = d3.scale.linear().domain([0,70]).range([HEIGHT - MARGINS.top, MARGINS.bottom])

  xAxis = d3.svg.axis().scale(xScale).orient("bottom")
  yAxis = d3.svg.axis().scale(yScale).orient("left")


  var tooltip = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .text("function(d){return d;}");

  svg.append('svg:g')
    .attr("transform", "translate(" + (MARGINS.left) + ",0)")
    .call(yAxis)
  .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .style('fill', 'blue')
      .text("working hrs");

  svg.append('svg:g').attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
    .call(xAxis)
    .append('text')
      .attr("x", WIDTH - MARGINS.right - MARGINS.left )
      .attr("y", "-9" )
      .style('fill', 'blue')
      .text("days");

  var lineGen = d3.svg.line()
    .x(function(d, i) {
      return xScale( i + 1);
    })
    .y(function(d) {
      return yScale(d);
    });
    //.interpolate('basis');


  svg.append('svg:path')
    .attr('d',lineGen(data1))
    .attr('stroke', 'green')
    .attr('stroke-width', 3)
    .attr('fill', 'none')
    .on('mouseover', function (d) {
      console.log(this);
      d3.select(this).style({opacity: '0.8'});
      return tooltip.style("visibility", "visible").text("ideal");
    })
    .on('mouseout', function (d) {
      d3.select(this).style({opacity: '2.0'});
      d3.select(this).attr("fill", '#bcbd22')
      return tooltip.style("visibility", "hidden");
    })
    .on("mousemove", function () {
      return tooltip.style("top",
        (d3.event.pageY - 10) + "px").style("left", (d3.event.pageX + 10) + "px");
    });

  svg.append('svg:path')
    .attr('d',lineGen(data2))
    .attr('stroke', 'red')
    .attr('stroke-width', 3)
    .attr('fill', 'none')
    .on('mouseover', function (d) {
        console.log(this);
        d3.select(this).style({opacity: '0.8'});
        return tooltip.style("visibility", "visible").text("current");
      })
    .on('mouseout', function (d) {
      return tooltip.style("visibility", "hidden");
    })
    .on("mousemove", function () {
      return tooltip.style("top",
        (d3.event.pageY - 10) + "px").style("left", (d3.event.pageX + 10) + "px");
    });


  d3.select("#save").on("click", function(){
    var html = d3.select("svg")
      .attr("version", 1.1)
      .attr("xmlns", "http://www.w3.org/2000/svg")
      .node().parentNode.innerHTML;

    //console.log(html);
    var imgsrc = 'data:image/svg+xml;base64,'+ btoa(html);
    var img = '<img src="'+imgsrc+'">';
    d3.select("#svgdataurl").html(img);

  });
}


