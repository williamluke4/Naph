import chalk from 'chalk'


function log(value: string) {
  console.log(value)
}
function error(value: string) {
  console.error(chalk.red(` ❌  ${value}`))
}
function success(value: string) {
  console.log(chalk.green(` ✔️  ${value}`))
}
function warn(value: string) {
  console.log(chalk.yellow(` ❗  ${value}`))
}
function info(value: string) {
  console.log(chalk.blue(` 💁  ${value}`))
}

export const logger = {
  log,
  error,
  success,
  warn,
  info
}