/**
 * Import the SQLite library, and initialize the SQLite db
instance
 * Mention the location of the ".sqlite.db" file that you 
used in the previous chapter
 * We want the absolute path of the file, for better
  clarity, hence, the use of path.resolve
 * The location inside path.resolve, is the location of the 
 sqlite.db file relative to this one
*/
const sqlite3 = require('sqlite3')
const path = require('path')
const db = new 
  sqlite3.Database(path.resolve('./.sqlite.db'))

/**
 * The "serialize" method of the db instance makes sure
  that all queries directly in its callback are executed 
sequentially
 */
db.serialize(function () {
  /**
   * db.run is used to execute write queries (UPDATE,
 CREATE and DELETE).
   * Since this is called inside the "serialize" callback,
 it will be executed in series, and a callback is not 
 required.
   */
  db.run('UPDATE temperature SET value=21.3 WHERE 
 createdAt="2017-06-24 10:27:25"')
  /**
   * The "all" method of the db instance means that we want 
to return all results matching the given query, and returns 
it in the "results" argument in the callback function
   */
  db.all('SELECT * FROM temperature', (err, results) => {
    if (err) {
      console.error(err)
    }
    console.log(results)
  })
})

/**
 * At this point, we are done with the database. Close the 
connection after the queries execute
 */
db.close()
