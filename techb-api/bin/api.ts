import { CaApp } from "@common-api/common-api";

let connections = require('../ormconfig.json');
let app = CaApp.bootstrap({
    cookieSecret: 'yDYgk5%Ip5Ex',
    sessionSecret: 'IwTXLNAbFC$n',
    connections: connections,
    cors: true,
    origin: ['http://localhost:4200', 'http://localhost:4201'],
    port: Number(process.env.PORT)
});

export  {
    app
};