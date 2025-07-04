// import {clients,projects} from '../sampleData.js'

import Client from '../models/Client.js'
import Project from '../models/Project.js'

import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLNonNull, GraphQLEnumType, GraphQLScalarType } from 'graphql';

//  Client Type
const ClientType = new GraphQLObjectType({
    name:"Client",
    fields:()=>({
       id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString }
    })
})

//  Project Type
const ProjectType = new GraphQLObjectType({
    name:"Project",
    fields:()=>({
        id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client:{
        type: ClientType,
        resolve:(parent, args)=>{
            return Client.findById(parent.clientId)
        }
    }
    })
})

const RootQuery = new GraphQLObjectType({
    name:"RootQuery",
    fields:{
         clients:{
            type:new GraphQLList(ClientType),
            resolve(parent,args){
                return Client.find()
            }
        },
        client:{
            type:ClientType,
            args:{id:{type:GraphQLID}},
            resolve(parent, args){
                return Client.findById(args.id)
            }
        },
         projects:{
            type:new GraphQLList(ProjectType),
            resolve(parent,args){
                return Project.find()
            }
        },
        project:{
            type:ProjectType,
            args:{id:{type:GraphQLID}},
            resolve(parent, args){
                return Project.findById(args.id)
            }
        },
       
    }
})

// Mutations
const mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:{
        // Add Client
        addClient:{
            type: ClientType,
            args:{
                name:{type:GraphQLNonNull(GraphQLString)},
                email:{type:GraphQLNonNull(GraphQLString)},
                phone:{type:GraphQLNonNull(GraphQLString)},
            },
            resolve(parent, args){
                const client = new Client({
                    name: args.name,
                    email: args.email,
                    phone: args.phone
                })
                return client.save();
            }
        },
        // Delete Client
        deleteClient:{
            type: ClientType,
            args:{id:{type: GraphQLNonNull(GraphQLID)}},
            resolve(parent,args){
                return Client.findByIdAndDelete(args.id)
            }
        },
        // Add a Project
        addProject:{
            type:ProjectType,
            args:{
                name:{type: GraphQLNonNull(GraphQLString)},
                description:{type: GraphQLNonNull(GraphQLString)},
                status:{
                    type: new GraphQLEnumType({
                    name: 'ProjectStatus',
                    values: {
                        new: { value: 'Not Started' },
                        progress: { value: 'In Progress' },
                        completed: { value: 'Completed' },
                        },
                    }),
                    defaultValue: 'Not Started',
                },
                clientId:{type: GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args){
                const project = new Project({
                    name: args.name,
                    description: args.description,
                    status: args.status,
                    clientId: args.clientId
                })
                return project.save()
            }
        },
        // delete a project
        deleteProject:{
            type: ProjectType,
            args:{id:{type: GraphQLNonNull(GraphQLID)}},
            resolve(parent,args){
                return Project.findByIdAndDelete(args.id)
            }
        },
        updateProject:{
            type: ProjectType,
            args:{
                id:{type: GraphQLNonNull(GraphQLID)},
                name:{type: GraphQLString},
                description:{type: GraphQLString},
                status:{
                    type: new GraphQLEnumType({
                        name:'ProjectStatusUpdate',
                        values:{
                            new:{value: 'Not Startes'},
                            progress:{value:'In Progress'},
                            completed:{value: 'Completed'}
                        }
                    })
                }
            },
            resolve(parent,args){
                return Project.findByIdAndUpdate(args.id,
                    {
                    $set:{
                        name: args.name,
                        description: args.description,
                        status: args.status
                    },
                },
                {new: true}
            )
            }
        }
    }
})

export default new GraphQLSchema({
    query: RootQuery,
    mutation
})
