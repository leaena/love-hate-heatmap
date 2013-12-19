var width = 600; // youtubeWidth
var height = 25;
var numSeconds = 248; //youtubeSeconds
var secondWidth = width/numSeconds;

d3.tsv("votes.tsv",
  function(d) {
    return {
      second: +d.timestamp,
      value: +d.vote
    };
  },
  function(error, data) {
    var colorScale = d3.scale.linear()
        .domain([-1, 0, 1])
        .range(["red", "grey", "green"]);

    var svg = d3.select("#chart").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g");

    var heatMap = svg.selectAll(".second")
        .data(data)
        .enter().append("rect")
        .attr("x", function(d) { return (d.second-1) * secondWidth; })
        .attr("y", function(d) { return 0; })
        .attr("rx", 0)
        .attr("ry", 0)
        .attr("width", secondWidth)
        .attr("height", height);

    heatMap.transition().duration(1000)
        .style("fill", function(d) { return colorScale(d.value); });

    heatMap.append("title").text(function(d) { return d.value; });
});