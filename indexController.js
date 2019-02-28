'use strict';
import { join } from "path";

export function index(req, res, next){
    return res.sendFile(join(__dirname + 'index.html'));
}