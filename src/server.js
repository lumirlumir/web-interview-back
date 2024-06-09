const http = require('http');
const url = require('url');
const qs = require('qs');
const dotenv = require('dotenv');
const { fetchQuestionMain, fetchQuestionSub, fetchAnswer, fetchFeedback } = require('./services/openaiService');

dotenv.config();

/* Func */
const response = (res, code, text) => {
  res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify({ text }));
};

http
  .createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL); // CORS

    const { pathname, query } = url.parse(req.url);
    const queryParsed = qs.parse(query); // for array

    console.log(`TIME: ${new Date()}\nMETHOD: ${req.method}\nURL: ${req.url}`);
    console.log(queryParsed, '\n');

    if (req.method === 'GET') {
      switch (pathname) {
        case '/question/main': {
          const { type, history } = queryParsed;

          fetchQuestionMain(type, typeof history === 'undefined' ? [] : history).then(result => response(res, 200, result));
          break;
        }
        case '/question/sub': {
          const { question, answerUser } = queryParsed;

          fetchQuestionSub(question, answerUser).then(result => response(res, 200, result));
          break;
        }
        case '/answer': {
          const { question } = queryParsed;

          fetchAnswer(question).then(result => response(res, 200, result));
          break;
        }
        case '/feedback': {
          const { answerSystem, answerUser } = queryParsed;

          fetchFeedback(answerSystem, answerUser).then(result => response(res, 200, result));
          break;
        }
        default: {
          response(res, 400, 'Invalid Request');
          break;
        }
      }
    }
  })
  .listen(process.env.BACKEND_PORT);
