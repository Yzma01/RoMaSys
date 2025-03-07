import { paymentsRepo } from "../CRUD/payments-repo.js";

export const addPayment = (req, res) => {
  console.log("lolalaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
  paymentsRepo._addPayment(req, res);
};

export const getPayment = (req, res) => {
  paymentsRepo._getPayment(req, res);
};
