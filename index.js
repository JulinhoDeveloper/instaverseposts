const express = require ('express');
const bodyParser = require ('body-parser');
const mongoose = require ('mongoose');
const cors = require ('cors');
const dotenv = require  ('dotenv');
const postRoutes = require ('./routes/posts.js');
const userRoutes =require  ('./routes/users.js');

const app = express()

dotenv.config()

app.use(bodyParser.json({ limit: "32mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "32mb", extended: true }))
app.use(cors())

app.use('/posts', postRoutes)
app.use('/user', userRoutes)



const PORT = process.env.PORT || 5001

mongoose.connect(process.env.CONNECTION_URL)
   .then(() => app.listen(PORT, () => console.log(`Servidor rodando na porta:${PORT}`)))
   .catch(err => console.log(err.message))