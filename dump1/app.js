let express = require("express");
let cors = require("cors");
let { MongoClient, ObjectId } = require("mongodb");
let path = require("path");
let app = express();
let port = process.env.port || 3000;
let router = express.Router();
let router2 = express.Router();

// MongoDB connection string - update this with your MongoDB URI
const mongoURI = "mongodb://localhost:27017";
const dbName = "citizens";
const collectionName = "citizens";

let db;
let citizens;

// Connect to MongoDB
MongoClient.connect(mongoURI)
    .then(client => {
        console.log("Connected to MongoDB");
    db = client.db(dbName);
    // Initialize the citizens collection reference once after connecting
    citizens = db.collection(collectionName);
        
        // Start server after MongoDB connection
        app.listen(port, () => {
            console.log("Listening on port " + port);
            const frames = ['○○○◉', '○○◉○', '○◉○○', '◉○○○']; // The animation frames
            let i = 0;

            const loader = setInterval(() => {
        // Use \r to return the cursor to the start of the current line
        // The extra space overwrites any longer previous characters
            process.stdout.write('\r' + frames[i++] + ' '); 
            i %= frames.length; // Loop back to the start of the frames array
            }, 250);


        });
    })
    .catch(error => {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..')));  // Serve static files from parent directory
app.use('/api/citizens', router);
app.use('/api/citizens/delete', router2);


// GET /api/citizens
// - If query param NDI_ID (or NID/nid) is present: return the matching citizen
//   e.g. GET /api/citizens?NDI_ID=20001120888
// - Otherwise return the full list
router.get('/', async (req, res) => {
    try {
        if (!citizens) citizens = db.collection(collectionName);
        const value = req.query.NDI_ID;
        const firstname = req.query.FirstName;
        const lastname = req.query.LastName;
        const DOB = req.query.DOB;
        const Email = req.query.Email;
        const Phone = req.query.Phone;
        const OCP = req.query.OCP;

        
        if (value) {
            console.log("fetch by id: "+value);
            const citizensList = await citizens.findOne({"NID": value});
            res.json([citizensList]);
            console.log("fetched one");
            console.log(citizensList);
        }else {
            if(firstname){
                const citizensList = await citizens.find({"FirstName": { $regex: firstname, $options: "i" }}).toArray();
                res.json(citizensList);
                console.log("fetched by first name");
                // console.log(citizensList);

            }else if(lastname){
                const citizensList = await citizens.find({"LastName": { $regex: lastname, $options: "i" }}).toArray();
                res.json(citizensList);
                console.log("fetched by last name");
            }else if(DOB){
                const citizensList = await citizens.find({"DoB": DOB}).toArray();
                res.json(citizensList);
                console.log("fetched by DOB");
            }else if(Email){
                
                const citizensList = await citizens.find({"Email": { $regex: Email, $options: "i" }}).toArray();
                res.json(citizensList);
                console.log("fetched by Email: " +Email);
            }else if(Phone){
                const citizensList = await citizens.find({"Phone": { $regex: Phone, $options: "i" }}).toArray();
                res.json(citizensList);
                console.log("fetched by Phone: " +Phone);
            }else if(OCP){
                const citizensList = await citizens.find({"Occupation": { $regex: OCP, $options: "i" }}).toArray();
                res.json(citizensList);
                console.log("fetched by Occupation: " +OCP);
            }else{
                const citizensList = await citizens.find({}).toArray();
                res.json(citizensList);
                console.log("fetched all");
            }
            
        }
        

       
    } catch (error) {
        console.error("Error fetching citizens:", error);
        res.status(500).send('Error fetching citizens');
    }
});

router2.post('/',async (req, res) => {
    const value = req.body.NDI_ID;
    console.log("hmm");
    try{
        if (!citizens) citizens = db.collection(collectionName);
        
        const result = await citizens.deleteOne({ "NID": value });
        res.json(result);
        console.log("deleted: "+ result);
    }catch (error){
        console.log("error : " +error);
    }


});




// app.post('/api/citizens/delete', async (req, res) => {
//     try {
//         const NDI = req.body.NDI_ID;
//         const result = await citizens.deleteOne({ NDI_ID: NDI });
//         console.log(result);
        
//     } catch (error) {

//     }
// });


// Register a new citizen
app.post('/api/citizens/register', async (req, res) => {
    try {
        console.log('Register endpoint hit');
        console.log('Request body:', req.body);
        const payload = req.body || {};

        // Basic required fields check (FirstName, LastName, DoB)
        if (!payload.FirstName || !payload.LastName || !payload.DoB) {
            console.log('Missing required fields');
            return res.status(400).json({ error: 'Missing required fields: FirstName, LastName, DoB' });
        }

        // Generate a simple NID for the demo if not provided
        if (!payload.NID) {
            payload.NID = 'NID' + Date.now().toString().slice(-8);
        }

        payload.createdAt = new Date();

        // Ensure citizens collection exists
        if (!citizens) {
            console.log('Citizens collection not initialized, initializing now...');
            citizens = db.collection('citizens');
        }

        console.log('Inserting into MongoDB:', payload);
        const result = await citizens.insertOne(payload);
        console.log('Insert successful, id:', result.insertedId);
        res.json({ success: true, nid: payload.NID, id: result.insertedId });
    } catch (error) {
        console.error('Error registering citizen:', error);
        res.status(500).json({ error: 'Error registering citizen' });
    }
});












// Simple login endpoint (lookup by NID)
app.post('/api/login', async (req, res) => {
    try {
        console.log('Login endpoint hit');
        console.log('Request body:', req.body);
        const { nid, NID, password } = req.body || {};
        const lookup = nid || NID;
        if (!lookup) {
            console.log('Missing nid parameter');
            return res.status(400).json({ error: 'Missing nid' });
        }

        if (!citizens) {
            console.log('Citizens collection not initialized, initializing now...');
            citizens = db.collection('citizens');
        }

        console.log('Looking up user with NID:', lookup);
        const user = await citizens.findOne({ $or: [{ NID: lookup }, { nid: lookup }] });
        if (!user) {
            console.log('User not found for NID:', lookup);
            return res.status(404).json({ error: 'User not found' });
        }
        
        console.log('User found:', user);

        // NOTE: Password check is not implemented here because the registration form
        // does not include a password field. For production, store and verify hashed
        // passwords. This endpoint simply returns the user document on match.
        // Remove sensitive fields before returning if necessary.

        // Exclude internal MongoDB fields if desired
        const { _id, ...safeUser } = user;
        res.json({ success: true, user: safeUser });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Login error' });
    }
});

// Support path-style lookup as well: GET /api/citizens/:id
router.get('/:id', async (req, res) => {
    try {
        if (!citizens) citizens = db.collection(collectionName);
        const idParam = req.params.id;
        if (!idParam) return res.status(400).send('Missing id');

        const orClauses = [];
        const asNum = Number(idParam);
        if (!Number.isNaN(asNum) && isFinite(asNum)) orClauses.push({ NDI_ID: asNum }, { id: asNum });
        orClauses.push({ NDI_ID: idParam }, { NID: idParam }, { id: idParam });
        if (ObjectId.isValid(idParam)) {
            try { orClauses.push({ _id: new ObjectId(idParam) }); } catch (e) { }
        }

        const citizen = await citizens.findOne({ $or: orClauses });
        if (!citizen) return res.status(404).send('Citizen not found');
        const { _id, ...safe } = citizen;
        res.json(safe);
    } catch (error) {
        console.error('Error fetching citizen by path id:', error);
        res.status(500).send('Error fetching citizen');
    }
});