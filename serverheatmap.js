var createHeatmap = function(width, numSeconds, videoID){
  var height = 25;
  var secondWidth = width/numSeconds;

  d3.json('/votes/'+ videoID, function(json) {
    var total = d3.nest()
    .rollup(function(d){
      return d.length;
    })
    .entries(votes);

    var data = d3.nest()
      .key(function(d) { return d.timestamp; })
      .sortKeys(d3.ascending)
      .rollup(function(d){
        return (d3.mean(d,function(g) { return +g.vote;}) * ((d.length/total) * 10));
      })
      .entries(votes);

    var colorScale = d3.scale.linear()
        .domain([-1, 0, 1])
        .range(["red", "purple", "blue"]);

    var svg = d3.select("#chart").append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g");

    var heatMap = svg.selectAll(".second")
      .data(data)
      .enter().append("rect")
      .attr("x", function(d) { return (+d.key-1) * secondWidth; })
      .attr("y", 0)
      .attr("width", secondWidth+1)
      .attr("height", height);

    heatMap.style("fill", function(d) {
      return colorScale(d.values);
    });
  });
};