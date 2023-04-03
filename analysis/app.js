// save URL for sample data 
const dataURL = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

let rawData = null
let dropDownNames = null
let metaData = null
let selectedData = null
let testSubject = ''

// define selector 
let selectDropDown = document.querySelector('#selDataset')
var selector = d3.select("#selDataset") 

function populateMetadata() {
        //create variable for filtered metaData
        var filterMetaData = metaData.filter(person => person.id.toString() === testSubject)[0];

        //select info id and assign to variable
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

function populateBarChart() {
        //create variable for filtered samples
        var filteredSamples = selectedData.filter(person => person.id === testSubject)[0];
        // console.log("SampleValues:",filteredSamples);

        //create variables to store otuID, otuLabels and values
        var otuIDs = filteredSamples.otu_ids;
        // console.log("otuID:", otuIDs);

        var otuLabels = filteredSamples.otu_labels;
        console.log("otuLabels:", otuLabels);

        var otuValues = filteredSamples.sample_values;
        console.log("outValues:", otuValues);

        var dataToChart = [];
        for (var d=0; d<otuIDs.length; d++) {
            dataToChart.push({
                id:otuIDs[d],
                label:otuLabels[d],
                value:otuValues[d]})};
        
        console.log("testchart:", dataToChart);

        var sortChartData = dataToChart.sort((d1, d2) => {
            return d2.value - d1.value;
        });

        console.log("sortedData:", sortChartData);

        //From sortChartData map values for x, y axis and hover text
        var x_Axis = sortChartData.map(sCD => sCD.value);
        var y_Axis = sortChartData.map(sCD => 'OTU '+ sCD.id);
        console.log("y_axis", y_Axis);
        var h_Text = sortChartData.map(sCD => sCD.label);

        //create barGraph 
        var barGraph = [{
            x: x_Axis.slice(0,10).reverse(),
            y: y_Axis.slice(0,10).reverse(),
            text: h_Text.slice(0,10).reverse(),
            type: "bar",
            orientation: 'h'}]

        // create chart
        Plotly.newPlot('bar', barGraph)};

function init() {
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
        populateBarChart();    
    });
    
    selectDropDown.addEventListener('change', function() {
        testSubject = selectDropDown.value
        populateMetadata();
        populateBarChart();
        console.log("test:", testSubject)
    });
};



    // // add event handler for drop down changing, add listener
    // selector.addEventListener('change', (e) => {
    //     // var filterMetaData = metaData.filter(person => person.id.toString() === '940')[0];
    //     getMetadata(e.target.value)
        
        // console.log('Metadata:', filterMetaData) 
init();
