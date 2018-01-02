import db from './db.js';
import mongoose from 'mongoose';

//骨架模板
let errLogSchema = new mongoose.Schema({
  source:{type:String},
  line:{type : Number},
  column:{type : Number},
  name:{type : String},
  sourceContent: {type : String},
  time     : {type : String},
  timestamp: {type : Number},
  report_id:{type: Number},
});

let errLogModel=db.model('errlog',errLogSchema);

export const insertErrLog=(errData)=>{
  errLogModel.create(errData,err=>{
    if(err)throw err
  })
}

export const findErrList=()=>{
  return new Promise((resolve)=>{
    errLogModel.find({}).sort({timestamp:-1}).exec((err,res)=>{
      resolve(res)
    })
  })
}

export const findErrDetail=async(id)=>{
  return await new Promise(resolve=>{
    let whereStr={'report_id':id}
    errLogModel.findOne(whereStr,(err,res)=>{
      resolve(res)
    })
  })
}

