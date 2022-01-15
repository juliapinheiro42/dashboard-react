import {useState} from 'react';
import './costumers.css';
import Header from '../../components/Header';
import Title from '../../components/Title';
import { FiUser } from "react-icons/fi";
import firebase from '../../services/fireConnection';
import { toast } from 'react-toastify';

export default function Costumers(){
const [nomeFantasia, setNomeFantasia] = useState('');
const [cnpj, setCnpj] = useState('');
const [endereco, setEndereco] = useState('');

 async function handleAdd(e){
    e.preventDefault();
 if(nomeFantasia !== '' && cnpj !== '' && endereco !== ''){
    await firebase.firestore().collection('costumers')
    .add({
        nomeFantasia: nomeFantasia,
        cnpj: cnpj,
        endereco: endereco
    })
      .then(()=>{
          setNomeFantasia('');
          setCnpj('');
          setEndereco('');
         toast.success('Empresa cadastrada com sucesso');
      }) 
      .catch((error)=>{
      console.log(error);
      toast.error('Erro ao cadastrar essa empresa.');
      })
} else{
    toast.error('Preencha todos os campos!');
}

}


    return(
        <div>
           <Header/>

           <div className='content'>
               <Title name="Clientes">
                <FiUser color='#504650' size={25}/>
               </Title>
               <div className='container'>
                   <form className='form-profile costumers' onSubmit={handleAdd}>
                       <label>Nome da empresa</label>
                       <input type='text' placeholder='Nome da empresa' value={nomeFantasia} onChange={ (e) => setNomeFantasia(e.target.value)}/>
                       <label>CNPJ</label>
                       <input type='text' placeholder='CNPJ' value={cnpj} onChange={ (e) => setCnpj(e.target.value)}/>
                       <label>Endereço</label>
                       <input type='text'placeholder='Rua dos bobos, nº 0' value={endereco} onChange={ (e) => setEndereco(e.target.value)}/>

                       <button type='submit'>Cadastrar</button>
                   </form>
               </div>
           </div>
        </div>
    )
}