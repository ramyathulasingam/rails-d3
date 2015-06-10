$.ajax({
  type: "GET",
  contentType: "application/json; charset=utf-8",
  url: '/test_d3',
  dataType: 'json',
  success: function (data) {
    //barchart(data);
    //pie();
    //animatedPieChart();
    //userMigration();
    linechart()
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

  d3.select('body').append('h1').text(' Distribution of users auth with NP - total users to migrate: 52777')

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





      //// Compute the new tree layout.
      //var nodes = tree.nodes(root).reverse(),
      //  links = tree.links(nodes);
      //
      //// Normalize for fixed-depth.
      //nodes.forEach(function(d) { d.y = d.depth * 180; });
      //
      //// Update the nodes…
      //var node = svg.selectAll("g.node")
      //  .data(nodes, function(d) { return d.id || (d.id = ++i); });
      //
      //// Enter any new nodes at the parent's previous position.
      //var nodeEnter = node.enter().append("g")
      //  .attr("class", "node")
      //  .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
      //  .on("click", click);
      //
      ////nodeEnter.append("rect")
      ////  .attr('width',5)
      ////  .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });
      //
      //nodeEnter.append("text")
      //  .attr("x", function(d) { return d.children || d._children ? -13 : 13; })
      //  .attr("dy", ".35em")
      //  .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
      //  .text(function(d) { return d.name; })
      //  .style("fill-opacity", 1e-6);
      //
      //// Transition nodes to their new position.
      //var nodeUpdate = node.transition()
      //  .duration(duration)
      //  .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });
      //
      //nodeUpdate.select("circle")
      //  .attr("r", 10)
      //  .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });
      //
      //nodeUpdate.select("text")
      //  .style("fill-opacity", 1);
      //
      //// Transition exiting nodes to the parent's new position.
      //var nodeExit = node.exit().transition()
      //  .duration(duration)
      //  .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
      //  .remove();
      //
      //nodeExit.select("circle")
      //  .attr("r", 1e-6);
      //
      //nodeExit.select("text")
      //  .style("fill-opacity", 1e-6);
      //
      //// Update the links…
      //var link = svg.selectAll("path.link")
      //  .data(links, function(d) { return d.target.id; });
      //
      //// Enter any new links at the parent's previous position.
      //link.enter().insert("path", "g")
      //  .attr("class", "link")
      //  .attr("d", function(d) {
      //    var o = {x: source.x0, y: source.y0};
      //    return diagonal({source: o, target: o});
      //  });
      //
      //// Transition links to their new position.
      //link.transition()
      //  .duration(duration)
      //  .attr("d", diagonal);
      //
      //// Transition exiting nodes to the parent's new position.
      //link.exit().transition()
      //  .duration(duration)
      //  .attr("d", function(d) {
      //    var o = {x: source.x, y: source.y};
      //    return diagonal({source: o, target: o});
      //  })
      //  .remove();
      //
      //// Stash the old positions for transition.
      //nodes.forEach(function(d) {
      //  d.x0 = d.x;
      //  d.y0 = d.y;
      //});
  }

// Toggle children on click.
  function click(d) {
    if (d.children) {
      d._children = d.children;
      d.children = null;
    } else {
      d.children = d._children;
      d._children = null;
    }
    update(d);
  }
}


function barchart(data) {
  var w = 500;
  var h = 200;
  var barPadding = 1;
  var svg = d3.select("#chart").append("svg").attr("width", w).attr('height', h);
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
    //.transition()
    //.ease('elastic')
    //.delay(function(d, i) { return  i * 200; })
    //.duration(500)
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

  d3.select('body').append('h1')
    .text('Happy Donut day :-)')
    .style("color", 'purple')
    .style("font-family", "Comic Sans MS")

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
  data1 = [
    {
      "x": '1',
      "y": '60'
    },
    {
      "x": '2',
      "y": '54'
    },
    {
      "x": '3',
      "y": '48'
    },
    {
      "x": '4',
      "y": '42'
    },
    {
      "x": '5',
      "y": '36'
    },
    {
      "x": '6',
      "y": '40'
    },
    {
      "x": '7',
      "y": '24'
    },
    {
      "x": '8',
      "y": '18'
    },

    {
      "x": '9',
      "y": '12'
    },
  ]


  data2 = [
    {
      "x": '1',
      "y": '40'
    },
    {
      "x": '2',
      "y": '16'
    },
    {
      "x": '3',
      "y": '16'
    },
    {
      "x": '4',
      "y": '8'
    },
    {
      "x": '5',
      "y": '0'
    },
    {
      "x": '6',
      "y": '0'
    },
    {
      "x": '7',
      "y": '0'
    },
    {
      "x": '8',
      "y": '0'
    },

    {
      "x": '9',
      "y": '0'
    },
  ]


  var WIDTH = 500

  var HEIGHT = 250

    var MARGINS = {
      top: 30,
      right: 20,
      bottom: 30,
      left: 50
    }

  var svg = d3.select('body').append('svg')
    .attr("width", WIDTH )
    .attr("height", HEIGHT)

  xScale = d3.scale.linear().domain([0,10]).range([MARGINS.left, WIDTH - MARGINS.right])
  yScale = d3.scale.linear().domain([0,70]).range([HEIGHT - MARGINS.top, MARGINS.bottom])

  xAxis = d3.svg.axis().scale(xScale).orient("bottom")
  yAxis = d3.svg.axis().scale(yScale).orient("left")

  svg.append('svg:g')
    .attr("transform", "translate(" + (MARGINS.left) + ",0)")
    .call(yAxis);
  svg.append('svg:g').attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
    .call(xAxis);


  var lineGen = d3.svg.line()
    .x(function(d) {
      return xScale(d.x);
    })
    .y(function(d) {
      return yScale(d.y);
    })
    .interpolate('basis');

  svg.append('svg:path')
    .attr('d',lineGen(data1))
    .attr('stroke', 'green')
    .attr('stroke-width', 3)
    .attr('fill', 'none');

  svg.append('svg:path')
    .attr('d',lineGen(data2))
    .attr('stroke', 'red')
    .attr('stroke-width', 3)
    .attr('fill', 'none');
}


