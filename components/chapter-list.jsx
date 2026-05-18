import React from "react";
import { FlatList, Pressable } from "react-native";
import { Box } from "./ui/box";
import { Text } from "./ui/text";
import Ionicons from "@expo/vector-icons/Ionicons";

const ChapterList = ({ chapters, onChapterPress, previewCount = null, lockInteractions = false }) => {
    return (
        <Box className="gap-4">
            <Box className="flex-row items-center gap-2 mb-1">
                <Ionicons name="list" size={22} color="#2E5E99" />
                <Text size="xl" className="font-bold text-[#2E5E99]">Chapters</Text>
                <Box className="bg-[#488cdf] px-2.5 py-0.5 rounded-full ml-1">
                    <Text size="sm" className="font-bold text-white">{chapters?.length || 0}</Text>
                </Box>
            </Box>
            <FlatList
                data={previewCount ? (chapters || []).slice(0, previewCount) : chapters}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <Pressable 
                        onPress={() => !lockInteractions && onChapterPress?.(item)}
                        className={`flex-row items-center gap-4 bg-white p-4 rounded-2xl mb-3 border border-secondary-300 shadow-sm ${lockInteractions ? 'opacity-70' : ''}`}
                    >
                        <Box className="bg-[#488cdf] h-12 w-12 rounded-xl items-center justify-center">
                            <Ionicons name={lockInteractions ? 'lock-closed' : 'play-circle'} size={24} color="white" />
                        </Box>
                        <Box className="flex-1">
                            <Text size="md" className="font-semibold text-black">{item.title}</Text>
                            <Box className="flex-row items-center gap-1.5 mt-1.5">
                                <Ionicons name="time" size={15} color="#000" />
                                <Text size="sm" className="text-black font-medium">
                                    {(() => {
                                        const hours = (item.duration || 0);
                                        const mins = (item.durationMinutes || 0);
                                        return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
                                    })()}
                                </Text>
                            </Box>
                        </Box>
                        <Ionicons name="chevron-forward" size={20} color="#2E5E99" />
                    </Pressable>
                )}
                scrollEnabled={false}
            />
        </Box>
    );
};

export default ChapterList;
