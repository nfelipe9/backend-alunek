import { ModeloAvance } from './avance.js';

const resolversAvance = {
  Query: {
    Avances: async (parent, args) => {
      const avances = await ModeloAvance.find().populate('proyecto').populate('creadoPor');
      return avances;
    },
    filtrarAvance: async (parents, args) => {
      const avanceFiltrado = await ModeloAvance.find({ proyecto: args._id })
        .populate('proyecto')
        .populate('creadoPor');
      return avanceFiltrado;
    },
  },
  Mutation: {
    crearAvance: async (parents, args) => {
      const avanceCreado = await ModeloAvance.create({
        descripcion: args.descripcion,
        proyecto: args.proyecto,
        creadoPor: args.creadoPor,
        fecha:Date.now()
      });

      return avanceCreado;
    },
    agregarObservaciones: async(parent, args)=>{
      return await ModeloAvance.findByIdAndUpdate(args._id,{
        observaciones:args.observaciones
      },{new: true})
    },
    editarDescripcion: async(parent, args) => {
      return await ModeloAvance.findByIdAndUpdate(args._id,{
        descripcion:args.descripcion
      },{new: true})
    }
  },
};

export { resolversAvance };
