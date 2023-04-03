// save URL for sample data 
const dataURL = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

let rawData = null
let dropDownNames = null
let metaData = null
let selectedData = null

// function getMetadata(id) {
//     //create variable for filtered metaData
//     var filterMetaData = metaData.filter(person => person.id.toString() === id)[0];

//     //select info id and assign to variable
//     var selectedMetadata = d3.select('#sample-metadata');

//     // clear existing metadata before display selection
//     selectedMetadata.html('');
    
//     // push metadata to visualization
//     Object.entries(filterMetaData)
//     .forEach(([key, value]) => 
//         selectedMetadata
//             .append('p')
//             .text(`${key}: ${value}`),
//     );
// };

function init() {
    // define selector 
    var selector = d3.select("#selDataset")

    // Fetch the JSON data and console log it
    d3.json(dataURL).then(function(data) {
        rawData = data
        dropDownNames = data.names;
        metaData = data.metadata;
        selectedData = data.samples;
        dropDownNames.forEach((sample) => {
            selector 
                .append("option")
                .text(sample)
                .property("value", sample);
        });

        //create variable for filtered metaData
        var filterMetaData = metaData.filter(person => person.id.toString() === '940')[0];

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

        //create variable for filtered samples
        var filteredSamples = selectedData.filter(person => person.id === '940')[0];
        console.log("SampleValues:",filteredSamples);

        //create variables to store otuID, otuLabels and values
        var otuIDs = filteredSamples.otu_ids;
        console.log("otuID:", otuIDs);
        console.log(Array.isArray(otuIDs));

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
        Plotly.newPlot('bar', barGraph)











           
    });



    // // add event handler for drop down changing, add listener
    // selector.addEventListener('change', (e) => {
    //     // var filterMetaData = metaData.filter(person => person.id.toString() === '940')[0];
    //     getMetadata(e.target.value)
        
        // console.log('Metadata:', filterMetaData)
    };
  
init();
