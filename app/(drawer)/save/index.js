import { Drawer } from 'expo-router/drawer';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { Text, View, StyleSheet } from 'react-native';



export default function SavePage() {

    return (
        <View style={{ backgroundColor: 'white' }}>
            <Drawer.Screen options={{ title: "Saved Jobs", headerShown: true, headerLeft: () => <DrawerToggleButton />, }} />
            <View>
                <Text>Save Page</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

})