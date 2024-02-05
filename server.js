const express = require('express')
const simpleGit = require('simple-git')
const git = simpleGit.default()
const app = express()
const port = 3000

app.get('/', async (req, res) => {
  res.send('Hi bro!')
})

app.get('/branch', async (req, res) => {
  const branch = await git.branch()
  res.send(branch)
})

app.get('/status', async (req, res) => {
  const status = await git.status()
  res.send(status)
})

app.get('/fetch', async (req, res) => {
  await git.fetch()
  res.send('Пофетчил')
})

app.get('/pull', async (req, res) => {
  try {
    await git.pull()
    res.send('Спулился')
  } catch (err) {
    res.send(`Error: ${err}`)
  }
})

app.get('/goToStaging', async (req, res) => {
  try {
    await git.checkout('staging')
    res.send('Ну вроде на стейдже')
  } catch (err) {
    res.send(`Error: ${err}`)
  }
})

app.get('/goToMaster', async (req, res) => {
  try {
    await git.checkout('master')
    res.send('Ну вроде на мастере')
  } catch (err) {
    res.send(`Error: ${err}`)
  }
})

app.get('/commitAll', async (req, res) => {
  try {
    await git.add('.')
    await git.commit('Default simpleGit commit')
    await git.push()
    res.send('Чёто закомитил')
  } catch (err) {
    res.send(`Error: ${err}`)
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})