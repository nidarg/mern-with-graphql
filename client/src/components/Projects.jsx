import{useQuery} from '@apollo/client'
import ProjectRow from './ProjectRow'
import { GET_PROJECTS } from '../queries/projectQueries'
import Spinner from './Spinner'



const Projects = () => {
    const{loading, error, data} = useQuery(GET_PROJECTS)

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
                       <th className="text-green">Project Name</th>
              <th className="text-green">Description</th>
              <th className="text-green">Status</th>
              <th className="text-green">Client Name</th>
              <th className="text-green">Client Email</th>
              <th className="text-green">Client Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {data.projects.map((project)=>{
                        return(
                            <ProjectRow key={project.id} project={project} />
                        )
                    })}
                </tbody>
            </table>
        )}
    </>
  )
}

export default Projects
