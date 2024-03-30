import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

import { FiInfo, FiMessageSquare, FiCheckCircle } from 'react-icons/fi';
import { Issue } from '../interfaces';
import { getIssueComments, getIssueInfo } from '../hooks';
import { timeSince } from '../../helpers';

interface Props {
    issue: Issue;
}

export const IssueItem = ({ issue }: Props) => {

    const { title, number, comments, state, user: { login: user, avatar_url, } } = issue;
    const navigate = useNavigate();

    const queryCliente = useQueryClient();

    // Esta funcion no se encuentra haciendo nada pero sirve como guia para anticiparnos a las posibles consultas de los usuarios, y traer la información antes de que de clic y
    // precargarla, asi cuando ingrese tendra un sensación de rapides en nuestra aplicación
    const prefetchData = async () => {
        queryCliente.prefetchQuery({
            queryKey: ['issue', issue.number],
            queryFn: () => getIssueInfo(issue.number)
        });

        queryCliente.prefetchQuery({
            queryKey: ['issue', issue.number, 'comments'],
            queryFn: () => getIssueComments(issue.number)
        });
    }
    //  Hasta aqui la funcion que realiza dicha consulta -------------------------------------------------------

    // presetData es para cargar ya la información que teniamos en el cache y no ir a la endpoint y consultarla, ojo esto funciona si la información que teniamos previamente
    // es la misma, ya que si es diferente no funcionaria y se truncaria la información
    const presetData = () => {
        queryCliente.setQueryData(
            ['issue', issue.number],
            issue,
            {
                updatedAt: new Date().getTime() + 100000
            }
        );
    }

    return (
        <div className="card mb-2 issue" onClick={() => navigate(`/issues/issue/${number}`)} onMouseEnter={presetData}>
            <div className="card-body d-flex align-items-center">
                <div>
                    {
                        (state === 'open')
                            ? <FiInfo size={30} color="red" />
                            : <FiCheckCircle size={30} color="green" />
                    }
                </div>



                <div className="d-flex flex-column flex-fill px-2">
                    <span>{title}</span>
                    <span className="issue-subinfo">#{number} opened { timeSince(issue.created_at)} ago by <span className='fw-bold'>{user}</span></span>
                    <div>
                        {
                            issue.labels.map( label => (
                                <span key={label.id} className='badge rounded-pill m-1' style={{ backgroundColor: `#${ label.color }`, color: 'black'}}>
                                    {label.name }
                                </span>
                            ))
                        }
                    </div>
                </div>

                <div className='d-flex align-items-center'>
                    <img src={`${avatar_url}`} alt="User Avatar" className="avatar" />
                    <span className='px-2'>{comments}</span>
                    <FiMessageSquare />
                </div>

            </div>
        </div>
    )
}
