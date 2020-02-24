const express = require('express');
const exportEmployee = require('./routes/exportFunc')
const importEmployee = require('./routes/importFunc')

const app = express();

app.use('/export', exportEmployee);
app.use('/import', importEmployee);

app.listen(3000);

module.exports = app;

