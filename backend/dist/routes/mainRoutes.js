"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dbController_1 = __importDefault(require("../controllers/dbController"));
const router = (0, express_1.Router)();
router.get('/', dbController_1.default.getUsers);
exports.default = router;
