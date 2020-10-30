import { gql } from "@apollo/client";

export const GET_USERS_GROUP= gql`
    query users($where: JSON) {
        users(where: $where){
          id
          givenName
          familyName
          photoUrl
          nickName
          photoUrl
          email

          groups {
            type
            name
            id
          }
        }
      }
`;
