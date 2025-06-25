import  express from 'express';
import  morgan from 'morgan';
import { PrismaClient } from '@prisma/client';
import  cors from 'cors'
import { getMetadata } from './metadata.js';
import userRoutes from "./src/routes/users.js"
import disciplinesRoutes from "./src/routes/disciplines.js"
import preferencesRoutes from "./src/routes/preferences.js"
import recommendsRoutes from "./src/routes/recommends.js"
import filesRoutes from "./src/routes/files.js"
import { configDotenv } from 'dotenv';

const app = express();
app.use(morgan('combined'));
const { parsed: envParsed } = configDotenv();
const port = envParsed.PORT
const prisma = new PrismaClient()


app.use(express.json());
app.use(cors())
app.get('/', (req, res) => {
    res.send('tcc-disciplines -> recomendação de disciplinas');
});

app.get('/health', (req, res) => {
    res.status(200).send('OK!');
});

// files
app.use("/files", filesRoutes(prisma))

// users
app.use("/users", userRoutes(prisma))

// disciplines
app.use("/disciplines", disciplinesRoutes(prisma))

// preference
app.use("/preferences", preferencesRoutes(prisma))

// recommends
app.use("/recommends", recommendsRoutes(prisma))

// information about acurate
app.get("/metadata", (req, res) => {
    getMetadata(req, res, prisma)
})

app.listen(port, () => console.log(`tcc-disciplines app listening on port ${port}!`))