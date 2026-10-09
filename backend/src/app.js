const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3001;


// 🔗 1. Connect MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/pro-port')
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));


// 📦 2. Schema + Model
const appSchema = new mongoose.Schema({
    label: { type: String, required: true },
    route: { type: String, required: true },
    appId: { type: String, required: true },
    icon: { type: String, default: "folder" },
    order: { type: Number, default: 0 },
    visible: { type: Boolean, default: true }
}, { timestamps: true });

const AppModel = mongoose.model('App', appSchema);


// 🌐 3. Routes

// Home route
app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});


// ✅ POST (Create Data)
app.post('/apps', async (req, res) => {
    try {
        const newApp = new AppModel(req.body);
        const saved = await newApp.save();
        res.json(saved);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// ✅ GET (All Data)
app.get('/apps', async (req, res) => {
    try {
        const data = await AppModel.find().sort({ order: 1 });
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// ✅ GET (Single Data)
app.get('/apps/:id', async (req, res) => {
    try {
        const data = await AppModel.findById(req.params.id);
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/apps/:id', async (req, res) => {
    try {
        const updatedApp = await AppModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // return updated document
        );

        res.json(updatedApp);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.patch('/apps/:id', async (req, res) => {
    try {
        const updatedApp = await AppModel.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        res.json(updatedApp);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/apps/:id', async (req, res) => {
    try {
        await AppModel.findByIdAndDelete(req.params.id);
        res.json({ message: "App deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ▶️ Start Server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});