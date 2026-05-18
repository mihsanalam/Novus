import React from "react";
import { FlatList, Image, Pressable } from "react-native";
import { Box } from "./ui/box";
import { Text } from "./ui/text";
import { router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { urlFor } from "../lib/sanity";

const CourseList = ({ data }) => {
    return (
        <FlatList
            data={data}
            keyExtractor={(item)=> item?._id}
            renderItem = {({item}) => <CourseCard item={item}/>}
            contentContainerClassName="pt-5"
            showsVerticalScrollIndicator= {false}
        />
    );
};

const CourseCard = ({ item }) => {
    return (
        <Pressable
            onPress= {() => 
                router.push({
                    pathname: "(main)/course-details",
                    params: {
                        id: item?._id,
                        title: item?.title,
                        description: item?.description,
                    },
                })
            }
            className="flex-1 gap-2 w-full bg-gray-100 p-2 pb-4 rounded-[28px] border border-gray-200 mb-4 shadow-sm"
            >
                {/* course thumbnail */}
                <Box className="relative w-full h-60 bg-white rounded-3xl overflow-hidden">
                    <Image
                        source={item?.image ? { uri: urlFor(item.image).url() } : require("../assets/images/dummy-course.png")}
                        className= "w-full h-full object-cover"
                    />

                </Box>

                {/* course title */}
                <Box className="pl-2">
                    <Text size="lg" className="font-semibold text-black mb-1" numberOfLines={2}>
                        {item?.title}
                    </Text>

                    <Box className="flex-row items-center gap-3">
                        <Text size="sm" className="text-[#2E5E99] font-medium">
                            {item?.price > 0 ? `$${item?.price}` : 'Free'}
                        </Text>
                        <Box className="flex-row items-center gap-1">
                            <Ionicons name ="time-outline" size={14} color="#000" />
                            <Text size="sm" className="text-gray-600 font-medium">
                                {(() => {
                                    const hours = item?.duration || 0;
                                    const mins = item?.durationMinutes || 0;
                                    return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
                                })()}
                            </Text>
                        </Box>
                    </Box>
                </Box>
            </Pressable>
    );
};

export default CourseList;