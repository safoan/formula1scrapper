// importing modules

import * as cheerio from 'cheerio' ;
import fetch from 'node-fetch';
import fs from 'fs';
import Papa from 'papaparse';

//extracting function 

async function getFormulaOneDriver(){
    try {

        //the main element to extract data

        const response = await fetch ('https://www.formula1.com/en/drivers.html');
        const body = await response.text();
        const $ = cheerio.load(body);

       // the main tag element (.listing-items--wrapper)
       
       // create the list of element u want to extract 

        const items = [];
        $('.listing-items--wrapper > .row > .col-12').map ((index, element) => {
            
            const rank = $(element).find('.rank').text();
            const points = $(element).find ('.points > .f1-wide--s').text();
            const firtsname = $(element).find ('.listing-item--name span:first').text();
            const lastname = $(element).find ('.listing-item--name span:last').text();
            const team = $(element).find('.listing-item--team').text();

        //pushing the data we retrive

            items.push({
                rank,
                points,
                firtsname,
                lastname,
                team
            })
        });

        const csv = Papa.unparse(items);
       // the save data to JSON method using fs Module 

        fs.writeFile('formula1.csv' , csv, function (err) {
            if (err) return console.log(err);
            console.log('formula 1 Drivers where saved as : foemula1.csv');
        });

    } 
    catch (error) {
        console.log(error);
    }
}
 // the callback for the main function 
getFormulaOneDriver();