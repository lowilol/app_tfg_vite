const Incidencia = require('./Incidencia');
const Laboratorio = require('./Laboratorio');
const LaboratorioIncidencia = require('./Incidencia_lab');
const sequelize = require('../config/connection');

const Usuario = require('./User');
const Turno = require('./Turno');
const Reserva = require('./Reserva');

// Relación Muchos a Muchos entre Incidencia y Laboratorio
Incidencia.belongsToMany(Laboratorio, {
    through: LaboratorioIncidencia,
    foreignKey: 'id_incidencia',
    otherKey: 'id_laboratorio',
    as: 'laboratorio'
});

Laboratorio.belongsToMany(Incidencia, {
    through: LaboratorioIncidencia,
    foreignKey: 'id_laboratorio',
    otherKey: 'id_incidencia',
    as: 'incidencia'
});

Usuario.hasMany(Reserva, { 
    foreignKey: 'id_user',
     as: 'reserva'
     });
Laboratorio.hasMany(Turno, { 
    foreignKey: 'id_laboratorio',
     as: 'turno',
     onDelete: 'CASCADE',
     });
Turno.hasMany(Reserva, { 
    foreignKey: 'id_turno',
     as: 'reserva' 
    });




    sequelize.sync({ force: false }) 
    .then(() => {
        console.log('Modelos sincronizados correctamente.');
    })
    .catch(error => {
        console.error('Error al sincronizar los modelos:', error);
    });

module.exports = { Incidencia, Laboratorio, LaboratorioIncidencia,Usuario,Turno,Reserva };