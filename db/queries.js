const promise = require('bluebird');

const options = {
  promiseLib: promise
};

const pgp = require('pg-promise')(options);
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/narwhal_messages';
const db = pgp(connectionString);


// Return search results

var search = {
  searchResults: async (query) => {
    try {
      const results = await db.any('SELECT id, message_text, topic_id, author_id, create_date, last_update_date ' +
        'FROM topic_message ' + 
        'WHERE message_text_tokens @@ to_tsquery(${query}) ' + 
        'ORDER BY create_date LIMIT 200', {query: query}
      ); 

      const userIds = results.map((message) => {
        return message.author_id;
      });

      // Get each unique author ID
      const uniqueIds = [...new Set(userIds)];
      const userResults = await dbUsers.any('SELECT id, username, avatar FROM users WHERE id IN ($1:csv)', [uniqueIds]);
      
      // Convert user results to an object for faster lookup
      const users = userResults.reduce((acc, user) => {
        acc[user.id] = { id: user.id, username: user.username, avatar: user.avatar };
        return acc;
      }, {});

      // Build array of message results
      const messages = [];
      for (let message of results) {
        if (message.author_id === users[message.author_id].id) {
          message.username = users[message.author_id].username;
          message.avatar = users[message.author_id].avatar
          messages.push(message);
        }
      }
      
      return messages;
    } catch (e) {
        console.log(e);
    }
  }
}

module.exports = {
    search: searchResults
};