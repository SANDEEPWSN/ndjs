
const pool = require('./config');

console.log('pool '+JSON.stringify(pool));

/*test db starts*/
const getReal = (request, response) => {
  pool.query('SELECT webcontactid, phonenumber, emailaddress, message, contactname FROM kaneace.webcontact;', (error, results) => {
    if (error) {
      // console.log('here issue rised'+error);
      throw error
    }
    response.status(200).json(results.rows);
    // pool.end();
  })
}
const getRealById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT webcontactid, phonenumber, emailaddress, message, contactname FROM kaneace.webcontact WHERE webcontactid = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createRealUser = (request, response) => {
  // console.log(request.body);
  const { webcontactid, phonenumber, emailaddress, message, contactname } = request.body
  // console.log('here testing..');
  pool.query('INSERT INTO kaneace.webcontact (webcontactid, phonenumber, emailaddress, message, contactname) VALUES ($1, $2, $3 , $4 , $5)', [webcontactid, phonenumber, emailaddress, message, contactname], (error, results) => {
    if (error) {
      // console.log(error);
      throw error
    }
    // console.log('success');
    response.status(201).send(`User added..`)
  })
}

const updateRealUser = (request, response) => {
  // console.log('testing update..')
  const webcontactid = parseInt(request.params.id)
  // console.log(webcontactid);
  const { phonenumber, contactname } = request.body
  // console.log(request.body);
  pool.query(
    'UPDATE kaneace.webcontact SET phonenumber = $1, contactname = $2 WHERE webcontactid = $3',
    [phonenumber, contactname, webcontactid],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${webcontactid}`)
    }
  )
}



// const deleteUser = (request, response) => {
//   const id = parseInt(request.params.id)

//   pool.query('DELETE FROM student WHERE id = $1', [id], (error, results) => {
//     if (error) {
//       throw error
//     }
//     response.status(200).send(`User deleted with ID: ${id}`)
//   })
// }

module.exports = {
  getReal,
  getRealById,
  createRealUser,
  updateRealUser
}
