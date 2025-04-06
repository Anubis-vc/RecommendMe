"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// const cors = require('cors');
const mainRoutes_1 = __importDefault(require("./routes/mainRoutes"));
const app = (0, express_1.default)();
const PORT = process.env.port || 3000;
app.use('/users', mainRoutes_1.default);
app.get('/', (req, res) => {
    res.send('hello world');
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
