# Google Analytics Reporting API node module

Node module to access analytics reporting v4 api.  

## Prerequisites

You'll need to set up a google project with a service user and download the service user JSON file.  

## Installing

To add this to your node project type the following at the command line:
```
npm install --save google-analyticsreporting
```

## Using the package

You'll need to include the JSON from the Prerequisites section like so:

```
var key = ('./path/to/secret.json');
```
First you'll need to run the auth command, then you can `then` into the `query` function.

```
const ga = require('google-analyticsreporting');
var key = require('./secret/secret.json');


const reportRequests = {
  reportRequests:
    [
      {
        viewId: '119003758',
        dateRanges:
          [
            {
              endDate: '2018-01-18',
              startDate: '2018-01-18',
            },
          ],
          metrics:
          [
            {
              expression: 'ga:dcmCost',
            },
            {
              expression: 'ga:dcmClicks',
            },
            {
              expression: 'ga:dcmImpressions',
            },
          ],
          dimensions:
          [
            {
              name: 'ga:dcmLastEventCampaign',
            },
          ],
      },
  ],
};

ga.auth(key)
  .then(
    ga.query(reportRequests)
    .then(function(error,results){
      var csv = ga.makecsv(error,results);
      console.log(csv);
    })
  );
```
