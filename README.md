# belly-button-challenge
##### Source Code: The code in this repo uses the base starter code provided. The remaining part of the code reflects individual contributions

Belly-Button Dashboard App Link: https://ericabgraboyes.github.io/belly-button-challenge/

## Project Background
This assignment asked to build an interactive dashboard using javascript and plotly to explore a dataset which catalogs microbes that live in human belly buttons.  <br>
<br> The project consisted of three main components<b></b>: <ol><li>Use javascript and d3 to load sample data <li> Use plotly to visualize data using bar charts, bubble charts and a gauge chart. <ul><li> Note the gauge chart was not required but was optional for an additional challenge</ul> <li> Use d3 to allow users to select different subjects to analyze and have the graphical items update for each test subject </ol>
### Use javascript and d3 to load sample data: <br>
<ul>
  <li> Use the D3 library to read in samples.json from the URL
    <li> (https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json.)
  <li> Use d3 selectors to populate the drop down selector menu. Utilize javascript to test source data has been loaded correctly and validate results using the console log.
  </ul>
 
### Use Javascript and Plotly to create visualizations for the dashboard:
#### Requested Visuals -- to display for a specific test subject ID
<ol>
  <li> Create a drop down (single selection) for individuals to select a test subject ID
  <li> Display the sample metadata, i.e., an individual's demographic information. Display each key-value pair associated with the selected test subject <br>
  <img src= "https://github.com/ericabgraboyes/belly-button-challenge/blob/main/Images/DemographicPanel.jpg" alt ="Demographic Panel">
   
  <li> Create a horizontal bar chart with the top 10 OTUs found in that individual
    <ul> <li> Use sample_values as the values for the bar chart.
         <li> Use otu_ids as the labels for the bar chart.
         <li> Use otu_labels as the hovertext for the chart. </ul>      
  <img src="https://github.com/ericabgraboyes/belly-button-challenge/blob/main/Images/HorizontalBarChart.jpg" alt="Horizontal Bar Chart">

  <li> Create a bubble chart that displays each sample 
    <ul> <li> Use otu_ids for the x values.
         <li> Use sample_values for the y values.
         <li> Use sample_values for the marker size.
         <li> Use otu_ids for the marker colors.
         <li> Use otu_labels for the text values. </ul>
   <img src="https://github.com/ericabgraboyes/belly-button-challenge/blob/main/Images/BubbleChart.jpg" alt="Bubble Chart">
 
   <li> Create Gauge chart to plot the weekly washing frequency of an individual 
    <ul> <li> Modify the gauge code from Plotly, to account for values ranging from 0-9
         <li> Update the chart whenever a new sample is selected </ul>
  </ol>

### Use javascript and d3 to capture user selection changes: <br>
<ul>
  <li> The dashboard should be configured such that users can select which test subject they wish to view results for
  <li> Use d3 to create an event handler to update all visuals whenever a new test subject ID is selected from the dropdown
  <li> The dashboard should initialize with the first test subject ID # (940)
  </ul>
