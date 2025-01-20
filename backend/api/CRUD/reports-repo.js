import { db } from "../database/db.js";

const Client = db.Clients;
const AdditionalData = db.AdditionalClientData;
const Payment = db.Payments;

export const reportsRepo = {
  getBasicReport,
};

async function getBasicReport(req, res) {
  try {
    //*Se le conoce como pipeline
    const amountByGender = await getClientsByGender();
    const amountByTypeOfMonthlyPayment =
      await getClientsByTypeOfMonthlyPayment();
    const amountByMonth = await getAmountClientsByMonth();

    res.status(200).json({
      amountByGender: amountByGender,
      amountByTypeOfMonthlyPayment: amountByTypeOfMonthlyPayment,
      amountByMonth: amountByMonth,
    });
  } catch (error) {
    res.status(500).json({ message: "Error getting client" + error.message });
  }
}

async function getClientsByGender() {
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
