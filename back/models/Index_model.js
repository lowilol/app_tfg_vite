
const sequelize = require('../config/connection');
const Laboratorio = require('./Laboratorio');
const IncidenciaLab = require('./Incidencia_lab');


const IncidenciaLTurno = require('./Incidencia_lab');

const Usuario = require('./User');
const Turno = require('./Turno');
const Reserva = require('./Reserva');
const Alumno = require('./Alumno');

/* relación turno - reserva */


/* relación reserva - alumno */
Reserva.belongsTo(Alumno, { foreignKey: "id_alumno", as: "alumno" , onUpdate: 'CASCADE'});

/* relación usuario - reserva */
Usuario.hasMany(Reserva, { foreignKey: "id_user", as: "reservas" , onUpdate: 'CASCADE'});

/* relación incidencia laboratorio */
IncidenciaLab.belongsTo(Laboratorio, { foreignKey: "id_laboratorio", as: "laboratorio" });
Laboratorio.hasMany(IncidenciaLab, { foreignKey: "id_laboratorio", as: "incidencias" });

IncidenciaLTurno.belongsToMany(Turno, {
    foreignKey: 'id_incidencia',
    otherKey: 'id_laboratorio',
    as: 'laboratorio'
});

Turno.belongsToMany(IncidenciaLTurno, {
    foreignKey: 'id_laboratorio',
    otherKey: 'id_incidencia',
    as: 'incidencia'
});


/*




IncidenciaLab.belongsToMany(Laboratorio, {
    foreignKey: 'id_incidencia',
    otherKey: 'id_laboratorio',
    as: 'laboratorio'
});

Laboratorio.belongsToMany(IncidenciaLab, {
    foreignKey: 'id_laboratorio',
    otherKey: 'id_incidencia',
    as: 'incidencia'
});



    
Laboratorio.hasMany(Turno, { 
    foreignKey: 'id_laboratorio',
     as: 'turno',
     onDelete: 'CASCADE',
     });
Turno.belongsTo(Laboratorio, { foreignKey: 'id_laboratorio', as: 'laboratorio' });


Turno.hasMany(Reserva, { 
    foreignKey: 'id_turno',
     as: 'reserva' 
    });

Turno.hasMany(Reserva, { foreignKey: 'id_turno', as: 'reservas' });


Reserva.belongsTo(Alumno, { foreignKey: 'id_alumno', as: 'alumno' });

Usuario.hasMany(Reserva, { 
    foreignKey: 'id_user',
     as: 'reserva'
  
  
    });
*/



    sequelize.sync({ force: false }) 
    .then(() => {
        console.log('Modelos sincronizados correctamente.');
    })
    .catch(error => {
        console.error('Error al sincronizar los modelos:', error);
    });

   module.exports = { Laboratorio, Usuario, Turno, Reserva, IncidenciaLab }
    