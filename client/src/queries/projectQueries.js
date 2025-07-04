import { gql } from "@apollo/client";

export const GET_PROJECTS = gql `
    query getProjects{
        projects{
            id
            name,
            description,
            status,
            client{
                name,
                phone,
                email
            }
        }
    }
`

