const { Laboratorio, Incidencia } = require('./models');

async function consultarLaboratoriosConIncidencias() {
    const laboratorios = await Laboratorio.findAll({
        include: [
            {
                model: Incidencia,
                as: 'incidencias',
                through: { attributes: ['fecha_asociacion'] } // Incluye la fecha
            }
        ]
    });

    console.log(JSON.stringify(laboratorios, null, 2));
}

consultarLaboratoriosConIncidencias();