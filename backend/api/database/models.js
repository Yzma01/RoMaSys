import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const Models = {
  clientsModel,
  additionalClientsDataModel,
  rutinesModel,
  paymentsModel,
  messagesAgendaModel,
};

function clientsModel() {
  const schema = new Schema({
    cli_id: { type: String, unique: true, required: true },
    cli_name: { type: String, unique: false, required: true },
    cli_last_name1: { type: String, unique: false, required: true },
    cli_last_name2: { type: String, unique: false, required: true },
    cli_monthly_payment_type: { type: String, unique: false, required: true },
    cli_phone: { type: String, unique: true, required: false },
    cli_frozen: { type: Boolean, unique: false, required: false },
    cli_remaining_days: { type: Number, unique: false, required: false },
    cli_register_date: { type: Date, unique: false, required: true },
    cli_rutine:  { type: Boolean, unique: false, required: false },
    cli_next_pay_date: { type: Date, unique: false, require: false },
    cli_additional_data: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Additional_Clients_Data",
      required: false,
    },
  });

  schema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
      delete ret._id;
    },
  });

  return mongoose.models.Clients || mongoose.model("Client", schema);
}

function additionalClientsDataModel() {
  const schema = new Schema({
    cli_rutine_id: { type: Number, unique: false, required: false },
    cli_goal: { type: String, unique: false, required: false },
    cli_email: { type: String, unique: true, required: false}, 
    cli_gender: { type: String, unique: false, required: false },
    cli_height: { type: Number, unique: false, required: false },
    cli_weight: { type: Number, unique: false, required: false },
    cli_birthdate: { type: Date, unique: false, required: false },
  });

  schema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
      delete ret._id;
    },
  });

  return (
    mongoose.models.Additional_Clients_Data ||
    mongoose.model("Additional_Clients_Data", schema)
  );
}

function rutinesModel() {
  const schema = new Schema({
    rut_id: { type: Number, unique: true, required: true },
    rut_goal: { type: String, unique: false, required: true },
    rut_gender: { type: String, unique: false, required: true },
    rut_min_age: { type: Number, unique: false, required: true },
    rut_max_age: { type: Number, unique: false, required: true },
    rut_max_height: { type: Number, unique: false, required: true },
    rut_min_height: { type: Number, unique: false, required: true },
    rut_max_weight: { type: Number, unique: false, required: true },
    rut_min_weight: { type: Number, unique: false, required: true },
    rut_rutine: { type: String, unique: false, required: true },
  });

  schema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
      delete ret._id;
    },
  });

  return mongoose.models.Rutines || mongoose.model("Rutines", schema);
}

function paymentsModel() {
  const schema = new Schema({
    pay_client_id: { type: String, unique: false, required: true },
    pay_date: { type: Date, unique: false, required: true },
    pay_amount: { type: Number, unique: false, required: true },
    pay_monthly_payment_type: { type: String, unique: false, required: true },
  });

  schema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
      delete ret._id;
    },
  });

  return mongoose.models.Payments || mongoose.model("Payments", schema);
}

function messagesAgendaModel() {
  const schema = new Schema({
    msg_client_id: { type: String, unique: false, required: true },
    msg_sent: { type: Boolean, unique: false, required: true },
    // msg_content: {type: String, unique: false, required: true},
    msg_next_payment_date: { type: Date, unique: false, required: false },
  });

  schema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
      delete ret._id;
    },
  });

  return (
    mongoose.models.Messages_Agenda || mongoose.model("Messages_Agenda", schema)
  );
}
