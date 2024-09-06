"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 3000;
app.use((0, cors_1.default)());
app.get('/api/nba-scores', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { date, apiKey } = req.query;
    if (!date || !apiKey) {
        return res.status(400).json({ error: 'Date and API key are required' });
    }
    try {
        const response = yield axios_1.default.get(`https://api.balldontlie.io/v1/games?dates[]=${date}&dates[]=${date}`, {
            headers: { 'Authorization': apiKey }
        });
        res.json(response.data);
    }
    catch (error) {
        console.error('Error fetching NBA scores:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Error fetching NBA scores', details: error.response ? error.response.data : error.message });
    }
}));
app.listen(port, () => {
    console.log(`Backend server running at http://localhost:${port}`);
});
