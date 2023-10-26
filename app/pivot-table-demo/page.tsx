"use client"
import * as React from "react";
import type { Pivot } from "react-flexmonster";
import dynamic from "next/dynamic";
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';


// Wrapper must be imported dynamically, since it contains Flexmonster pivot
const PivotWrap = dynamic(() => import('@/app/PivotWrapper'), {
    ssr: false,
    loading: () => <h1>Loading Flexmonster...</h1>
});

// Forward ref because PivotWrap is imported dynamically and we need to pass a ref to it
const ForwardRefPivot = React.forwardRef<Pivot, Flexmonster.Params>((props, ref?: React.ForwardedRef<Pivot>) =>
    <PivotWrap {...props} pivotRef={ref} />
)

ForwardRefPivot.displayName = 'ForwardRefPivot'; 

// Highcharts charts options fo building
const corellationOptions = {
  chart: {
    backgroundColor: {
      color: '#161620'
    },
      type: 'line' 
  },
  title: {
      text: ''
  },
  xAxis: {
      categories: [2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018], 
      title: {
          text: 'Years'
      },
      labels: {
        style: {
          color: '#ffffff' 
        }
      }
  },
  yAxis: {
      title: {
          text: 'Correlation'
      },
      labels: {
        style: {
          color: '#ffffff' 
        }
      }
  },
  series: [
      {
          name: 'Correlation',
          data: [0.6733, 0.6533, 0.6820, 0.7262, 0.7372, 0.7468, 0.7694, 0.7804, 0.8037, 0.8539, 0.8735, 0.8929, 0.9137], 
      }
  ]
}

const yearOptions = {
  chart: {
      backgroundColor: {
        color: '#161620'
    },
    type: 'column', 

  },
  title: {
    text: 'Landings'
},
  xAxis: {
      categories: [2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018], 
      title: {
          text: 'Years'
      },
      labels: {
        style: {
          color: '#ffffff' 
        }
      }
  },
  yAxis: {
      title: {
          text: 'Landings'
      },
      labels: {
        style: {
          color: '#ffffff' 
        }
      }
  },
  legend: {
    itemStyle: {
      color: '#ffffff'
    }
  },
  series: [
    {
      name: 'Freighter Landings',
      data: [4798, 4324, 3209, 3542, 3516, 3391, 3137, 2960, 3066, 3049, 2635, 2623, 1751], 
    },
    {
      name: 'Passenger Landings',
      data: [153098, 163679, 171941, 171042, 174334, 182323, 193347, 193046, 197650, 195594, 205441, 210656, 162054], 
    },
    {
      name: 'Combi Landings',
      data: [614, 608, 476, 346, 373, 363, 361, 162, 3, 13], 
    }
  ]
}

const monthOptions = {
  chart: {
      backgroundColor: {
        color: '#161620'
    },
    type: 'areaspline'  
  },
  title: {
    text: 'Landings for 5 last years'
},
  xAxis: {
      categories: ["January", "February", "March", "April", "May", "June", "July", "August", "Seprember", "October", "November", "December"], // Add your x-axis categories here
      title: {
          text: 'Years'
      },      
      labels: {
        style: {
          color: '#ffffff' 
        }
      }
  },
  yAxis: {
      title: {
          text: 'Landings'
      },      
      labels: {
        style: {
          color: '#ffffff' 
        }
      }
  },
  legend: {
    itemStyle: {
      color: '#ffffff'
    }
  },
  series: [
    {
      name: '2014',
      data: [17652, 31932, 30105, 16632, 16701, 17402, 17287, 18084, 18033, 16891], 
    },
    {
      name: '2015',
      data: [17373, 31929, 30385, 16452, 16099, 16947, 17058, 17886, 18024, 16503], 
    },
    {
      name: '2016',
      data: [17705, 32464, 32004, 16775, 16800, 17948, 18207, 18968, 19464, 17741], 
    },
    {
      name: '2017',
      data: [18725, 33612, 32779, 17035, 16439, 17832, 18587, 19701, 20280, 18289], 
    },
    {
      name: '2018',
      data: [0, 17377, 15675, 17953, 17740, 18167, 19071, 19682, 19876, 17814], 
    }
  ]
}

// building a page
export default function WithHighcharts() {

    const pivotRef: React.RefObject<Pivot> = React.useRef<Pivot>(null);

    const reportComplete = () => {
        pivotRef.current!.flexmonster.off("reportComplete", reportComplete);
        //creating charts after Flexmonster instance is launched
        createChart();
    }

    const createChart = () => {
        //Running Flexmonster's getData method for Highcharts
        pivotRef.current!.flexmonster.highcharts?.getData(
          {
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
                  aggregation: 'count',
                },
              ],
            },
          },
            (data: any) => {
              data.chart = {
              type: 'pie',
              backgroundColor: '#131313',
            };
            data.plotOptions = {
              pie: {
                innerSize: '50%',
                dataLabels: {
                  enabled: true,
                  format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                },
              },
            }
                Highcharts.chart('chart-frequency-aircraft', data);
            },
            (data: any) => {
                Highcharts.chart('chart-frequency-aircraft', data);
            }
        );
        pivotRef.current!.flexmonster.highcharts?.getData(
          {
            type: 'bar',
            slice: {
              rows: [
                {
                  uniqueName: 'Operating Airline',
                  
                },
                
              ],
              measures: [
                {
                  uniqueName: 'Landing Count',
                  aggregation: 'count', 
                },
              ],
              
            },
          },
            (data: any) => {
              data.chart = {
                type: 'bar',
                backgroundColor: '#131313',
              };
              data.xAxis = {
                labels: {
                  style: {
                    color: '#ffffff', 
                  },
                },
                categories: data.xAxis.categories
              };
              data.yAxis = {
                labels: {
                  style: {
                    color: '#ffffff',
                  },
                },
              };

                Highcharts.chart('chart-frequency-airline', data);
            },
            (data: any) => {
                Highcharts.chart('chart-frequency-airline', data);
            }
        );
                
        pivotRef.current!.flexmonster.highcharts?.getData(
          {
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
                  aggregation: 'sum', 
                },
              ],
            },
          },
          (data: any) => {
            data.chart = {
              type: 'pie',
              backgroundColor: '#131313',
              color: '#ffffff'
            };
              Highcharts.chart('chart-geo', data);
          },
          (data: any) => {
              Highcharts.chart('chart-geo', data);
          }
        );
        pivotRef.current!.flexmonster.highcharts?.getData(
          {
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
                  aggregation: 'count', 
                },
              ],
            },
          },
          (data: any) => {
            data.chart = {
              type: 'pie',
              backgroundColor: '#131313',
            };
              Highcharts.chart('chart-manufacturer', data);
          },
          (data: any) => {
              Highcharts.chart('chart-manufacturer', data);
          }
        );   
        pivotRef.current!.flexmonster.highcharts?.getData(
          {
            type: 'line',
            slice: {
              rows: [
                {
                  uniqueName: 'Activity Period',
                },
              ],
              measures: [
                {
                  uniqueName: 'Total Landed Weight',
                  aggregation: 'sum'
                },
              ],
            },
          },
          (data: any) => {
            data.chart = {
              type: 'line',
              backgroundColor: '#131313',
            };
            data.xAxis = {
              labels: {
                style: {
                  color: '#ffffff',
                },
              },
              categories: data.xAxis.categories
            };
            data.yAxis = {
              labels: {
                style: {
                  color: '#ffffff',
                },
              },
            };
            data.plotOptions = {
              series: {
                dataLabels: {
                  style: {
                    color: '#ffffff'
                  }
                }
              }
            };
              Highcharts.chart('chart-landed-weight', data);
          },
          (data: any) => {
              Highcharts.chart('chart-landed-weight', data);
          }
        );      
            
        
        
    }

    return (
        <div className="App">
          <h1 className="page-title">How to create a report for airline company with React data visualization libraries</h1>            
  
          <div id="container1" className="">
            <div id="pivot-container" className="">
              <ForwardRefPivot
                ref={pivotRef}
                toolbar={true}
                beforetoolbarcreated={toolbar => {
                  toolbar.showShareReportTab = true;
                }}
                shareReportConnection={{
                  url: "https://olap.flexmonster.com:9500"
                }}
                width="100%"
                height={600}
                report = {{
                  dataSource: { 
                    type: "csv", 
                    // path to the dataset
                    filename: "https://query.data.world/s/vvjzn4x5anbdunavdn6lpu6tp2sq3m?dws=00000" 
                  } 
                }}
                licenseFilePath="https://cdn.flexmonster.com/jsfiddle.charts.key"
                reportcomplete={reportComplete}
                // insert your licenseKey below
                //licenseKey="XXXX-XXXX-XXXX-XXXX-XXXX"
              />
            </div>
          </div>

          <div id="container2" className="">
            <div id="frequency">
              <h2>Flight Frequency</h2>
              <div className="group">
                <div>
                  <p>By Airline</p>
                  <div className="chart" id="chart-frequency-airline" ></div>
                </div>
                <div>
                  <p>By Aircraft Type</p>
                  <div className="chart" id="chart-frequency-aircraft"></div>
                </div>
              </div>

            </div>

            <div id="time-analysis">
              <h2>Time Analysis</h2>
              <div className="group">
                <div>
                  <p>By Year</p>
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={yearOptions}
                  />
                  </div>
                <div>
                  <p>By Month</p>
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={monthOptions}
                  />                
                  </div>
              </div>
            </div>            
          </div>

    

          <div id="container3" className="">
            <div className="wide-container">
              <h2>Aircraft Manufacturers</h2>
              <div id="chart-manufacturer" className="chart" ></div>
            </div>


            <div className="wide-container">
              <h2>Flight Geography</h2>
              <div className="chart" id="chart-geo"></div>
            </div>
          </div>

          <div id="container3">
            <div className="wide-container">
              <h2>Landed Weight</h2>
              <div id="chart-landed-weight" className="chart"></div>
            </div>

            <div className="wide-container">
              <h2>Correlation Between Total Landed Weight and Landing Count By Year</h2>
              <HighchartsReact
                highcharts={Highcharts}
                options={corellationOptions}
              />
            </div>
          </div>
        </div>
    );
}