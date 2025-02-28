import { db } from "../database/db.js";

const Client = db.Clients;
const AdditionalData = db.AdditionalClientData;
const Payment = db.Payments;

export const reportsRepo = {
  basicReport,
  incomingByRange,
};

const monthNames = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

async function basicReport(req, res) {
  try {
    const amountByGender = await getClientsByGender();
    const amountByTypeOfMonthlyPayment =
      await getClientsByTypeOfMonthlyPayment();
    const amountByMonth = await getAmountClientsByMonth();
    const lastMonthIncoming = await getLastMonthIncoming();

    res.status(200).json({
      amountByGender: amountByGender,
      amountByTypeOfMonthlyPayment: amountByTypeOfMonthlyPayment,
      amountByMonth: amountByMonth,
      lastMonthIncoming: lastMonthIncoming,
    });
  } catch (error) {
    res.status(500).json({ message: "Error getting client" + error.message });
  }
}

async function getClientsByGender() {
  //*Se le conoce como pipeline
  return await AdditionalData.aggregate([
    {
      $group: {
        _id: "$cli_gender",
        count: { $sum: 1 },
      },
    },
  ]);
}

async function getClientsByTypeOfMonthlyPayment() { //!QUITAR ESTO Y POSIBLE COLOCAR A CLIENTES CON RUTINA Y CLIENTES SIN RUTINA
  return await Client.aggregate([
    {
      $group: {
        _id: "$cli_monthly_payment_type",
        count: { $sum: 1 },
      },
    },
  ]);
}

async function getAmountClientsByMonth() {
  const amountByMonth = await Client.aggregate([
    {
      $group: {
        _id: { $month: "$cli_register_date" },
        count: { $sum: 1 },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);

  return amountByMonth.map((item) => ({
    month: monthNames[item._id - 1],
    count: item.count,
  }));
}

async function getLastMonthIncoming() {
  const currentDate = new Date();
  const thirtyDaysBefore = new Date();
  thirtyDaysBefore.setDate(currentDate.getDate() - 30);

  return await Payment.aggregate([
    {
      $match: {
        pay_date: {
          $gte: new Date(thirtyDaysBefore),
          $lte: new Date(currentDate),
        },
      },
    },
    {
      $group: {
        _id: {
          date: { $dateToString: { format: "%Y-%m-%d", date: "$pay_date" } },
        },
        total: { $sum: { $toDouble: "$pay_amount" } },
      },
    },
    {
      $sort: { "_id.date": 1 },  
    },
  ]);
}

async function incomingByRange(req, res) {

  console.log(req.query);


  const { startDate, endDate, monthlyPaymentType } = req.query;

  let monthly_Payment_Type = monthlyPaymentType.split("/")[0];

  console.log(monthly_Payment_Type);


  try {

      const matchQuery = { 
        pay_date: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        },
      };

      if(monthly_Payment_Type != ""){
        console.log("dcdscdscdscsdcdscdscdsc")
        matchQuery.pay_monthly_payment_type = monthly_Payment_Type;
      }

      const gainsInRange = await Payment.aggregate([
      {
        $match: matchQuery,
      },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: "%Y-%m-%d", date: "$pay_date" } },
          },
          total: { $sum: { $toDouble: "$pay_amount" } },
        },
      },
      {
        $sort: { "_id.date": 1 },  
      },
    ]);

    res.status(200).json(gainsInRange);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
