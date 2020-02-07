import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Login from './components/pages/Login/Login';
import Main from './components/pages/Main/Main';

export default createAppContainer(
    createSwitchNavigator({
        Login,
        Main
    })
);