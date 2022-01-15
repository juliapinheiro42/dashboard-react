import{ useContext, useState} from 'react';
import './Profile.css';
import Header from '../../components/Header';
import '../../components/Title'; 
import Title from '../../components/Title';
import avatar from '../../assets/avatar.png';
import { AuthContext } from '../../contexts/auth';
import firebase from '../../services/fireConnection'

import { FiSettings, FiUpload } from "react-icons/fi";
import React from 'react';




export default function Profile(){
    const {user, signOut, setUser, storageUser} = useContext(AuthContext);

 const [nome, setNome] = useState(user && user.nome);
 const [email, setEmail] = useState(user && user.email);
 const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);
const [imageAvatar, setImageAvatar] = useState(null);


function handleFile(e){
   if(e.target.files[0]){
       const image = e.target.files[0];
       if(image.type === 'image/jpg' || image.type === 'image/png'){
           setImageAvatar(image);
           setAvatarUrl(URL.createObjectURL(e.target.files[0]))
       } else{
           alert('IMAGEM NÃO ACEITA. ENVIE FORMATO PNG OU JPEG');
           return null;
       }
   }
   
   
   
    // console.log(e.target.files[0])
}


async function handleUpload(){
 const currentUid = user.uid;


 const uploadTask = await firebase.storage()
 .ref(`images/${currentUid}/${imageAvatar.name}`)
 .put(imageAvatar)
 .then(async ()=>{
     console.log('Enviada com sucesso')


     await firebase.storage().ref(`images/${currentUid}`)
     .child(imageAvatar.name).getDownloadURL()
     .then(async (url)=>{
         let urlFoto = url;

         await firebase.firestore().collection('users')
         .doc(user.uid)
         .update({
             avatarUrl: urlFoto,
             nome: nome
         })
         .then(()=>{
             let data = {
                 avatarUrl: urlFoto,
                 nome: nome
             };
             setUser(data);
             storageUser(data); 

         })
     })
 })
}

 async function handleSave(e){
     e.preventDefault();

     if(imageAvatar === null && nome !== ''){
        await firebase.firestore().collection('users')
        .doc(user.uid)
        .update({
            nome: nome
        })
        .then(()=>{
          let data = {
              ...user,
              nome: nome
          };
          setUser(data);
          storageUser(data);
        })
     }
     else if(nome !== '' && imageAvatar !== null){
      handleUpload();
     }
 }

    return(
        <div>
            <Header/>
            <div className='content'>
                <Title name="Meu perfil">
                    <FiSettings size={25} color='#504650'/>
                </Title>
                <div className='container'>
                    <form className='form-profile' onSubmit={handleSave}>
                        <label className='label-avatar'>
                          <span>
                              <FiUpload color='#f8f8f8' size={25}/> 
                          </span>
                             <input type="file" accept='image/*' onChange={handleFile} /> <br/>
                             { avatarUrl === null ?
                             <img src={avatar} width="250" height="250" alt="Foto de perfil do usuário"/>
                             :
                             <img src={avatarUrl} width="250" height="250" alt="Foto de perfil do usuário"/>
                            }
                        </label>

                        <label>Nome</label>
                        <input type="text" value={nome} onChange={ (e) => setNome(e.target.value)}/>

                        <label>Email</label>
                        <input type="email" value={email} disabled={true} onChange={ (e) => setEmail(e.target.value)}/>

                        <button type='submit'> Salvar </button>
                    </form>
                </div>
                <div className='container'>
                  <button className='logOut-btn' onClick={ () => signOut() }>Sair</button>
                </div>
            </div>
        </div>
    )
}