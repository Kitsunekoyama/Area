import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import Login from '../Components/Login'
import AREA_New from '../Components/AREA_New'
import Add_Action from "../Components/Add_Action"
import Dashboard from '../Components/Dashboard'
import Choose_Action from '../Components/Choose_Action'
import Add_Reaction from '../Components/Add_Reaction'
import Choose_Reaction from '../Components/Choose_Reaction'
import Action_Config from '../Components/Action_Config'
import Reaction_Config from '../Components/Reaction_Config'

const LoginStackNavigator = createStackNavigator({
    Login: {
        screen: Login,
        navigationOptions: {
            title: 'Connexion'
        }
    },
    Dashboard: {
        screen: Dashboard,
        navigationOptions: {
            title: 'Dashboard'
        }
    },
    /*AREA_New: {
        screen: AREA_New,
        navigationOptions: {
            title: 'New Area'
        }
    },*/
    Add_Action: {
        screen: Add_Action,
        navigationOptions: {
            title: 'Add Action'
        }
    },
    Choose_Action: {
        screen: Choose_Action,
        navigationOptions: {
            title: 'Choose_Action'
        }
    },
    Action_Config: {
        screen: Action_Config,
        navigationOptions: {
            title: 'Action Config'
        }
    },
    Add_Reaction: {
        screen: Add_Reaction,
        navigationOptions: {
            title: 'Add Reaction'
        }
    },
    Choose_Reaction: {
        screen : Choose_Reaction,
        navigationOptions: {
            title: 'Choose Reaction'
        }
    },
    Reaction_Config: {
        screen: Reaction_Config,
        navigationOptions: {
            title: 'Reaction Config'
        }
    }
})

export default createAppContainer(LoginStackNavigator)