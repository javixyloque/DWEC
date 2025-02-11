import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';

// Constants
const JWT_SECRET_KEY = 'values of beta will give rise to dom!';
const MONGO_DB_URL = 'mongodb://127.0.0.1:27017/mongostore';

const app = express();

// Middleware for CORS
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', ['GET', 'POST', 'PUT', 'DELETE']);
    res.append('Access-Control-Allow-Headers', ['Content-Type', 'Authorization']);
    next();
});

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

////////////////////////////////////////////////////////////////////////
// MongoDB Connection and initialization
////////////////////////////////////////////////////////////////////////
async function initialize() {
    console.log('Connecting to MongoDB...');
    try {
        await mongoose.connect(MONGO_DB_URL);
        console.log('Connected to MongoDB at ' + MONGO_DB_URL);

        // MongoDB Schema
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
        const user = await User.findOne({ name: 'admin' });
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

        //////////////////////////////////////////////////////////////////////////
        // Routes
        //////////////////////////////////////////////////////////////////////////
        app.get('/', (_, res) => res.json('OK'));

        app.post('/login', async (req, res) => {
            const { username, password } = req.body;

            // Check username exists in the Users collection and password is correct
            const user = await User.findOne({ name: username, password: password });
            if (!user) {
                return res.status(401).send('Invalid username or password');
            }

            // Generate JWT token and pass it to the client
            const token = jwt.sign({ username }, JWT_SECRET_KEY, { expiresIn: "24h" });
            return res.json({ token });
        });

        // Authentication middleware with JWT
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

        app.get('/object', authenticateToken, async (req, res) => {
            const owner = req.user.username;
            const ownerUser = await User.findOne({ name: owner });
            const dbObjects = await DBObject.find({ owner: ownerUser._id });
            if (!dbObjects) {
                return res.status(404).send('Object not found.');
            }
            return res.json(dbObjects);
        });

        // Other routes...

        //////////////////////////////////////////////////////////////////////////
        // Start the server
        //////////////////////////////////////////////////////////////////////////
        app.listen(3000, () => {
            console.log('Server is running on http://localhost:3000');
        });

    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

initialize();
