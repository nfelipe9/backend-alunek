import { tipos } from './graphql/types.js';
import { resolvers } from './graphql/resolvers.js';
import { gql } from 'apollo-server-express';
import { ApolloServer } from 'apollo-server-express';
import conectarBD from './db/db.js';
import dotenv from 'dotenv';
import assert from 'assert';

dotenv.config();
await conectarBD();

const server = new ApolloServer({
  typeDefs: tipos,
  resolvers: resolvers,
});



//Prueba para buscar un usuario
it('Encontrar un usuario', async () => {
  const result = await server.executeOperation({
    query: gql`
      query Usuario($id: String!) {
        Usuario(_id: $id) {
          nombre
          apellido
        }
      }
    `,
    variables: {
      id: '61bbf398a840b829001f8a73',
    },
  });
  
  assert.equal(result.data.Usuario.apellido, 'Rueda');
  
  
});

//Editar un usuario existente
it('Editar un usuario existente', async () => {
  const result = await server.executeOperation({
    query: gql`
    mutation EditarUsuario($id: String!, $nombre: String!, $apellido: String!, $identificacion: String!, $correo: String!, $estado: Enum_EstadoUsuario!) {
      editarUsuario(_id: $id, nombre: $nombre, apellido: $apellido, identificacion: $identificacion, correo: $correo, estado: $estado) {
        nombre
        apellido
      }
    }
    `,
    variables: {
      id: '61bbf398a840b829001f8a73',
      nombre: "Alejandro",
      apellido: "Rueda",
      identificacion: "1010227",
      correo: "Rueda@alunek.com",
      estado: "AUTORIZADO"
    },
  });
  
  assert.equal(result.data.editarUsuario.nombre, 'Alejandro');
  assert.equal(result.data.editarUsuario.apellido, 'Rueda');
  
});

//Verificar la existencia de un proyecto
it('verificar existencia de un proyecto', async () => {
  const result = await server.executeOperation({
    query: gql`    
    query Query($id: String!) {
      Proyecto(_id: $id) {
        nombre
      }
    }
    `,
    variables: {
      id: '61a7fd32d54a81681b9375c9',
    },
  });

  assert.equal(result.data.Proyecto.nombre, 'Proyecto4 Alunek');
});

//Crear un proyecto
it('verificar la creacion de un proyecto', async () => {
  const result = await server.executeOperation({
    query: gql`    
    mutation CrearProyecto($nombre: String!, $presupuesto: Float!, $lider: String!) {
      crearProyecto(nombre: $nombre, presupuesto: $presupuesto, lider: $lider) {
        nombre
      }
    }
    `,
    variables: {
      nombre: "Proyectotest",
      presupuesto: 5000,
      lider: "61bca365d9f5bfc4462d7748"
    },
  });

  assert.equal(result.data.crearProyecto.nombre, 'Proyectotest');
});

//Crear una inscripcion a un proyecto
it('Crear inscripcion a un proyecto', async () => {
  const result = await server.executeOperation({
    query: gql`    
    mutation CrearInscripcion($proyecto: String!, $estudiante: String!) {
      crearInscripcion(proyecto: $proyecto, estudiante: $estudiante) {
        estudiante {
          nombre
        }
      }
    }
    `,
    variables: {
      proyecto:"61bcacffd9f5bfc4462d7a88",
      estudiante:"61bc93d935d4c498cb90ae0a"
    },
  });

  assert.equal(result.data.crearInscripcion.estudiante.nombre, 'David');
});

//Crear un avance para un proyecto
it('verificar la creacion de un avance en un proyecto', async () => {
  const result = await server.executeOperation({
    query: gql`    
    mutation Mutation($descripcion: String!, $proyecto: String!, $creadoPor: String!) {
      crearAvance(descripcion: $descripcion, proyecto: $proyecto, creadoPor: $creadoPor) {
        proyecto {
          _id
        }
      }
    }
    `,
    variables: {
      
        descripcion: "PrimerAvance",
        proyecto: "61bca565d9f5bfc4462d781d",
        creadoPor: "61bc93d935d4c498cb90ae0a"
      
    },
  });

  assert.equal(result.data.crearAvance.proyecto._id, '61bca565d9f5bfc4462d781d');
});