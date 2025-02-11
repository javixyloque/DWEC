import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';

////////////////////////////////////////////////////////////////////////
// Constants
////////////////////////////////////////////////////////////////////////
const JWT_SECRET_KEY = 'values of beta will give rise to dom!';
const MONGO_DB_URL = 'mongodb://localhost:27017/mongostore';


////////////////////////////////////////////////////////////////////////
// MongoDB Connection
////////////////////////////////////////////////////////////////////////
console.log('Connecting to MongoDB...');
await mongoose.connect(MONGO_DB_URL);
console.log('Connected to MongoDB at ' + MONGO_DB_URL);


////////////////////////////////////////////////////////////////////////
// MongoDB Schema
////////////////////////////////////////////////////////////////////////
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    admin: Boolean,
});

const User = mongoose.model('User', userSchema);

const dbObjectSchema = new mongoose.Schema({
    name: String,
    value: String,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const DBObject = mongoose.model('Object', dbObjectSchema);

// Make sure there is an admin user
await User.findOne({ name: 'admin' })
    .then(async (user) => {
        if (!user) {
            const adminUser = new User({
                name: 'admin',
                email: 'admin@example.com',
                password: 'adminpassword',
                admin: true,
            });
            try {
                await adminUser.save();
                console.log('Created admin user');
            } catch (err) {
                console.error('Error creating admin user:', err);
            }
        } else {
            console.log('Admin user already exists, no need to create one');
        }
    })
    .catch((err) => {
        console.error('Error checking for admin user:', err);
    });


////////////////////////////////////////////////////////////////////////
// Authentication middleware with JWT
////////////////////////////////////////////////////////////////////////
const authenticateToken = async (req, res, next) => {
    if (!req.headers['authorization']) {
        return res.status(401).send('No Token Provided!');
    }

    if (!req.headers['authorization'].startsWith('Bearer ')) {
        return res.status(401).send('Invalid Token Format!');
    }
    
    const token = req.headers['authorization'].split(' ')[1];
    
    
    try {
        const user = jwt.verify(token, JWT_SECRET_KEY);
        req.user = user;
        next();
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
}

// PREVENT CORS TROUBLE (WORK ON HTML)
app.use ((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', ['GET', 'POST', 'PUT', 'DELETE']);
    res.append('Access-Control-Allow-Headers', ['Content-Type', 'Authorization']);
    next();
})


////////////////////////////////////////////////////////////////////////
// Create the express.js server
////////////////////////////////////////////////////////////////////////
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


////////////////////////////////////////////////////////////////////////
// Routes
////////////////////////////////////////////////////////////////////////
app.get('/', (_, res) => res.json('OK'));
    // app.get ('/', (req, res) => res.send("Hola mundo"))

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Check username exists in the Users collection and password is correct
    const user = await User.findOne({ name: username, password: password });
    if (!user) {
        return res.status(401).send('Invalid username or password');
    }
    

    // Generate JWT token and pass it to the client
    
    // BEARER TOKEN{
    //     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNzM5MTgzMTA2LCJleHAiOjE3MzkyNjk1MDZ9.tUYaF3tzJHwbSiBGvPWwPJ2x4pjmhqrYxoZPc6a3w38"
    // }
    const token = jwt.sign({ username }, JWT_SECRET_KEY, { expiresIn: "24h" });
    console.log('token:', token);
    return res.json({ token });
});

app.get('/object', authenticateToken, async (req, res) => {
    const owner = req.user.username;
    const ownerUser = await User.findOne({ name: owner });
    const dbObjects = await DBObject.find({ owner: ownerUser._id });
    console.log('dbObjects:', dbObjects);
    if (!dbObjects) {
        return res.status(404).send('Object not found.');
    }
    return res.json(dbObjects);

});

app.get('/object/:name', authenticateToken, async (req, res) => {
    const { name } = req.params;
    const owner = req.user.username;

    if(!name) {
        return res.status(400).send('Name is required.');
    }

    const ownerUser = await User.findOne({ name: owner });
    const dbObject = await DBObject.findOne({ name, owner: ownerUser._id });
    if (!dbObject) {
        return res.status(404).send('Object not found.');
    }
    return res.json(dbObject);
});

app.post('/object', authenticateToken, async (req, res) => {
    const { name, value } = req.body;
    const owner = req.user.username;

    if(!name || !value) {
        return res.status(400).send('Name and Value are required.');
    }

    // Check the object name is unique for the owner
    const ownerUser = await User.findOne({ name: owner });
    const dbObject = await DBObject.findOne({ name, owner: ownerUser._id });
    if (dbObject) {
        return res.status(400).send('Object name already exists.');
    }

    // Create a new object
    const newObject = new DBObject({ name, value, owner: ownerUser._id });
    await newObject.populate('owner', ownerUser._id);
    const ret = await newObject.save();
    return res.json(ret);
});

app.put('/object/:name', authenticateToken, async (req, res) => {
    const { name } = req.params;
    const owner = req.user.username;

    if(!name) {
        return res.status(400).send('Name is required.');
    }

    const ownerUser = await User.findOne({ name: owner });
    const dbObject = await DBObject.findOne({ name, owner: ownerUser._id });
    if (!dbObject) {
        return res.status(404).send('Object not found.');
    }

    dbObject.value = value;
    await dbObject.save();
    return res.json(dbObject);
});

app.delete('/object/:name', authenticateToken, async (req, res) => {
    const { name } = req.params;
    const owner = req.user.username;

    if(!name) {
        return res.status(400).send('Name is required.');
    }

    const ownerUser = await User.findOne({ name: owner });
    const dbObject = await DBObject.findOne({ name, owner: ownerUser._id });
    if (!dbObject) {
        return res.status(404).send('Object not found.');
    }
    await dbObject.delete();
    return res.json(dbObject);
});

////////////////////////////////////////////////////////////////////////
// Start the server
////////////////////////////////////////////////////////////////////////
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
