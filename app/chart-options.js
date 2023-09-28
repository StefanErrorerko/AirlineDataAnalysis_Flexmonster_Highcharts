
// chartOptions.js

  
  export const yearOptions = {
    chart: {
      backgroundColor: {
        color: '#161620'
      },
      type: 'bar', // You can use the desired chart type (bar, pie, etc.)
    },
    title: {
      text: 'Landings'
    },
    // Rest of your yearOptions
  };
  
  export const monthOptions = {
    chart: {
      backgroundColor: {
        color: '#161620'
      },
      type: 'areaspline' // You can use the desired chart type (bar, pie, etc.)
    },
    title: {
      text: 'Landings for 5 last years'
    },
    // Rest of your monthOptions
  };

  export const aircraftOptions = {
    type: 'pie',
    slice: {
      rows: [
        {
          uniqueName: 'Landing Aircraft Type',
        },
      ],
      measures: [
        {
          uniqueName: 'Landing Count',
          aggregation: 'count', // Count the number of landings
        },
      ],
    },
  }

  export const airlineOptions = {
    slice: {
      rows: [
        {
          uniqueName: 'Operating Airline',
          
        },
        
      ],
      measures: [
        {
          uniqueName: 'Landing Count',
          aggregation: 'count', // Count the number of landings
        },
      ],
      
    },
  }

  export const geoOptions = {
    type: 'pie',
    slice: {
      reportFilters: [
        {
            uniqueName: "GEO Summary",
            filter: {
                members: [
                    "International"
                ]
            }
        }
      ],
      rows: [
        {
          uniqueName: 'GEO Region',
        },
      ],
      measures: [
        {
          uniqueName: 'Total Landed Weight',
          aggregation: 'sum', // Count the number of landings
        },
      ],
    },
  }

  export const manufacturerOptions = {
    type: 'pie',
    slice: {
      rows: [
        {
          uniqueName: 'Aircraft Manufacturer',
        },
      ],
      measures: [
        {
          uniqueName: 'Landing Count',
          aggregation: 'count', // Count the number of landings
        },
      ],
    },
  }

  export const landedWeightOptions = {
    type: 'line',
    slice: {
      rows: [
        {
          uniqueName: 'Airline',
        },
      ],
      measures: [
        {
          uniqueName: 'Total Landed Weight',
          aggregation: 'sum'
        },
      ],
    },
  }
  