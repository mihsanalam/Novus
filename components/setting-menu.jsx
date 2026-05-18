import React, { useState } from "react";
import { Pressable, View, Modal } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAuth } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { Text } from "./ui/text";

const SettingsMenu = () => {
    const [visible, setVisible] = useState(false);
    const { signOut } = useAuth();

    const handleLogout = async () => {
        setVisible(false);
        await signOut();
        router.replace("/(auth)/welcome");
    };

    return (
        <>
            <Pressable onPress={() => setVisible(true)}>
                <Ionicons name="settings-outline" size={28} color="#000" />
            </Pressable>

            <Modal
                visible={visible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setVisible(false)}
            >
                <Pressable className="flex-1 bg-transparent justify-start items-end pt-[60px] pr-7" onPress={() => setVisible(false)}>
                    <View className="bg-white border border-gray-300 rounded-xl p-2 min-w-[200px] shadow-lg">
                        <Pressable className="flex-row items-center py-3 px-3 rounded-lg" onPress={() => { setVisible(false); router.push('/profile'); }}>
                            <Ionicons name="person-outline" size={20} color="#000" />
                            <Text className="ml-3 text-base">Profile</Text>
                        </Pressable>
                        
                        <Pressable className="flex-row items-center py-3 px-3 rounded-lg" onPress={() => { setVisible(false); router.push('/billing'); }}>
                            <Ionicons name="card-outline" size={20} color="#000" />
                            <Text className="ml-3 text-base">Manage Billing</Text>
                        </Pressable>
                        
                        <Pressable className="flex-row items-center py-3 px-3 rounded-lg" onPress={handleLogout}>
                            <Ionicons name="log-out-outline" size={20} color="#ef4444" />
                            <Text className="ml-3 text-base text-red-500">Logout</Text>
                        </Pressable>
                    </View>
                </Pressable>
            </Modal>
        </>
    );
};

export default SettingsMenu;
