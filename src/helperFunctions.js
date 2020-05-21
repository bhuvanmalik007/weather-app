import geoTz from 'geo-tz';
import { apiKey, openWeatherApiUrl } from './constants';
import chalk from 'chalk';

export const apiEndPointsGenerator = (locations) =>
  locations.map(
    (location, index) =>
      `${openWeatherApiUrl}${location}&appid=${apiKey}&units=metric`,
  );

export const getCurrentLocalTime = ({ lat, lon }) =>
  new Date().toLocaleString('en-US', {
    timeZone: geoTz(parseFloat(lat), parseFloat(lon)),
  });

export const displayResults = (results) => {
  results.forEach((result, index) => {
    console.log(
      chalk.yellow.dim('---------------------------------------------------'),
    );
    if (!result.main) {
      console.log(
        chalk.red.bold('Weather data for some location(s) could not be found.'),
      );
      return;
    }
    console.log(
      chalk`{whiteBright.bold Location}: 📍{red.bold.underline ${result.name}}`,
    );
    console.log(
      chalk.whiteBright.bold('Date,Time: '),
      chalk.hex('#e07b39').italic(getCurrentLocalTime(result.coord)),
    );
    console.log(
      chalk.whiteBright.bold('Weather: '),
      chalk.blueBright(result.weather[0].description),
    );
    console.log(
      chalk.whiteBright.bold('Temperature: '),
      chalk.greenBright.bold(result.main.temp + '°C'),
      chalk.white(' Max:'),
      chalk.greenBright.bold(result.main.temp_max + '°C'),
      chalk.white(' Min:'),
      chalk.greenBright.bold(result.main.temp_min + '°C'),
    );
  });
};

export const showErrorMessage = (message) =>
  console.log(chalk.red.bold(message));
