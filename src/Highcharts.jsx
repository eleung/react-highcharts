global.HighchartsAdapter = require('exports?HighchartsAdapter!Highcharts/js/adapters/standalone-framework.src');
var Highcharts = require('exports?Highcharts!Highcharts');
var React = require('react');
var update = require('react/addons').addons.update;
module.exports = React.createClass({
  displayName: 'Highcharts',

  renderChart: function () {
    if (!this.props.config) {
      throw new Error('Config has to be specified, for the Highchart component');
    }

    var config = this.props.config;
    var series = this.props.series;
    var node = this.refs.chart.getDOMNode();

    if (!config.chart) {
      config = update(config, {chart: {$set: {}}})
    }

    config = update(config, {series: {$set: series}, chart: {renderTo: {$set: node}}});

    this.chart = new Highcharts.Chart(config);
  },

  updateChart: function() {
    var series = this.props.series;
     for (var i = 0; i < series.length; i++) {
       this.chart.series[i].setData(series[i].data);
     }
  },

  componentDidMount: function () {
    this.renderChart();
  },

  componentDidUpdate: function () {
    this.updateChart();
  },

  render: function () {
    return <div className = "chart" ref = "chart" />
  }
});

module.exports.Highcharts = Highcharts;