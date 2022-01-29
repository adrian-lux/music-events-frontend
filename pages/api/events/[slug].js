// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const {events} = require('./data.json');
const qs = require('qs');



export default function handler(req, res) {

    const evt = events.filter((evt)=> req.query.slug === evt.slug)

  if(req.method === "GET"){
    res.status(200).json(evt)
  }
  else{
    res.setHeader('Allow',['GET'])
    res.status(405).json({'message':`method ${req.method} is not allowed.`})
  }
}