import express, { Express } from "express"
import mongoose from "mongoose"
import cors from "cors"
import todoRoutes from "./routes"
import swaggerUi from "swagger-ui-express";
import bodyParser from "body-parser";

const app: Express = express()

const PORT: string | number = process.env.PORT || 4000
console.log(process.env.MONGO_USER)
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(undefined, {
      swaggerOptions: {
        url: "/swagger.json",
      },
    })
  );
app.use(todoRoutes)



const uri: string = `mongodb+srv://sanjayas430:Sanjayas%40962054@todocluster.tp104vs.mongodb.net/ToDoData`
const options = { useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify:true }

mongoose
  .connect(uri,{ retryWrites: true, w: 'majority' })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    )
  )
  .catch(error => {
    throw error
  })