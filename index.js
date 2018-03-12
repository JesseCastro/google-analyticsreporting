'use strict';
var {google} = require('googleapis');
var analyticsReporting = google.analyticsreporting('v4');
var Promise = require('bluebird');

module.exports = {
  jwtClient: {},
  auth: Promise.promisify(function(key){
    this.jwtClient = new google.auth.JWT(
      key.client_email,
      null,
      key.private_key,
      ['https://www.googleapis.com/auth/analytics.readonly'],
      null,
    );
  }),
  query: Promise.promisify(function(reportObj, callback){
    analyticsReporting.reports.batchGet({
      auth: this.jwtClient,
      resource: reportObj,
    }, callback);
  }),

  makecsv: function(response){
    var reports = response.data.reports;
    var csv = "";
    for(var i = 0; i < reports.length; i++){
      var report = reports[i];
      csv = report.columnHeader.dimensions.join(',');
      for(var j = 0; j < report.columnHeader.metricHeader.metricHeaderEntries.length; j++){
        var metric = report.columnHeader.metricHeader.metricHeaderEntries[j];
        csv += ',' + metric.name;
      }
      for(var k = 0; k < report.data.rows.length; k++){
        var row = report.data.rows[k];
        csv += '\n' + row.dimensions.join(',');
        for(var l = 0; l < row.metrics.length; l++){
          csv += ',' + row.metrics[l].values.join(',');
        }
      }
    }
    return csv;
  },
}
