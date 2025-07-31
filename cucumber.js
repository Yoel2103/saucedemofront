module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: [
      'step-definitions/**/*.ts',
      'hooks/**/*.ts'
    ],
    format: [
      'progress-bar',
      'json:reports/cucumber-report.json',
      'html:reports/cucumber-report.html'
    ],
    formatOptions: {
      snippetInterface: 'async-await'
    },
    publishQuiet: true
  }
};