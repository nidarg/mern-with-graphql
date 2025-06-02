import { useState } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { useMutation } from '@apollo/client';
import { DELETE_PROJECT } from '../mutations/projectMutations';
import { GET_PROJECTS } from '../queries/projectQueries';
import ProjectCard from './ProjectCard';

const ProjectRow = ({ project }) => {
  const [showModal, setShowModal] = useState(false);

  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id: project.id },
    update(cache, { data: { deleteProject } }) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: projects.filter(p => p.id !== deleteProject.id) },
      });
    },
  });

  return (
    <>
      <tr>
        <td className="text-green">{project.name}</td>
        <td className="text-green">{project.description}</td>
        <td className="text-green">{project.status}</td>
        <td className="text-green">{project.client?.name || 'N/A'}</td>
        <td className="text-green">{project.client?.email || 'N/A'}</td>
        <td className="text-green">{project.client?.phone || 'N/A'}</td>
        <td>
          <button className="btn btn-sm btn-info me-2" onClick={() => setShowModal(true)}>
            <FaEdit />
          </button>
          <button className="btn btn-sm btn-danger" onClick={deleteProject}>
            <FaTrash />
          </button>
        </td>
      </tr>

      {showModal && <ProjectCard project={project} onClose={() => setShowModal(false)} />}
    </>
  );
};

export default ProjectRow;
