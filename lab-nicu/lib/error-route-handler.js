'use strict';

module.exports = (err,req,res,next) =>{
  if(err.message.includes('validation failed')) return res.sendStatus(400);
  if(err.message.includes('ObjectId failed')) return res.sendStatus(404);
  if(err.message.includes('duplicate key error')) return res.sendStatus(409);
  return res.sendStatus(500);
};