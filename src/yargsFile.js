export default require('yargs')
  .options({
    locations: {
      alias: 'l',
      desc:
        'Takes city name/postal code as a string to find give the current time and weather',
      demand: true,
      default: 'London, Shanghai, 30097',
      type: 'string'
    },
  })
  .help()
  .version().argv;
