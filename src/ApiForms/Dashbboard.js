
const express = require('express');
const router = express.Router();
var config = require('../Connections/connection')
const TronWeb = require('tronweb');
var sql = require("mssql");


// invest
//  async function investment(req , res){
//     let pool = await sql.connect(config);
//     const request = pool.request();
//     let productsEmail = await pool.request().query(`Select * from Entry where EMail='${req.body.EMail}'`);
//     // const account = TronWeb.createAccount();
//     const dataEmail = productsEmail.rowsAffected;
//     // console.log(account);

//         if (dataUsername == 0) {
//             if (dataEmail == 0) {

//                 // request.input("username", sql.NVarChar, req.body.username)
//                 request.input("Mobile_No", sql.NVarChar, req.body.Mobile_No)
//                     .input("EMail", sql.NVarChar, req.body.EMail)
//                     .input("Memb_Name", sql.NVarChar, req.body.Memb_Name)
//                     .input("mpwd", sql.NVarChar, req.body.mpwd)
//                     .input("username", sql.NVarChar, req.body.username)
//                     .input("Reg_Date", sql.DateTime, date_ob);
//                 const q = "insert into Entry(Mobile_No , EMail , username , mpwd , Memb_Name , Reg_Date) values(@Mobile_No , @EMail , @username , @mpwd , @Memb_Name , @Reg_Date)"
//                 const result = await request.query(q)
//                 let products = await pool.request().query("select *from entry where memb_code=(SELECT  Max(Memb_Code) from Entry)");
//                 return products.recordsets;
//             }
//             else {
//                 var message = {
//                     "Code": "401",
//                     "Message": "Email Already Exists",
//                     "ActionDescription": "Invalid Details Please Contact Support"
//                 }
//                 return message;
//             }

//         }
//         else {
//             var message = {
//                 "Code": "401",
//                 "Message": "Username Already Exists",
//                 "ActionDescription": "Invalid Details Please Contact Support"
//             }
//             return message;
//         }

// }


async function ReggisterNew(req , res) {
    try {

        if (req.body["amount"] ) {
            let pool = await sql.connect(config);
            const request = pool.request();
            let transaction = await pool.request().query(`Exec SP_INVESTMENT ${req.body["memb_code"]} , ${req.body["amount"]}, ${req.body["from_Id"]}, ${req.body["trans_id"]}`);
            let products = await pool.request().query("select *from DONATIONDTL where SRNO=(SELECT  Max(SRNO) from DONATIONDTL)");
            return products.recordsets;
            // return transaction.recordsets;
        } else {
            var message = {
                "Code": "400",
                "Message": "Mismatch mandatory field: Amount",
                "ActionDescription": "Technical error / Invalid message. Contact Support"
            }
            return message;
        }
    } catch (error) {
        console.log(error);
    }
}





module.exports =
{
    // investment:investment,
    ReggisterNew: ReggisterNew
}