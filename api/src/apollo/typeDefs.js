const { gql } = require("apollo-server-express");

const typeDefs = gql`
   type CheckPoint {
      id: Int
      name: String
   }

   type Cohorte {
      id: Int
      name: String
      number: Int
      startDate: String
      instructor: User
   }

   type Content {
      id: Int
      topicName: String
      durationTime: Int
   }

   enum GroupTypes {
      PP
      StandUp
      General
   }

   type Group {
      id: Int
      name: String
      type: GroupTypes
   }

   type Module {
      id: Int
      name: String
      description: String
   }

   enum RoleTypes {
      instructor
      pm
      student
      staff
   }

   type Role {
      id: Int
      name: RoleTypes
   }

   type Score {
      id: Int
      score: Float
   }

   type User {
      id: Int
      givenName: String
      familyName: String
      nickName: String
      email: String
      googleId: String
      githubId: String
      photoUrl: String
      roles: [Role]
   }

   type Query {
      checkPoints(id: Int, name: String): [CheckPoint]
      cohortes(name: String): [Cohorte]
      contents(topicName: String): [Content]
      groups(id: Int): [Group]
      modules(id: Int): [Module]
      roles(name: String): [Role]
      scores(id: Int): [Score]
      users(id: Int): [User]
   }

   # Estos son los datos que acepta un usuario
   input UserInput {
      givenName: String
      familyName: String
      nickName: String
      email: String
      googleId: String
      githubId: String
      photoUrl: String
      password: String
      role: RoleTypes
      roles: [RoleTypes]
   }

   # Esto es tl tipo objeto que arroja cuando se elimina un registro
   type DeleteResolve {
      message: String!
   }

   type Error {
      message: String
      type: String
      code: Int
   }

   type ErrorMessage {
      name: String
      type: String
      error: Error
   }

   type Mutation {
      # Mutaciones para usuarios
      createUser(input: UserInput): User!
      updateUser(id: Int, input: UserInput): User!
      deleteUser(id: Int): DeleteResolve!

      # Mutations Cohorte
      createCohorte(name:String, number:Int, instructor: Int, startDate: String): Cohorte!
      editCohorte(id: Int, name: String, number: Int, startDate: String, instructor: Int): Cohorte!
      deleteCohorte(id: Int): DeleteResolve!

      # Mutaciones para los modulos
      createModule(name: String!): Module! 
      updateModule(id: Int, name: String!, description: String!): Module!
      deleteModule(id: Int): DeleteResolve!

      # Mutaciones para los checkpoints
      createCheckPoint(name: String!): CheckPoint! 
      updateCheckPoint(id: Int, name: String!): CheckPoint!
      deleteCheckPoint(id: Int): DeleteResolve!

      # Mutaciones para Contenidos
      createContenido(topicName: String!, durationTime: Int): Content! 
      updateTopics(id: Int, topic: String!): Content!
      deleteTopics(id: Int): DeleteResolve!

      # Mutaciones para Roles
      createRole(name: String): Role!
      updateRole(id: Int, name: String): Role!
      deleteRole(id: Int, name: String): DeleteResolve!

      # Mutaciones para Scores
      createScore(score: Float): Score!
      updateScore(id: Int, score: Float): Score!
      deleteScore(id: Int): DeleteResolve!
   }
  
`;

module.exports = typeDefs;