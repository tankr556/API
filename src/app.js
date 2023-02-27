const mongoose = require("mongoose")
const express = require("express")
const app = express();
app.use(express.json())
const PORT = 9000;
const url = "mongodb+srv://rakesh:rakesh@cluster0.i1xmtxr.mongodb.net/API?retryWrites=true&w=majority"
mongoose.connect(url).then(() => {
    console.log("Db Connected");
}).catch(err => {
    console.log(err);
})

const userSchema = new mongoose.Schema({
    username: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    birthdate: {
        type: Date,
        default: new Date().now
    }
})

const User = new mongoose.model("User", userSchema)

app.post("/users", async (req, resp) => {
    try {
        const user = new User(req.body)
        const data = await user.save()
        resp.send(data)
        console.log(data);
    } catch (error) {
        console.log(error);
    }
})

app.get("/users", async (req, resp) => {
    try {
        const user = await User.find();
        resp.send(user)
        console.log(user);
    } catch (error) {
        console.log(error);
    }
})

app.get("/users/:id", async (req, resp) => {
    const id = req.params.id
    try {
        const user = await User.findById(id)
        resp.send(user)
        console.log(user);
    } catch (error) {
        console.log(error);
    }
})

app.put("/users/:id", async (req, resp) => {
    const id = req.params.id
    try {
        const data = await User.findByIdAndUpdate(id, req.body);
        resp.send(data)
    } catch (error) {
        resp.send(error);

    }

})
app.delete("/users/:id", async (req, resp) => {
    const id = req.params.id
    try {
        const data = await User.findByIdAndDelete(id);
        resp.send(data)
    } catch (error) {
        resp.send(error);

    }

})



app.listen(PORT, () => {
    console.log("Server running on port:" + PORT);
})