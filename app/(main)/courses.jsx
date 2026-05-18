import CourseList from "../../components/course-list";
import { Box } from "../../components/ui/box";
import { Spinner } from "../../components/ui/spinner";
import { Text } from "../../components/ui/text";
import { courseService } from "../../services/courseService";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Courses() {
    const safearea = useSafeAreaInsets();
    const [loading, setLoading] = useState(true);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            setLoading(true);
            const data = await courseService.getAllCourses();
            setCourses(data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View className="flex-1 px-7 bg-white" style={{ paddingTop: safearea.top }}>
            {/* Header */}
            <Box className="flex-row items-center gap-3 mb-6">
                <Pressable onPress={() => router.back()}>
                    <Ionicons name="chevron-back" size={32} color="#000" />
                </Pressable>
                <Text size="2xl" className="font-bold text-black">
                    All Available Courses
                </Text>
            </Box>

            {/* Course List */}
            <Box className="flex-1">
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
}
