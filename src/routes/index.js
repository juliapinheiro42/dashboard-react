import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../Pages/SignIn/Index';
import SignUp from '../Pages/SignUp/Index';
import Dashboard from '../Pages/Dashboard/Index';

import Costumers from '../Pages/Costumers';
import Profile from '../Pages/Profile';
import New from '../Pages/New';


export default function Routes(){
    return(
        <Switch>
         <Route exact path='/' component={SignIn} />
         <Route exact path='/register' component={SignUp}/>

         <Route exact path='/dashboard' component={Dashboard} isPrivate/>
         <Route exact path='/profile' component={Profile} isPrivate />
         <Route exact path='/costumers' component={Costumers} isPrivate />
         <Route exact path='/new' component={New} isPrivate />
         <Route exact path='/new/:id' component={New} isPrivate/>
        </Switch>
    )
}