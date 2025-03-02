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
    const amountByWithAndWithoutRoutine =
      await getClientsWithAndWithoutRoutine();

    const amountByTypeOfMonthlyPayment =
      await getClientsByTypeOfMonthlyPayment();
    const amountByMonth = await getAmountClientsByMonth();
    const lastMonthIncoming = await getLastMonthIncoming();

    res.status(200).json({
      amountByWithAndWithoutRoutine: amountByWithAndWithoutRoutine,
      amountByTypeOfMonthlyPayment: amountByTypeOfMonthlyPayment,
      amountByMonth: amountByMonth,
      lastMonthIncoming: lastMonthIncoming,
    });
  } catch (error) {
    res.status(500).json({ message: "Error getting client" + error.message });
  }
}

// async function getClientsByGender() {
//   //*Se le conoce como pipeline
//   return await AdditionalData.aggregate([
//     {
//       $group: {
//         _id: "$cli_gender",
//         count: { $sum: 1 },
//       },
//     },
//   ]);
// }

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

async function getClientsWithAndWithoutRoutine() {
  try {
    const result = await Client.aggregate([
      {
        $group: {
          _id: "$cli_rutine",
          count: { $sum: 1 },
        },
      },
    ]);

    const withRoutine = result.find((group) => group._id === true) || {
      count: 0,
    };
    const withoutRoutine = result.find((group) => group._id === false) || {
      count: 0,
    };

    return {
      withRoutine: withRoutine.count,
      withoutRoutine: withoutRoutine.count,
    };
  } catch (error) {
    console.error("Error al obtener la cantidad de clientes:", error);
    throw error;
  }
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

async function getIncomingByTypeOfMonthly(monthly_Payment_Type) {
  const currentDate = new Date();
  const thirtyDaysBefore = new Date();
  thirtyDaysBefore.setDate(currentDate.getDate() - 30);
console.log("🐕🐕🐕🐕🐕🐕", monthly_Payment_Type);
  return await Payment.aggregate([
    {
      $match: {
        pay_monthly_payment_type: monthly_Payment_Type,
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
  ]);
}

async function getIncomingData(startDate, endDate, monthly_Payment_Type) {
  if (!startDate && !endDate && !monthly_Payment_Type) {
    return await getLastMonthIncoming();
  }

  if (!startDate && !endDate && monthly_Payment_Type) {
    return await getIncomingByTypeOfMonthly(monthly_Payment_Type);
  }

  if (startDate && endDate) {
    return await fetchIncomingByDateRange(
      startDate,
      endDate,
      monthly_Payment_Type
    );
  }
}

async function fetchIncomingByDateRange(
  startDate,
  endDate,
  monthly_Payment_Type
) {
  const matchQuery = {
    pay_date: {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    },
  };

  if (monthly_Payment_Type) {
    matchQuery.pay_monthly_payment_type = monthly_Payment_Type;
  }

  return await Payment.aggregate([
    { $match: matchQuery },
    {
      $group: {
        _id: {
          date: {
            $dateToString: { format: "%Y-%m-%d", date: "$pay_date" },
          },
        },
        total: { $sum: { $toDouble: "$pay_amount" } },
      },
    },
    { $sort: { "_id.date": 1 } },
  ]);
}

async function incomingByRange(req, res) {
  const { startDate, endDate, monthlyPaymentType } = req.query;
  const monthly_Payment_Type = monthlyPaymentType?.split("/")[0] || "";

  try {
    const gainsInRange = await getIncomingData(
      startDate,
      endDate,
      monthly_Payment_Type
    );
    console.log("Ddsds", gainsInRange);
    return res.status(200).json(gainsInRange);
  } catch (error) {
    console.error("No se logró obtener los ingresos por rango.", error);
    res.status(500).json({ error: error.message });
  }
}
