import {db} from "../database/db.js";

const Client = db.Clients;
const AdditionalData = db.AdditionalClientData;
const Payment = db.Payments;

export const reportsRepo = {
    getAllData,
  };

async function getAllData (req, res){

    

}