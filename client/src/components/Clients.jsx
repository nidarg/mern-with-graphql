import{useQuery} from '@apollo/client'
import ClientRow from './ClientRow'
import { GET_CLIENTS } from '../queries/clientQueries'
import Spinner from './Spinner'



const Clients = () => {
    const{loading, error, data} = useQuery(GET_CLIENTS)

    if(loading){
        return (
           <Spinner/>
        )
    }
    if(error){
        return(
            <p>Something Went Wrong</p>
        )
    }
  return (
    <>
        {!loading && !error && (
            <table className="table table-dark table-striped table-hover mt-3">
                <thead>
                    <tr>
                        <th className="text-green">
                            Name
                        </th>
                         <th className="text-green">
                            Email
                        </th>
                         <th className="text-green">
                            Phone
                        </th>
                         <th>
                            
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.clients.map((client)=>{
                        return(
                            <ClientRow key={client.id} client={client} />
                        )
                    })}
                </tbody>
            </table>
        )}
    </>
  )
}

export default Clients
