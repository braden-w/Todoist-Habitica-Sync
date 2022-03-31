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
  // Remove all undefined entries
  const aliases = data.data.map((task) => task.alias)
  return aliases.filter((alias) => alias !== undefined)
}

const main = async () => {
  const aliases = await getAliases()
  console.log("🚀 ~ file: completeTasks.ts ~ line 21 ~ main ~ aliases", aliases)
  // Delete all tasks from aliases using the Habitica API
  for (const alias of aliases) {
    // Get response from axios post
    const { data } = await axios.post(
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
    console.log("🚀 ~ file: completeTasks.ts ~ line 36 ~ main ~ data", data)

    // Wait for a second before completing the next task
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }
}

main()
