import './Modal.css';
import { FiX} from 'react-icons/fi';

export default function Modal({ conteudo, close}){
    return(
        <div className='modal'>
          <div className='container'>
              <button onClick={ close } className='close'>
                  <FiX size={23} />
                  Voltar
              </button>

              <div>
                  <h2> Detalhes do chamado</h2>
                  <div className='row'>
                      <span>
                          Cliente: <i><a>{conteudo.cliente}</a></i>
                      </span>
                  </div>
                  
                  <div className='row'>
                      <span>
                          Assunto: <i><a>{conteudo.assunto}</a></i>
                      </span>
                      <span>
                          Cadastrado em: <i><a>{conteudo.createdFormated}</a></i>
                      </span>
                  </div>
                  <div className='row'>
                      <span>
                          Status: <i><a  style={{ color: '#f8f8f8', backgroundColor: conteudo.status === 'aberto' ? '#5cb85c' : '#999'}}>{conteudo.status}</a></i>
                      </span>
                      </div>

                      {conteudo.complemento !== '' && (
                          <>
                          <h3>Complemento</h3>
                          <p>
                              {conteudo.complemento}
                          </p>
                          </>
                      )}
              </div>
          </div>
        </div>
    )
}
