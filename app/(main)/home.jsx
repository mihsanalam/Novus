import { useUser } from "@clerk/clerk-expo";
import CourseList from "../../components/course-list";
import SettingsMenu from "../../components/setting-menu";
import { Box } from "../../components/ui/box";
import { Input, InputField, InputSlot } from "../../components/ui/input";
import { Spinner } from "../../components/ui/spinner";
import { Text } from "../../components/ui/text";
import { courseService } from "../../services/courseService";

import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getFullName } from "../../utils/name";


const Home = () => {
    const safearea = useSafeAreaInsets();
    const [loading, setLoading] = useState(true);
    const [courses, setCourses] = useState([]);

    const [query, setQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");

    const { user } = useUser();
    
    useEffect(() => {
        if (user === null) {
            // User not authenticated, redirect to login
            router.replace("/(auth)/welcome");
            return;
        }
        fetchCourses();
    }, [user]);

    const fetchCourses = async () => {
        try {
            setLoading(true);
            console.log('Fetching courses...');
            const data = await courseService.getAllCourses();
            console.log('Courses fetched:', data?.length);
            setCourses(data.slice(0, 4)); // Show only latest 4 courses
        } catch (error) {
            console.error('Error fetching courses:', error);
            // Don't crash, just show empty list
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedQuery(query), 500);
        return () => clearTimeout(timer);
    }, [query]);

    useEffect(() => {
        if (debouncedQuery) {
            searchCourses(debouncedQuery);
        } else {
            fetchCourses();
        }
    }, [debouncedQuery]);

    const searchCourses = async (searchTerm) => {
        try {
            setLoading(true);
            const data = await courseService.searchCourses(searchTerm);
            setCourses(data);
        } catch (error) {
            console.error('Error searching courses:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View className="flex-1 px-7 bg-white" style={{ paddingTop: safearea.top }}>
            {/* header */}

            <Box className="flex-row items-center justify-between ">
                {/* name & avatar */}
                <Box className="flex-row items-center gap-3">
                    <Image
                        source={user?.imageUrl || user?.profileImageUrl ? { uri: user.imageUrl || user.profileImageUrl } : require("../../assets/images/dummy-course.png")}
                        className="w-12 h-12 rounded-full"
                    />
                    <Box>
                        <Text size="md" className="text-secondary-500">
                            Welcome !
                        </Text>
                        <Text size="lg" className="font-medium">
                           {getFullName(user)}
                        </Text>
                    </Box>
                </Box>

                {/* menu */}
                <SettingsMenu />
            </Box>

            {/* search */}
            <Box className="mt-12">
                <Input
                    variant="rounded"
                    size="md"
                    className="w-full h-16 pl-3 border border-secondary-600 bg-secondary-200"
                >
                    <InputSlot className="pl-3">
                        <Feather name="search" size={24} color="rgba(0,0,0,0.8) " />
                    </InputSlot>
                    <InputField
                        placeholder="Search for courses"
                        value={query}
                        onChangeText={setQuery}
                    />
                </Input>
            </Box>
            {/* course list */}

            <Box className="flex-1 mt-10">
                <Pressable onPress={() => router.push("/courses")} className="flex-row justify-between items-center mb-3">
                    <Text size="2xl" className="font-medium text-black">
                        Explore Courses
                    </Text>
                    <MaterialCommunityIcons
                        name="arrow-right"
                        size={22}
                        color="#000"
                    />
                </Pressable>

                {loading ? (
                    <Box className="mt-36">
                        <Spinner size="large" color="gray" />
                    </Box>
                ) : (
                    <CourseList data={courses} />
                )}
            </Box>
        </View>
    );
};

export default Home;
