// save URL for sample data 
const dataURL = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";


let testSubject = ''
let rawData = null
let dropDownNames = null
let metaData = null
let selectedData = null
let filteredSamples = null
let filterMetaData = null

let otuIDs = null
let otuLabels = null
let otuValues = null
let sortChartData = null
let xAxis = null
let yAxis = null
let text = null


// define selector - use to handle event change using pure js; d3 script does not understand addEventListener
// let selectDropDown = document.querySelector('#selDataset')

function populateMetadata() {
    // assign filterMetdata to testSubjectID
    filterMetaData = metaData.filter(person => person.id.toString() === testSubject)[0];
    
    // select info id and assign to variable
    var selectedMetaData = d3.select('#sample-metadata');
            
    // clear existing metadata before display selection
    selectedMetaData.html('');

    // push metadata to visualization
    Object.entries(filterMetaData)
    .forEach(([key, value]) =>
        selectedMetaData
        .append('p')
        .text(`${key}: ${value}`),
        );
;}

function populateCharts() {
    // assign filteredSamples to testSubjectID
    filteredSamples = selectedData.filter(person => person.id === testSubject)[0];
    console.log("SampleValues:",filteredSamples);

    // assign otu global variables to filteredSamples.properties
    otuIDs = filteredSamples.otu_ids;
    // console.log("otuID:", otuIDs);

    otuLabels = filteredSamples.otu_labels;
    // console.log("otuLabels:", otuLabels);

    otuValues = filteredSamples.sample_values;
    // console.log("outValues:", otuValues);

    let dataToChart = [];
    for (var d=0; d<otuIDs.length; d++) {
        dataToChart.push({
            id:otuIDs[d],
            label:otuLabels[d],
            value:otuValues[d]})};
    // console.log("testchart:", dataToChart);

    // call sort method on chart data, assign to global variable
    sortChartData = dataToChart.sort((d1, d2) => {
        return d2.value - d1.value;
        });
    // console.log("sortedData:", sortChartData);

    // create Bubble Chart
    var bubbleGraph = [{
        x: dataToChart.map(dTC => dTC.id),
        y: dataToChart.map(dTC => dTC.value),
        text: dataToChart.map(dTC => dTC.label),
        mode: 'markers',
        marker: {
            size: dataToChart.map(dTC => dTC.value),
            color: dataToChart.map(dTC => dTC.id),
            // colorscale: 'Earth',
            opacity: 0.8
            },
        }];

    var bubbleLayout = {
        title: "bubble chart placeholder title",
        height: 520,
        width: 920,
        xaxis: {automargin: true},
        yaxis: {automargin: true}}

    // create barGraph 
    var barGraph = [{
        x: (sortChartData.map(sCD => sCD.value)).slice(0,10).reverse(),
        y: (sortChartData.map(sCD => 'OTU '+ sCD.id)).slice(0,10).reverse(),
        text: (sortChartData.map(sCD => sCD.label)).slice(0,10).reverse(),
        type: "bar",
        orientation: 'h'}]

    // generate plot, assign graph to html tag with id = bar
    Plotly.newPlot('bar', barGraph);
    Plotly.newPlot('bubble', bubbleGraph, bubbleLayout)
};

function init() {
    // d3 selector used to populate menu dropdown
    var selector = d3.select("#selDataset") 
    
    // Fetch the JSON data and console log it
    d3.json(dataURL).then(function(data) {
        rawData = data
        dropDownNames = data.names;
        metaData = data.metadata;
        console.log("testmetadata",metaData[0])
        testSubject = data.metadata[0].id.toString()
        selectedData = data.samples;
        dropDownNames.forEach((sample) => {
            selector 
                .append("option")
                .text(sample)
                .property("value", sample);
        });
        populateMetadata();
        populateCharts();    
    });
    
        selector.on('change', function() {
            testSubject = selector.property("value")
            populateMetadata();
            populateCharts();

    // // if using pure javascript -- need to use .addEventListener. Attach as method to selectDropDown object defined at start of script.
    //     selectDropDown.addEventListener('change', function() {
    //     testSubject = selectDropDown.value
    //     populateMetadata();
    //     populateCharts();
    //     //console.log("test:", testSubject)
    });
};

init();
