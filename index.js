const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const userRouter = require('./routes/v1/user.route');


app.use(cors());
app.use(express.json());


async function run() {
    try {
        app.use('/user', userRouter );
    } finally {

    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Server is running');
});

app.listen(port, () => console.log(`Serer is running at ${port}`));