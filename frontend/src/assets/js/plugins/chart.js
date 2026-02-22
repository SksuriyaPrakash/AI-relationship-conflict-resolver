"use strict";
document.addEventListener("DOMContentLoaded", function () {
    $(function ($) {

        var options = {
            series: [{
                name: 'Inflation',
                data: [2.3, 3.1, 4.0, 6.1, 4.0, 3.6],
                
            }],
            chart: {
                height: 100,
                type: 'bar',
                sparkline: {
                    enabled: true,
                },
            },
            plotOptions: {
                bar: {
                    borderRadius: 5,
                    dataLabels: {
                        position: 'top',
                    },
                }
            },
            dataLabels: {
                enabled: false,
                formatter: function (val) {
                    return val + "%";
                },

                offsetY: -20,
                style: {
                    fontSize: '12px',
                    colors: ["#EC604F"]
                }
            },
            yaxis: {
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false,
                },
                labels: {
                    show: false,
                }

            },
            title: {
                text: 'Monthly Inflation in Argentina, 2002',
                floating: true,
                offsetY: 300,
                align: 'center',
                style: {
                    color: '#EC604F'
                }
            },
            grid:{
                show: false,
            },
            fill: {
                colors: ['#EC604F', '#EC604F', '#EC604F']
              }
        };
        var chart = new ApexCharts(document.querySelector(".chartone"), options);
        chart.render();

        var options = {
            series: [{
                name: 'Inflation',
                data: [2.3, 3.1, 4.0, 6.1, 4.0, 3.6],
                
            }],
            chart: {
                height: 100,
                type: 'bar',
                sparkline: {
                    enabled: true,
                },
            },
            plotOptions: {
                bar: {
                    borderRadius: 5,
                    dataLabels: {
                        position: 'top',
                    },
                }
            },
            dataLabels: {
                enabled: false,
                formatter: function (val) {
                    return val + "%";
                },

                offsetY: -20,
                style: {
                    fontSize: '12px',
                    colors: ["#EC604F"]
                }
            },
            yaxis: {
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false,
                },
                labels: {
                    show: false,
                }

            },
            title: {
                text: 'Monthly Inflation in Argentina, 2002',
                floating: true,
                offsetY: 300,
                align: 'center',
                style: {
                    color: '#EC604F'
                }
            },
            grid:{
                show: false,
            },
            fill: {
                colors: ['#EC604F', '#EC604F', '#EC604F']
              }
        };
        var chart = new ApexCharts(document.querySelector(".charttwo"), options);
        chart.render();

        var options = {
            series: [{
                name: 'Inflation',
                data: [2.3, 3.1, 4.0, 6.1, 4.0, 3.6],
                
            }],
            chart: {
                height: 100,
                type: 'bar',
                sparkline: {
                    enabled: true,
                },
            },
            plotOptions: {
                bar: {
                    borderRadius: 5,
                    dataLabels: {
                        position: 'top',
                    },
                }
            },
            dataLabels: {
                enabled: false,
                formatter: function (val) {
                    return val + "%";
                },

                offsetY: -20,
                style: {
                    fontSize: '12px',
                    colors: ["#EC604F"]
                }
            },
            yaxis: {
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false,
                },
                labels: {
                    show: false,
                }

            },
            title: {
                text: 'Monthly Inflation in Argentina, 2002',
                floating: true,
                offsetY: 300,
                align: 'center',
                style: {
                    color: '#EC604F'
                }
            },
            grid:{
                show: false,
            },
            fill: {
                colors: ['#EC604F', '#EC604F', '#EC604F']
              }
        };
        var chart = new ApexCharts(document.querySelector(".chartthree"), options);
        chart.render();

        var options = {
            series: [{
            name: 'In This Year',
            data: [31, 40, 28, 51, 42, 109, 100]
          }, {
            name: 'Average Earnings',
            data: [11, 32, 45, 32, 34, 52, 41]
          }],
            chart: {
            height: 350,
            type: 'area',
            toolbar:{
                show: false,
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'smooth'
          },
          xaxis: {
            type: 'datetime',
            categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
          },
          tooltip: {
            x: {
              format: 'dd/MM/yy HH:mm'
            },
          },
          };
  
          var chart = new ApexCharts(document.querySelector("#bigchart"), options);
          chart.render();

    });
});