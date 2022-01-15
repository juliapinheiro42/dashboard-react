import './new.css';
import { useState, useEffect, useContext } from 'react';
import Header from '../../components/Header';
import Title from '../../components/Title';
import { FiPlusCircle } from "react-icons/fi";
import {AuthContext} from '../../contexts/auth'
import firebase from '../../services/fireConnection';
import { toast } from 'react-toastify';
import {useHistory, useParams} from 'react-router-dom';


export default function New(){
    const { id } = useParams();
    const history = useHistory();

const[loadCustomers, setLoadCustomers] = useState(true);
const [customers, setCustomers] = useState([]);
const[customerSelected, setCustomerSelected] = useState(0);

const [assunto, setAssunto] = useState('suporte');
const [status, setStatus] = useState('aberto');
const [complemento, setComplemento] = useState('');

const { user } = useContext(AuthContext);

const [idCustomer, setIdCustomer] = useState(false);


useEffect(()=>{
    async function loadCustomers(){
     await firebase.firestore().collection('costumers')
     .get()
     .then((snapshot)=>{
         let lista =[];
         
         snapshot.forEach((doc)=>{
             lista.push({
                 id: doc.id,
                 nomeFantasia: doc.data().nomeFantasia
             })
         })

         if(lista.length === 0){
             console.log('NENHUMA EMPRESA ENCONTRADA');
             setCustomers([{ id: '1', nomeFantasia: 'FREELA'}])
             setLoadCustomers(false);
             return;
         }
         setCustomers(lista);
         setLoadCustomers(false);

         if(id){
             loadId(lista);
         }
     })
     .catch((error)=>{
         console.log('DEU ALGUM ERRO!');
         setLoadCustomers(false);
         setCustomers([{id: '1', nomeFantasia: ''} ])
     })
    }

    loadCustomers();
}, []);

  async function loadId(lista){
      await firebase.firestore().collection('chamados').doc(id)
  .get()
   .then((snapshot) => {
    setAssunto(snapshot.data().assunto);
    setStatus(snapshot.data().status);
    setComplemento(snapshot.data().complemento)


    let index = lista.findIndex(item => item.id === snapshot.data().clienteId );
    setCustomerSelected(index);
    setIdCustomer(true);
   })
   .catch((err)=>{
       console.log('Erro no ID passado: ', err);
       setIdCustomer(false);
   })
    }

  async function handleRegister(e){
       e.preventDefault();

     if(idCustomer){
         await firebase.firestore().collection('chamados')
         .doc(id)
         .update({
            cliente: customers[customerSelected].nomeFantasia,
            clienteId: customers[customerSelected].id,
            assunto: assunto,
            status: status,
            complemento: complemento,
            userId: user.uid 
         })
         .then(()=>{
         toast.success('Chamado editado com sucesso!');
         setCustomerSelected(0);
         setComplemento('');
         history.push('/dashboard');
         })
         .catch((err)=>{
             toast.error('Ops houve um erro ao registrar, tente novamente')
             console.log(err);
         })
         return;
     }

       await firebase.firestore().collection('chamados')
       .add({
           created: new Date(),
           cliente: customers[customerSelected].nomeFantasia,
           clienteId: customers[customerSelected].id,
           assunto: assunto,
           status: status,
           complemento: complemento,
           userId: user.uid 
       })
      .then(()=> {
          toast.success('Chamado criado com sucesso!');
          setComplemento('');
          setCustomerSelected(0);
      })
      .catch((error)=>{
      console.log(error);
        toast.error('Ops! Erro ao registrar.Tente novamente.')
    }
      )
    }

   function handleChangeSelect(e){
       setAssunto(e.target.value);
       
   }
   function handleOptionChange(e){
       setStatus(e.target.value);
   }
   function handleChangeCustomers(e){
 setCustomerSelected(e.target.value)
   }



    return(
        <div>
            <Header/>
            <div className='content'>
             <Title name='Novo chamado'>
               <FiPlusCircle size={25} color='#504650'/>
             </Title>
             <div className='container'>
              <form className='form-profile' onSubmit={handleRegister}>
               <label>Cliente</label>

                 {loadCustomers ? (
                     <input type="text" disable={true} value="Carregando clientes..." />
                 ) :(
                    <select value={customerSelected} onChange={handleChangeCustomers}>
                    {customers.map((item, index)=>{
                        return(
                            <option key={item.id} value={index}>
                                {item.nomeFantasia}
                            </option>
                        )
                    })}
                 </select>
                 )}

              
               <label>Assunto</label>
               <select value={assunto} onChange={handleChangeSelect}>
                   <option value='suporte'>
                      Suporte
                   </option>
                   <option value='visita técnica'>
                      Visita técnica
                   </option>
                   <option value='finaceiro'>
                      Financeiro
                   </option>
               </select>
               <label> Status</label>
               <div className='status'>
                   <input type='radio' name='radio' value="aberto" onChange={handleOptionChange} checked={ status === "aberto"}/>
                   <span> em aberto</span>
                   <input type='radio' name='radio' value="progresso"  onChange={handleOptionChange}  checked={ status === "progresso"}/>
                   <span> em progresso</span> 
                   <input type='radio' name='radio' value="atendido" onChange={handleOptionChange}  checked={ status === "atendido"} />
                   <span> atendido</span>
               </div>
               <label>Complemento
               </label>
               <textarea type='text' placeholder='Escreva o problema(opcional)' value={complemento} onChange={ (e) => setComplemento(e.target.value) }/>

               <button type="submit">Salvar</button>
              </form>
             </div>
            </div>
        </div>
    )
}