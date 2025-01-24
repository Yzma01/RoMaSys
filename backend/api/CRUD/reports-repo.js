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

async function getClientsByTypeOfMonthlyPayment() {
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
  const today = new Date();
  const currentMonth = today.getMonth() + 1; 
  const currentYear = today.getFullYear();

  return await Payment.aggregate([
    {
      $match: {
        $expr: {
          $and: [
            { $eq: [{ $month: "$pay_date" }, currentMonth] },
            { $eq: [{ $year: "$pay_date" }, currentYear] },
          ],
        },
      },
    },
    {
      $group: {
        _id: { $month: "$pay_date" },
        total: { $sum: "$pay_amount" },
      },
    },
  ]);
}

async function incomingByRange(req, res) {
  const body = req.body;

  try {
    const gainsInRange = await Payment.aggregate([
      {
        $match: {
          pay_monthly_payment_type: body.monthly_payment_type,
          pay_date: {
            $gte: new Date(body.startDate),
            $lte: new Date(body.endDate),
          },
        },
      },
      {
        $group: {
          _id: { $month: "$pay_date" },
          total: { $sum: "$pay_amount" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);


    res.json({ message: gainsInRange });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error getting gains by range" + error.message });
  }
}
