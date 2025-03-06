import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Exportar los modelos de manera que no se sobrescriban
export const Models = {
  clientsModel: createClientModel(),
  additionalClientsDataModel: createAdditionalClientsDataModel(),
  rutinesModel: createRutinesModel(),
  paymentsModel: createPaymentsModel(),
  messagesAgendaModel: createMessagesAgendaModel(),
};

// Función para crear el modelo de clientes
function createClientModel() {
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
    cli_rutine: { type: Boolean, unique: false, required: false },
    cli_next_pay_date: { type: Date, unique: false, required: false },
    cli_email: { type: String, unique: true, required: false },
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

  return mongoose.models.Client || mongoose.model("Client", schema);
}

// Función para crear el modelo de datos adicionales de clientes
function createAdditionalClientsDataModel() {
  const schema = new Schema({
    cli_rutine_id: { type: Number, required: false },
    cli_goal: { type: String, required: false },
    cli_gender: { type: String, required: false },
    cli_height: { type: Number, required: false },
    cli_weight: { type: Number, required: false },
    cli_birthdate: { type: Date, required: false },
  });

  schema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
      delete ret._id;
    },
  });

  return mongoose.models.Additional_Clients_Data ||
    mongoose.model("Additional_Clients_Data", schema);
}

// Función para crear el modelo de rutinas
function createRutinesModel() {
  const schema = new Schema({
    rut_id: { type: Number, unique: true, required: true },
    rut_goal: { type: String, required: true },
    rut_gender: { type: String, required: true },
    rut_min_age: { type: Number, required: true },
    rut_max_age: { type: Number, required: true },
    rut_max_height: { type: Number, required: true },
    rut_min_height: { type: Number, required: true },
    rut_max_weight: { type: Number, required: true },
    rut_min_weight: { type: Number, required: true },
    rut_rutine: { type: String, required: true },
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

// Función para crear el modelo de pagos
function createPaymentsModel() {
  const schema = new Schema({
    pay_client_id: { type: String, required: true },
    pay_date: { type: Date, required: true },
    pay_amount: { type: Number, required: true },
    pay_monthly_payment_type: { type: String, required: true },
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

// Función para crear el modelo de agenda de mensajes
function createMessagesAgendaModel() {
  const schema = new Schema({
    msg_client_id: { type: String, required: true },
    msg_sent: { type: Boolean, required: true },
    msg_next_payment_date: { type: Date, required: false },
  });

  schema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
      delete ret._id;
    },
  });

  return mongoose.models.Messages_Agenda ||
    mongoose.model("Messages_Agenda", schema);
}
