import {FaTrash} from 'react-icons/fa'
import { useMutation } from '@apollo/client'
import { DELETE_CLIENT } from '../mutations/clientMutations'
import { GET_CLIENTS } from '../queries/clientQueries'

const ClientRow = ({client}) => {
    const[deleteClient] = useMutation(DELETE_CLIENT,{
        variables:{id:client.id},
        // refetch clients after delete one
        // option 1
        // refetchQueries:[{query:GET_CLIENTS}]
        // option 2
        update(cache,{data:{deleteClient}}){
            const {clients} = cache.readQuery({query: GET_CLIENTS})
            cache.writeQuery({
                query:GET_CLIENTS,
                data:{clients:clients.filter(client=>client.id !== deleteClient.id)}
            })
        }
    })
  return (
    <tr>
        <td className="text-green">{client.name}</td>
        <td className="text-green">{client.email}</td>
        <td className="text-green">{client.phone}</td>
        <td className="text-green">
            <button onClick={deleteClient} className="btn btn-danger btn-sm"><FaTrash/></button>
        </td>
    </tr>
  )
}

export default ClientRow
