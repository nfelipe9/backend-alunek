import { gql } from 'apollo-server-express';

const tiposAvance = gql`
  type Avance {
    _id: ID!
    fecha: Date!
    descripcion: String!
    observaciones: [String]
    proyecto: Proyecto!
    creadoPor: Usuario!
  }

  type Query {
    Avances: [Avance]
    filtrarAvance(_id: String!): [Avance]
  }
  type Mutation {
    crearAvance(descripcion: String!, proyecto: String!, creadoPor: String!): Avance
    agregarObservaciones( _id:String!, observaciones: [String]!):Avance
    editarDescripcion( _id:String!, descripcion: String!): Avance
  }
`;

export { tiposAvance };
