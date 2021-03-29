// Require express and body-parser
const express = require("express")
const app = express()
const PORT = 3000

// Tell express to use body-parser's JSON parsing
app.use(express.json())

// Start express on the defined port
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))

app.get("/", (req: any, res: { send: (arg0: string) => void }) => {
  res.send("Hello!")
})

app.post(
  "/hook",
  (
    req,
    res: {
      status: (
        arg0: number
      ) => { (): any; new (): any; end: { (): void; new (): any } }
    }
  ) => {
    console.log(req)
    console.log(req.body) // Call your action on the request here
    const { event_data, event_name } = req.body
    console.log(event_data, event_name)
    res.status(200).end() // Responding is important
  }
)
// Generated by https://quicktype.io
