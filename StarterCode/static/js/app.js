

// define function to populate dropdown
function init () {
    //select dropdown and assign to variable
    var selector = d3.select('#selDataset');

    // read in json file from static list, append names, property and text to menu
    d3.json('samples.json').then(function(data) {
        sampleNames = data.names;
        metaData = data.metadata;
        sampleNames.forEach((sample) => {
            selector
            .append('option')
            .text(sample)
            .property("value",sample);

        });
    });
};        

init();
