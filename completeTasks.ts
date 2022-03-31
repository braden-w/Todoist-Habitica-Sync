require("dotenv").config()

const axios = require("axios")

/* Complete all tasks using the Habitica API */

// Fetch the alias of all tasks in Habitica
const getAliases = async () => {
  const { data } = await axios.get("https://habitica.com/api/v3/tasks/user", {
    headers: {
      "x-api-user": process.env.api_user,
      "x-api-key": process.env.api_key,
    },
  })
  return data.data.map((task) => task.alias)
}

const main = async () => {
  const aliases = await getAliases()
  console.log("🚀 ~ file: completeTasks.ts ~ line 21 ~ main ~ aliases", aliases)
  // Delete all tasks from aliases using the Habitica API
  for (const alias of aliases) {
    await axios.post(
      "https://habitica.com/api/v3/tasks/user/:id/score/up",
      {
        id: alias,
      },
      {
        headers: {
          "x-api-user": process.env.api_user,
          "x-api-key": process.env.api_key,
        },
      }
    )
  }
}

main()
