// save URL for sample data 
const dataURL = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// define global variables for analysis

// use in init, re-assign during initial data load
let rawData = null
let dropDownNames = null
let metaData = null
let testSubject = ''
let samplesData = null

// use in demographic panel and gauge chart
let filterMetaData = null
let selectedMetaData
let wfreq = null

// use in bubble and bar chart
let filteredSamples = null
let otuIDs = null
let otuLabels = null
let otuValues = null
let dataToChart = []
let sortChartData = null
let xAxis = null
let yAxis = null
let text = null

// function to populate Metadata visuals -- Demographic Panel & Gauge
function populateMetadataVisuals() {
    // assign filterMetdata to testSubjectID
    filterMetaData = metaData.filter(person => person.id.toString() === testSubject)[0];
    
    // use d3 to select demographic infocard, assign to variable
    selectedMetaData = d3.select('#sample-metadata');
            
    // clear data in demographic info before display selection
    selectedMetaData.html('');

    // add key-value pairs to visual, use forEach to loop through array, d3 to append
    Object.entries(filterMetaData)
    .forEach(([key, value]) =>
        selectedMetaData
        .append('p')
        .text(`${key}: ${value}`),
        );

    populateGauge(filterMetaData)
;}


// function to create Gauge visual
function populateGauge(filterMetaData) {
    // assign wfreq to .wfreq property -- links the data for gauge with data in demographic panel
    wfreq = filterMetaData.wfreq;
    
    // declare trace for Gauge
    var gaugeChart = [{
        domain: {x: [0,1], y:[0,1]},
        value: wfreq,
        type: "indicator",
        mode: "gauge+number",
        gauge: {
            axis: {range: [null,9], tickwidth:0},
            bar: {color: '#ccccc'},
            bgcolor: 'white',
            bordercolor: 'grey',
            steps: [
                { range: [0, 1], color: '#F8F3EC'},
                { range: [1, 2], color: '#F4F1E4'},
                { range: [2, 3], color: '#E9E7C9'},
                { range: [3, 4], color: '#E5E8B0'},
                { range: [4, 5], color: '#D5E599'},
                { range: [5, 6], color: '#B7CD8F'},
                { range: [6, 7], color: '#8BC086'},
                { range: [7, 8], color: '#89BC8D'},
                { range: [8, 9], color: '#84B589'}],
            },
        }]
    // render gauge dial to html tag with id 'gauge'
    Plotly.newPlot('gauge', gaugeChart)};

function populateCharts() {
    // assign filteredSamples to testSubjectID
    filteredSamples = selectedData.filter(person => person.id === testSubject)[0];
    // console.log("SampleValues:",filteredSamples);

    // assign otu global variables to filteredSamples.properties
    otuIDs = filteredSamples.otu_ids;
    // console.log("otuID:", otuIDs);

    otuLabels = filteredSamples.otu_labels;
    // console.log("otuLabels:", otuLabels);

    otuValues = filteredSamples.sample_values;
    // console.log("outValues:", otuValues);

    // create object for each sample id, value and lable, push to array
    // needed to ensure lables and otuID are assigned to proper values when sorted
    for (var d=0; d<otuIDs.length; d++) {
        dataToChart.push({
            id:otuIDs[d],
            label:otuLabels[d],
            value:otuValues[d]})};
    // console.log("testchart:", dataToChart);

    // declare trace for bubblechart
    var bubble = [{
        x: dataToChart.map(dTC => dTC.id),
        y: dataToChart.map(dTC => dTC.value),
        text: dataToChart.map(dTC => dTC.label),
        mode: 'markers',
        marker: {
            size: dataToChart.map(dTC => dTC.value),
            color: dataToChart.map(dTC => dTC.id),
            //colorscale: 'Earth',
            opacity: 0.8},
        },];
    
    // declare layout for bubblechart    
    var bubbleLayout = {
        title: {
            text: `Belly Button Diversity for Test Subject Id No. ${testSubject}`,
            font: {
                family: 'Times New Roman',
                size: 18,
                color: 'dark gray',
                },
        },
        height: 520,
        width: 1150,
        xaxis: {
            automargin: true,
            title: {
                text: 'OTU ID (Bacteria)',
                font: {
                    family: 'Times New Roman',
                    size: 12,
                    color: 'dark gray',
                    },
            },
        },
        yaxis: { 
            automargin: true,
            title: {
                text: 'Sample Value',
                font: {
                    family: 'Times New Roman',
                    size: 12,
                    color: 'dark gray',
                    },
            },
        },};

    // sort chart data, assign to global variable
    sortChartData = dataToChart.sort((d1, d2) => {
        return d2.value - d1.value;}
        );
    // console.log("sortedData:", sortChartData);

    // declare trace for barGraph
    var barGraph = [{
        x: (sortChartData.map(sCD => sCD.value)).slice(0,10).reverse(),
        y: (sortChartData.map(sCD => 'OTU '+ sCD.id)).slice(0,10).reverse(),
        text: (sortChartData.map(sCD => sCD.label)).slice(0,10).reverse(),
        type: "bar",
        orientation: 'h'}];    

    // declare layout for barchart
    // var barLayout = {
    //     title: {
    //         text: `Test Subject Id No. ${testSubject}'s' top 10 OTU`,


    //     }
    // }

        // generate plot, assign graph to html tag with id = bar
    Plotly.newPlot('bar', barGraph);
    Plotly.newPlot('bubble', bubble, bubbleLayout)
};


// function to read data, populate initial graphs
function init() {
    // use d3 to select drop down, assign to variable
    var selector = d3.select("#selDataset") 
    
    // Fetch the JSON data and assign properties to global variables
    d3.json(dataURL).then(function(data) {
        rawData = data
        dropDownNames = data.names;
        metaData = data.metadata;
        console.log("testmetadata",metaData[0])
        testSubject = data.metadata[0].id.toString()
        selectedData = data.samples;

        // append test subject id to dropdown selector
        dropDownNames.forEach((sample) => {
            selector 
                .append("option")
                .text(sample)
                .property("value", sample);
        });

        // populate initial visuals
        populateMetadataVisuals()
        populateCharts();    
    });
    
        // define event listener for drop down selection changes
        selector.on('change', function() {
            testSubject = selector.property("value")
            populateMetadataVisuals()
            populateCharts();

    // // if using pure javascript -- need to use .addEventListener. Attach as method to selectDropDown object defined at start of script.
    //     selectDropDown.addEventListener('change', function() {
    //     testSubject = selectDropDown.value
    //     populateMetadata();
    //     populateCharts();
    //     //console.log("test:", testSubject)
    });
};
// 
init();
