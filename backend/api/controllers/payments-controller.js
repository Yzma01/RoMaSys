import { paymentsRepo } from "../CRUD/payments-repo.js";

export const addPayment = (req, res) => {
  paymentsRepo.addPayment(req, res);
};

export const getPayment = (req, res) => {
  const { pay_client_id } = req.params;
  paymentsRepo.getPayment(req, res, pay_client_id);
};
