import React, { useState } from 'react';
import { Modal, Pressable, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import { Box } from './ui/box';
import { Text } from './ui/text';
import Ionicons from '@expo/vector-icons/Ionicons';
import { WebView } from 'react-native-webview';
// for better YouTube support
import YoutubePlayer from 'react-native-youtube-iframe';

const { width, height } = Dimensions.get('window');
// reserve space for header (approx 120px padding + safe area etc.)
const HEADER_HEIGHT = 120;
// add a little extra bottom margin so video isn't flush against screen edge
const availableHeight = height - HEADER_HEIGHT - 20;

const VideoPlayerModal = ({ visible, onClose, videoUrl, title }) => {
    const [loading, setLoading] = useState(true);

    // helper to parse url and determine type
    const parseVideo = (url) => {
        if (!url) return { type: null, id: null, embedUrl: null };
        let result = { type: null, id: null, embedUrl: null };

        // YouTube
        if (url.includes('youtube.com') || url.includes('youtu.be')) {
            let videoId = '';
            if (url.includes('youtu.be')) {
                videoId = url.split('youtu.be/')[1]?.split('?')[0]?.split('&')[0];
            } else {
                videoId = url.split('v=')[1]?.split('&')[0];
            }
            if (!videoId) return result;
            result.type = 'youtube';
            result.id = videoId;
            result.embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=0&playsinline=1&rel=0&controls=1&showinfo=0&iv_load_policy=3`;
            return result;
        }

        // Vimeo
        if (url.includes('vimeo.com')) {
            const videoId = url.split('vimeo.com/')[1]?.split('?')[0];
            if (!videoId) return result;
            result.type = 'vimeo';
            result.id = videoId;
            result.embedUrl = `https://player.vimeo.com/video/${videoId}?autoplay=0`;
            return result;
        }

        // default/other
        result.type = 'other';
        result.embedUrl = url;
        return result;
    };

    const { type: videoType, id: videoId, embedUrl } = parseVideo(videoUrl);

    const injectedJavaScript = `
        (function() {
            var meta = document.createElement('meta');
            meta.setAttribute('name', 'viewport');
            meta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
            document.getElementsByTagName('head')[0].appendChild(meta);
            
            // Allow fullscreen for iframe
            var style = document.createElement('style');
            style.textContent = 'iframe { width: 100% !important; height: 100% !important; }';
            document.getElementsByTagName('head')[0].appendChild(style);
        })();
        true;
    `;

    return (
        <Modal
            visible={visible}
            animationType="slide"
            onRequestClose={onClose}
            statusBarTranslucent
        >
            <Box className="flex-1 bg-white">
                {/* Header */}
                <Box className="flex-col p-4 pt-12 bg-white z-10">
                    <Pressable onPress={onClose} className="flex-row items-center p-3">
                        <Ionicons name="chevron-back" size={32} color="black" />
                        <Text size="lg" className="text-black ml-2 font-semibold">Back</Text>
                    </Pressable>
                    <Text size="xl" className="text-black font-semibold mt-2" numberOfLines={1}>
                        {title}
                    </Text>
                </Box>

                {/* Video Player */}
                <Box className="flex-1 items-center justify-center bg-white">
                    {embedUrl ? (
                        <>
                            {loading && (
                                <Box className="absolute inset-0 items-center justify-center z-20">
                                    <ActivityIndicator size="large" color="#000" />
                                </Box>
                            )}
                                {videoType === 'youtube' ? (
                                    <YoutubePlayer
                                        height={availableHeight}
                                        width={width}
                                        videoId={videoId}
                                        play={false}
                                        onReady={() => setLoading(false)}
                                        onError={e => {
                                            console.error('YouTube player error', e);
                                            setLoading(false);
                                        }}
                                    />
                                ) : (
                                    <WebView
                                        source={{ uri: embedUrl }}
                                        style={[styles.webview, { height: availableHeight }]}
                                        allowsFullscreenVideo={true}
                                        allowsInlineMediaPlayback={true}
                                        mediaPlaybackRequiresUserAction={false}
                                        javaScriptEnabled={true}
                                        domStorageEnabled={true}
                                        startInLoadingState={true}
                                        scalesPageToFit={false}
                                        mixedContentMode="always"
                                        injectedJavaScript={injectedJavaScript}
                                        onLoadEnd={() => setLoading(false)}
                                        onError={(e) => {
                                            console.error('WebView error:', e.nativeEvent);
                                            setLoading(false);
                                        }}
                                        renderError={(errorName) => (
                                            <Box className="flex-1 items-center justify-center">
                                                <Text className="text-white">Error loading video: {errorName}</Text>
                                                <Text className="text-white text-xs mt-2">Please check the video URL</Text>
                                            </Box>
                                        )}
                                    />
                                )}
                        </>
                    ) : (
                        <Box className="flex-1 items-center justify-center">
                            <Text className="text-black">Invalid video URL</Text>
                        </Box>
                    )}
                </Box>
            </Box>
        </Modal>
    );
};

const styles = StyleSheet.create({
    webview: {
        flex: 1,
        backgroundColor: 'black',
    }
});

export default VideoPlayerModal;
