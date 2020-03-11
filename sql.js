var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('./gold_medals.sqlite');

/*
Returns a SQL query string that will create the Country table with four columns: name (required), code (required), gdp, and population.
*/

const createCountryTable = () => {
  return "create table Country (name text not null, code text not null, gdp integer, population integer);";
};

/*
Returns a SQL query string that will create the GoldMedal table with ten columns (all required): id, year, city, season, name, country, gender, sport, discipline, and event.
*/

const createGoldMedalTable = () => {
  return 'create table GoldMedal (id integer, year integer not null, city text not null, season text not null, name text not null, country text not null, gender text not null, sport text not null, discipline text not null, event text not null);';
};

/*
Returns a SQL query string that will find the number of gold medals for the given country.
*/

const goldMedalNumber = country => {
    return `select count(*) as 'count' from GoldMedal where country = '${country}';`;
};

/*
Returns a SQL query string that will find the year where the given country 
won the most summer medals, along with the number of medals aliased to 'count'.
*/

const mostSummerWins = country => {
  return `select year, count(*) as 'count' from GoldMedal where country = '${country}' and season = 'Summer' group by year order by count desc limit 1;`;
};

/*
Returns a SQL query string that will find the year where the given country 
won the most winter medals, along with the number of medals aliased to 'count'.
*/

const mostWinterWins = country => {
  return `select year, count(*) as 'count' from GoldMedal where country = '${country}' and season = 'Winter' group by year order by count desc limit 1;`;
};

/*
Returns a SQL query string that will find the year where the given country 
won the most medals, along with the number of medals aliased to 'count'.
*/
const theBestXFor = (country, input) => {
  return `select ${input}, count(*) as 'count' from GoldMedal where country = '${country}' group by ${input} order by count desc limit 1`
};

const bestYear = country => {
  return theBestXFor(country, 'year');
};

/*
Returns a SQL query string that will find the discipline this country has 
won the most medals, along with the number of medals aliased to 'count'.
*/

const bestDiscipline = country => {
  return theBestXFor(country, 'discipline');
};

/*
Returns a SQL query string that will find the sport this country has 
won the most medals, along with the number of medals aliased to 'count'.
*/

const bestSport = country => {
  return theBestXFor(country, 'sport');
};

/*
Returns a SQL query string that will find the event this country has 
won the most medals, along with the number of medals aliased to 'count'.
*/

const bestEvent = country => {
  return theBestXFor(country, 'event')
};

/*
Returns a SQL query string that will find the number of male medalists.
*/

const numberMenMedalists = country => {
  return `select count(distinct name) from GoldMedal where gender = 'Men' and country = '${country}';`;
};

/*
Returns a SQL query string that will find the number of female medalists.
*/

const numberWomenMedalists = country => {
  return `select count(distinct name) from GoldMedal where gender = 'Women' and country = '${country}';`;
};

/*
Returns a SQL query string that will find the athlete with the most medals.
*/

const mostMedaledAthlete = country => {
  return `select name, count(*) as 'count' from GoldMedal where country = '${country}' group by name order by count desc limit 1;`;
};

/*
Returns a SQL query string that will find the medals a country has won
optionally ordered by the given field in the specified direction.
*/

const orderedMedals = (country, field, sortAscending) => {
  const bool = Boolean(field);
  return `select * from GoldMedal where country = '${country}'`  + ((bool)?(` order by ${field}` + ((sortAscending)?` asc;`:` desc;`)): ';');
};

/*
Returns a SQL query string that will find the sports a country has
won medals in. It should include the number of medals, aliased as 'count',
as well as the percentage of this country's wins the sport represents,
aliased as 'percent'. Optionally ordered by the given field in the specified direction.
*/

const orderedSports = (country, field, sortAscending) => {
  const bool = Boolean(field);
  return `SELECT sport, count(sport) AS 'count', (count(sport)*100/(SELECT count(*) FROM GoldMedal where country = '${country}')) as 'percent' from GoldMedal where country = '${country}' group by sport`+ ((bool)?(` order by ${field}` + ((sortAscending)?` asc;`:` desc;`)): ';');;
};

module.exports = {
  createCountryTable,
  createGoldMedalTable,
  goldMedalNumber,
  mostSummerWins,
  mostWinterWins,
  bestDiscipline,
  bestSport,
  bestYear,
  bestEvent,
  numberMenMedalists,
  numberWomenMedalists,
  mostMedaledAthlete,
  orderedMedals,
  orderedSports
};
