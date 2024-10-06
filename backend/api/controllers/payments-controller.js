import { paymentsRepo } from "../CRUD/payments-repo.js";

export const addPayment = (req, res) => {
  paymentsRepo.addPayment(req, res);
};
