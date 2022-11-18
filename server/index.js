import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import jquery from 'jquery';
import axios from 'axios';
import jsdom from 'jsdom';

import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';
import otherRoutes from './routes/other.js';

const app = express();
dotenv.config();

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

app.get('/baseball', (req, res) => {
    axios.get('https://www.baseball-reference.com/leagues/majors/2022.shtml')
        .then(response => {
            var abb = {
                "Los Angeles Dodgers"   : "LAD", 
                "Boston Red Sox"        : "Bos", 
                "New York Mets"         : "NYM",
                "Toronto Blue Jays"     : "Tor",
                "St. Louis Cardinals"   : "StL",
                "New York Yankees"      : "NYY", 
                "Cleveland Guardians"   : "Cle",
                "Colorado Rockies"      : "Col",
                "Philadelphia Phillies" : "Phi",
                "Houston Astros"        : "Hou",
                "Minnesota Twins"       : "Min",
                "San Francisco Giants"  : "SF",
                "Washington Nationals"  : "Wsh",
                "San Diego Padres"      : "SD",
                "Chicago Cubs"          : "ChC", 
                "Milwaukee Brewers"     : "Mil", 
                "Chicago White Sox"     : "ChW", 
                "Atlanta Braves"        : "Atl", 
                "Cincinnati Reds"       : "Cin",
                "Miami Marlins"         : "Mia",
                "Kansas City Royals"    : "KC",
                "Texas Rangers"         : "Tex",
                "Seattle Mariners"      : "Sea",
                "Arizona Diamondbacks"  : "Ari", 
                "Tampa Bay Rays"        : "TB",
                "Los Angeles Angels"    : "LAA",
                "Baltimore Orioles"     : "Bal",
                "Pittsburgh Pirates"    : "Pit", 
                "Oakland Athletics"     : "Oak",
                "Detroit Tigers"        : "Det"
            }
            var dom = new jsdom.JSDOM(response.data)
            var table = dom.window.document.getElementById("teams_standard_batting")
            var data = tableToJson(table)
            var ranks = {}
            data.forEach(row => {
                if (row[0][1] == "a"){
                    var team = row[0].replace(/(.*)shtml">/g, "")
                    team = team.replace(/<\/a>/g, "")
                    var hits = row[8]
                    var runs = row[7]
                    var so = row[16]
                    var bb = row[15]
                    var g = row[4]
                    var score = (so - hits - bb - 2*runs) / g
                    ranks[abb[team]] = score;
                }
            })
            var sorted = Object.keys(ranks).sort(function(a,b){return ranks[a]-ranks[b]})
            sorted.forEach((e, index) => {
                ranks[e] = index + 1;
            })
            res.send(ranks)
        })
})

function tableToJson(table) { 
    var data = [];
    for (var i=1; i<table.rows.length; i++) { 
        var tableRow = table.rows[i]; 
        var rowData = []; 
        for (var j=0; j<tableRow.cells.length; j++) { 
            rowData.push(tableRow.cells[j].innerHTML);; 
        } 
        data.push(rowData); 
    } 
    return data; 
}

app.use('/posts', postRoutes);
app.use('/users', userRoutes);
app.use('/', otherRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));