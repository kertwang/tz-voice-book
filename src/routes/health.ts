

const app = require('express-promise-router')();

app.get('/', (req: any, res: any) => {
  res.json({
    status: 'OK'
  })
})

export default app;