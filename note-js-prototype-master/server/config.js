var connectionString = 'postgres://kjlgojcshuptgh:2f258ac5ee94d88001b2ab56e10d76271e016d444e36d0cb842eadf159c40f7f@ec2-54-243-46-32.compute-1.amazonaws.com:5432/ddls4hi0ss52t8';

var pg = require('pg');
const { Pool, Client } = require('pg');
const pool = new Pool({
  connectionString: connectionString,
});
require('pg').defaults.ssl = true;
module.exports = pool;