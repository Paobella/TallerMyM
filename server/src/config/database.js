const sql = require('mssql');
const dbConfig = {
    server: "DESKTOP-0SPR090",
    database: "MYM_DB",
    user: "MYM_User",
    password: "T4ll3RMyM-",
    options: {
        trustedConnection: true,
        trustServerCertificate: true,
    }
};
// Función de conexión
async function connectDB() {
    try {
        const pool = await sql.connect(dbConfig);
        console.log('Conectado a la base de datos');
        return pool;
    } catch (error) {
        console.error('Error al conectar a la BD:', error);
        throw error;
    }
}
exports.connectDB = connectDB;
