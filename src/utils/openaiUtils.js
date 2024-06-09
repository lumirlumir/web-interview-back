/**
 *
 * @param {string} role select among 'system', 'assistant', 'user'
 * @param {string} text
 * @returns
 */
const createMessagesObject = (role, text) => ({
  role,
  content: [
    {
      text,
      type: 'text',
    },
  ],
});

/**
 *
 * @param {string} role select among 'system', 'assistant', 'user'
 * @param {string[]} array
 * @returns
 */
const stringArrayToMessagesObjectArray = (role, array) => array.map(text => createMessagesObject(role, text));

module.exports = {
  createMessagesObject,
  stringArrayToMessagesObjectArray,
};
