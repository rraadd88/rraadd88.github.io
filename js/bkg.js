// var width = 100,
//     height = 100;

// var canvas = d3.select("body").append("canvas")
//     .attr("width", width)
//     .attr("height", height);

// var context = canvas.node().getContext("2d");

var tileW = 250,
  tileH = 150,
  bgElement = d3.selectAll( '.tiles' ),
  randButton = d3.select( '#randomise' ),
  canvas = d3.select( document.createElement( 'canvas' ) )
    .attr( 'width', tileW )
    .attr( 'height', tileH ),
  contex = canvas.node().getContext( '2d' ),
  color = d3.scaleOrdinal( d3.schemeCategory20 ),
  voronoi = d3.voronoi()
    .x( function(d) { return d.x; } )
      .y( function(d) { return d.y; } )
    .extent( [[-5, -5], [tileW + 5, tileH + 5]] );

randButton.on( 'click', updateBg );

updateBg();

function updateBg() {

  var N = 1 << 0,
      S = 1 << 1,
      W = 1 << 2,
      E = 1 << 3;

  var cellSize = 16,
      cellSpacing = 0,
      cellWidth = Math.floor((width - cellSpacing) / (cellSize + cellSpacing)),
      cellHeight = Math.floor((height - cellSpacing) / (cellSize + cellSpacing)),
      cells = generateMaze(cellWidth, cellHeight), // each cell’s edge bits
      distance = 0,
      visited = new Array(cellWidth * cellHeight),
      frontier = [(cellHeight - 1) * cellWidth];


  context.translate(
    Math.round((width - cellWidth * cellSize - (cellWidth + 1) * cellSpacing) / 2),
    Math.round((height - cellHeight * cellSize - (cellHeight + 1) * cellSpacing) / 2)
  );

  context.fillStyle = "#fff";
  for (var y = 0, i = 0; y < cellHeight; ++y) {
    for (var x = 0; x < cellWidth; ++x, ++i) {
      fillCell(i);
      if (cells[i] & S) fillSouth(i);
      if (cells[i] & E) fillEast(i);
    }
  }

  d3.timer(function() {
    if (!(n0 = frontier.length)) return true;
    
    context.fillStyle = d3.hsl(distance++ % 360, 8, .5) + "";

    if (distance & 1) {
      for (var i = 0; i < n0; ++i) {
        fillCell(frontier[i]);
      }
    } else {
      var frontier1 = [],
          i0,
          i1,
          n0;

      for (var i = 0; i < n0; ++i) {
        i0 = frontier[i];
        if (cells[i0] & E && !visited[i1 = i0 + 1]) visited[i1] = true, fillEast(i0), frontier1.push(i1);
        if (cells[i0] & W && !visited[i1 = i0 - 1]) visited[i1] = true, fillEast(i1), frontier1.push(i1);
        if (cells[i0] & S && !visited[i1 = i0 + cellWidth]) visited[i1] = true, fillSouth(i0), frontier1.push(i1);
        if (cells[i0] & N && !visited[i1 = i0 - cellWidth]) visited[i1] = true, fillSouth(i1), frontier1.push(i1);
      }

      frontier = frontier1;
    }
  });

  function fillCell(i) {
    var x = i % cellWidth, y = i / cellWidth | 0;
    context.fillRect(x * cellSize + (x + 1) * cellSpacing, y * cellSize + (y + 1) * cellSpacing, cellSize, cellSize);
  }

  function fillEast(i) {
    var x = i % cellWidth, y = i / cellWidth | 0;
    context.fillRect((x + 1) * (cellSize + cellSpacing), y * cellSize + (y + 1) * cellSpacing, cellSpacing, cellSize);
  }

  function fillSouth(i) {
    var x = i % cellWidth, y = i / cellWidth | 0;
    context.fillRect(x * cellSize + (x + 1) * cellSpacing, (y + 1) * (cellSize + cellSpacing), cellSize, cellSpacing);
  }

  var N = 1 << 0,
      S = 1 << 1,
      W = 1 << 2,
      E = 1 << 3;

  self.addEventListener("message", function(event) {
    postMessage(generateMaze(event.data.width, event.data.height));
  });

  function generateMaze(width, height) {
    var cells = new Array(width * height), // each cell’s edge bits
        remaining = range(width * height), // cell indexes to visit
        previous = new Array(width * height); // current random walk

    // Add the starting cell.
    var start = remaining.pop();
    cells[start] = 0;

    // While there are remaining cells,
    // add a loop-erased random walk to the maze.
    while (!loopErasedRandomWalk());

    return cells;

    function loopErasedRandomWalk() {
      var i0,
          i1,
          x0,
          y0;

      // Pick a location that’s not yet in the maze (if any).
      do if ((i0 = remaining.pop()) == null) return true;
      while (cells[i0] >= 0);

      // Perform a random walk starting at this location,
      previous[i0] = i0;
      while (true) {
        x0 = i0 % width;
        y0 = i0 / width | 0;

        // picking a legal random direction at each step.
        i1 = Math.random() * 4 | 0;
        if (i1 === 0) { if (y0 <= 0) continue; --y0, i1 = i0 - width; }
        else if (i1 === 1) { if (y0 >= height - 1) continue; ++y0, i1 = i0 + width; }
        else if (i1 === 2) { if (x0 <= 0) continue; --x0, i1 = i0 - 1; }
        else { if (x0 >= width - 1) continue; ++x0, i1 = i0 + 1; }

        // If this new cell was visited previously during this walk,
        // erase the loop, rewinding the path to its earlier state.
        if (previous[i1] >= 0) eraseWalk(i0, i1);

        // Otherwise, just add it to the walk.
        else previous[i1] = i0;

        // If this cell is part of the maze, we’re done walking.
        if (cells[i1] >= 0) {

          // Add the random walk to the maze by backtracking to the starting cell.
          // Also erase this walk’s history to not interfere with subsequent walks.
          while ((i0 = previous[i1]) !== i1) {
            if (i1 === i0 + 1) cells[i0] |= E, cells[i1] |= W;
            else if (i1 === i0 - 1) cells[i0] |= W, cells[i1] |= E;
            else if (i1 === i0 + width) cells[i0] |= S, cells[i1] |= N;
            else cells[i0] |= N, cells[i1] |= S;
            previous[i1] = NaN;
            i1 = i0;
          }

          previous[i1] = NaN;
          return;
        }

        i0 = i1;
      }
    }

    function eraseWalk(i0, i2) {
      var i1;
      do i1 = previous[i0], previous[i0] = NaN, i0 = i1; while (i1 !== i2);
    }
  }

  function range(n) {
    var range = new Array(n), i = -1;
    while (++i < n) range[i] = i;
    return range;
  }


  function popRandom(array) {
    if (!array.length) return;
    var n = array.length, i = Math.random() * n | 0, t;
    t = array[i], array[i] = array[n - 1], array[n - 1] = t;
    return array.pop();
  }

  d3.select(self.frameElement).style("height", height + "px");
}