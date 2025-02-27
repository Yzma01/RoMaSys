import { makeFetch } from "./fetch";

function generateClient() {
  const firstNames = ["Juan", "María", "Carlos", "Ana", "Luis"];
  const lastNames = ["Pérez", "Rodríguez", "Gómez", "Fernández", "López"];
  const monthlyTypes = ["Dia", "Quincena", "Mes"];
  const goals = ["Pérdida de peso", "Ganancia de masa muscular", "tonificacion", "Mejora de la salud en general"];
  const genders = ["masculino", "femenino", "otro"];

  const randomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const hasAdditionalData = Math.random() > 0.5;
  const id = Math.floor(100000 + Math.random() * 900000);

  return {
    cli_id: id,
    cli_name: randomElement(firstNames),
    cli_last_name1: randomElement(lastNames),
    cli_last_name2: randomElement(lastNames),
    cli_monthly_payment_type: randomElement(monthlyTypes).toLowerCase(),
    cli_phone: `506${Math.floor(10000000 + Math.random() * 90000000)}`,
    cli_email: `user${id}@example.com`,
    cli_frozen: false,
    cli_remaining_days: 0,
    cli_register_date: new Date(),
    cli_rutine: hasAdditionalData,
    pay_amount: (Math.random() * 100).toFixed(2),
    cli_next_pay_date: "2024-10-01T00:00:00.000Z",
    cli_additional_data: hasAdditionalData
    ? {
        cli_goal: randomElement(goals),
        cli_gender: randomElement(genders),
        cli_height: Math.floor(150 + Math.random() * 50),
        cli_weight: Math.floor(50 + Math.random() * 50),
        cli_birthdate: new Date(
          1950 + Math.random() * 50,
          Math.random() * 12,
          Math.random() * 28
        ),
      }
    : null,
  };
}

async function saveClient(client) {
  try {
    const response = await makeFetch("/api/clients", "POST", "", client);
    if (response.status == 500) {

      console.log(client)
      console.log(response)
    }
  } catch (error) {
    console.error("Error al guardar el cliente:", error);
  }
}

export const saveClients = async () => {
  const numClients = 10;
  for (let i = 1; i <= numClients; i++) {
    const client = generateClient();
    await saveClient(client);
  }
  return true;
}

export const deleteClients = async () => {
  let data
  const response = await makeFetch("/api/clients", "GET", "");
  if (response.status === 200) {
    data = await response.json();
    for (const client of data) {
      await deleteClient(client.cli_id);
    }
  }
  if (response.status === 500) {
    return true;
  }
  return true;
}
