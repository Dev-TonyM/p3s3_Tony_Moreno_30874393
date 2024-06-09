const express = require('express');
const app = express();
const path = require('path');
const port = 4000 ;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

const route_index = require('./routes/index.route.js');
const route_dashboard = require('./routes/dashboard.route.js');

app.use ('/', route_index);
app.use ('/', route_dashboard);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname,'../public')));

app.use((req,res)=>{
  res.sendFile(path.join(__dirname,'../public/html/error.html'));
});

//servidor en escucha
app.listen(port, () => {
    console.log('servidor en espera')
    console.log('http://localhost:'+port)
  });