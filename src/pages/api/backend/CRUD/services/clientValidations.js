import { db } from "../../database/db.js";

const Client = db.Clients;

export function clientNotFound(client) {
  if (!client) {
    throw {
      message: `"Client not found :(`,
      status: 404,
    };
  }
}

export async function clientAlredyExists(body) {
  if (await Client.findOne({ cli_id: body.cli_id })) {
    throw {
      message: 'User with ID "' + body.cli_id + '" already exists',
      status: 401,
    };
  }
}

export async function phoneAlredyInUse(body) {
  if (await Client.findOne({ cli_phone: body.cli_phone })) {
    throw {
      message: 'Phone "' + body.cli_phone + '" is already in use',
      status: 406,
    };
  }
}

export async function emailAlreadyInUse(body, res) {
  console.log("lolaoal", body.cli_email);
  if (await Client.findOne({ cli_email: body.cli_email })) {
    console.log("pppppppppppppppppppp");
    throw {
      message: 'Email "' + body.cli_email + '" is already in use',
      status: 409,
    };
  }
}

export async function emailAlreadyInUseForUpdate(body, client) {

  if (client.cli_email === body.cli_email) {
    return;
  }
  const existingClient = await Client.findOne({
    cli_id: { $ne: client.cli_id },
    cli_email: body.cli_email,
  });

  if (existingClient) {
    throw {
      message: `Email "${body.cli_email}" is already in use`,
      status: 409,
    };
  }
}

export async function validatePhone(body, client) {
  if (
    body.cli_phone &&
    (await Client.findOne({
      cli_phone: body.cli_phone,
      _id: { $ne: client._id },
    }))
  ) {
    throw {
      message: `Phone "${body.cli_phone}" is already in use`,
      status: 406,
    };
  }
}
