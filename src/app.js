import fetch from 'node-fetch';
import {
  apiEndPointsGenerator,
  displayResults,
  showErrorMessage,
} from './helperFunctions';
import args from './yargsFile';

const main = (args) => {
  if (!args.locations.length) {
    showErrorMessage(
      'Location(s) not found in the command line arguments.\nExample Command: npm start "New York, Shanghai"',
    );
    return;
  }
  const locations = args.locations
    .split(',')
    .map((location) => location.trim());
  const apiEndPoints = apiEndPointsGenerator(locations);
  Promise.all(
    apiEndPoints.map((apiEndPoint) =>
      fetch(apiEndPoint).then(function (response) {
        return response.json();
      }),
    ),
  )
    .then(function (results) {
      displayResults(results);
    })
    .catch(function (error) {
      console.log(
        showErrorMessage(
          'Weather data for some location(s) could not be found.',
        ),
      );
    });
};

main(args);
