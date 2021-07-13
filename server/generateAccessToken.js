import jwt from "jsonwebtoken";
import {secret} from './config.js';

export const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, secret.secret, {
        expiresIn: "24h"
    })
}