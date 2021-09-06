import listEndpoints from 'express-list-endpoints';
import mongoose from 'mongoose';

const { PORT, MONGO_CONNECTION_LOCAL, MONGO_CONNECTION_CLOUD, MONGO_CONNECTION_iCLOUD } = process.env;

import express from 'express';
import cors from 'cors';
import services from './services/index.js';
// import { errorHandler } from './middleWares/errorHandlers.js';

const app = express();

const whileList = [ '127.0.0.1:4200' ];

const corsOptions = {
    origin: ( origin, callback ) => {
        console.log( { whileList } );
        console.log( { origin } );
        callback( null, true );
        if ( whileList.indexOf( origin ) > -1 )
            callback( null, true );
        else
            callback( new Error( 'Origin not allowed' ) );
    }
};

app.use( cors() );

app.use( express.json() );

app.use( '/', services );

console.table( listEndpoints( app ) );


mongoose.connect( MONGO_CONNECTION_CLOUD );

mongoose.connection.on( 'connected', () => {
    console.info( `✅ Connected to MongoDB at ${ MONGO_CONNECTION_iCLOUD } 🤞🤞🚀🚀🚀` );
    app.listen( PORT, () => console.log( `✅ Server listening on port 🥳 ${ PORT } 🥳 🥳🥳🥳🥳🥳 :` ) );
    app.on( 'error', ( err ) => console.log( `❌ Server error: ${ err } 🥵🥵🥵🥵🥵🥵🥵  ` ) );

} );

mongoose.connection.on( 'error', ( err ) => console.log( `❌ Mongo error: ${ err } 📛📛📛📛📛📛📛📛  ` ) );
