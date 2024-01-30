import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import HomeScreen from '../pages/HomeScreen/HomeScreen';
import MyProfil from '../pages/DrawerPages/ProfileScreen/MyProfileScreen/MyProfilScreen';
import Evenements from '../pages/DrawerPages/EvenementsScreen';
import Membres from '../pages/DrawerPages/MembersScreen/MembresScreen';
import Postes from '../pages/DrawerPages/PostesScreen';
import Calendrier from '../pages/DrawerPages/CalendrierScreen';
import CreerEvenement from '../pages/DrawerPages/CreateEventScreen';
import Actualites from '../pages/DrawerPages/ActualitesScreen';
import InviterAmis from '../pages/DrawerPages/InvitFreindsScreen';
import TermsAndConditions from '../pages/DrawerPages/TermsAndConditionsScreen';
import LogoutButton from'./LogoutButton/LogoutButton';


const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => {
        return (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem
              label="Déconnexion"
              onPress={() => {}}
              style={{ display: 'none' }}
            />
            <LogoutButton {...props} />
          </DrawerContentScrollView>
        );
      }}
    >
      <Drawer.Screen name="HomeScreen" component={HomeScreen} />
      <Drawer.Screen name="Profile" component={MyProfil} />
      <Drawer.Screen name="Evenements" component={Evenements} />
      <Drawer.Screen name="Membres" component={Membres} />
      <Drawer.Screen name="Postes" component={Postes} />
      <Drawer.Screen name="Calendrier" component={Calendrier} />
      <Drawer.Screen name="CreerEvenement" component={CreerEvenement} />
      <Drawer.Screen name="Actualites" component={Actualites} />
      <Drawer.Screen name="InviterAmis" component={InviterAmis} />
      <Drawer.Screen name="TermsAndConditions" component={TermsAndConditions} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
