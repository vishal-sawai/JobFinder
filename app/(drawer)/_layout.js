import { Drawer } from 'expo-router/drawer';
import { AntDesign } from '@expo/vector-icons';

export default function Layout() {
    return <Drawer screenOptions={{ headerShown: false }}>
        <Drawer.Screen
            name="home"
            options={{
                drawerLabel: 'Home',
                title: "Home",
                drawerIcon: ({ size, color }) => <AntDesign name="home" size={size} color="black" />
            }}
        ></Drawer.Screen>

        <Drawer.Screen
            name="profile"
            options={{
                drawerLabel: 'Profile',
                title: "Profile",
                drawerIcon: ({ size, color }) => <AntDesign name="profile" size={size} color="black" />
            }}
        ></Drawer.Screen>

        <Drawer.Screen
            name="save"
            options={{
                drawerLabel: 'Saved Jobs',
                title: "Save",
                drawerIcon: ({ size, color }) => <AntDesign name="heart" size={size} color="red" />
            }}
        ></Drawer.Screen>

        <Drawer.Screen
            name="logout"
            options={{
                drawerLabel: 'Logout',
                title: "Logout",
                drawerIcon: ({ size, color }) => <AntDesign name="logout" size={size} color="blue" />
            }}
        ></Drawer.Screen>

    </Drawer >;
}
