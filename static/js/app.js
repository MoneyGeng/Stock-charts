// Display the default plots
function init() {
  // Use D3 to select the dropdown menu
  let dropdownMenu = d3.select("#selDataset");

  // Fetch the JSON data and console log it
  d3.json("/data").then((data) => {
    console.log(`Data: ${data}`);

    // An array of objects with 'date', 'open', 'high', 'low', 'close', 'volume', and 'Name' properties
    let stockData = data;

    // Extract the unique stock names
    let stockNames = [...new Set(stockData.map((item) => item.Name))];

    // Iterate through the stockNames array
    stockNames.forEach((name) => {

      console.log(name);
      // Append each name as an option to the drop-down menu
      dropdownMenu.append("option").text(name).property("value", name);
    });

    // Assign the first stock name to a variable
    let selectedStock = stockNames[0];

    // Call the functions to create the line graph and table 
    createLineGraph(selectedStock);
    
  });
}

// Create the line graph
function createLineGraph(selectedStock) {
  // Fetch the JSON data and console log it
  d3.json("/data").then((jsonData) => {
    console.log(`Data: ${jsonData}`);

    // Filter data where the stock 'Name' matches the selected stock
    let filteredData = jsonData.filter((item) => item.Name === selectedStock);

    // Extract the 'date' and 'close' values from the filtered data
    let dates = filteredData.map((item) => item.date);
    let closePrices = filteredData.map((item) => item.close);

    // Create the trace for the line graph
    let trace = {
      x: dates,
      y: closePrices,
      mode: "lines",
      type: "scatter"
    };

    // Create the data array
    let data = [trace];

    // Create the layout configuration
    let layout = {
      title: `Stock Price (${selectedStock})`,
      xaxis: { title: "Date" },
      yaxis: { title: "Closing Price" }
    };

    // Plot the line graph
    Plotly.newPlot("line-chart", data, layout);
  });
}

// Define the optionChanged function
function optionChanged(selectedStock) {
  // Call the createLineGraph function with the selected stock
  // Log the new value
  console.log(selectedStock);

  init(selectedStock)
  createLineGraph(selectedStock);
}

// Call the init function to display the default plots
init();
