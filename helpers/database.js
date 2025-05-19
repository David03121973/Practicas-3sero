// Versión corregida - Configuración directa sin .env
const { Sequelize } = require('sequelize');

// Configuración directa de la base de datos (reemplaza con tus datos)
const sequelize = new Sequelize(
  'GestionDeContratos',  // Nombre de la BD
  'postgres',            // Usuario
  'pg',                  // Contraseña
  {
    host: 'localhost',    // Host
    port: 5432,           // Puerto de PostgreSQL
    dialect: 'postgres',  // ¡Dialecto explícito en minúsculas!
    logging: false,       // Desactiva logs de SQL (opcional)
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

// Prueba de conexión
sequelize.authenticate()
  .then(() => console.log('✅ Conexión a PostgreSQL establecida'))
  .catch(err => console.error('❌ Error de conexión a la BD:', err));

module.exports = sequelize;