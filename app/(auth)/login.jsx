import { Box } from "../../components/ui/box";
import { Button, ButtonText } from "../../components/ui/button";
import { Input, InputField } from "../../components/ui/input";
import { Spinner } from "../../components/ui/spinner";
import { Text } from "../../components/ui/text";
import { useToast } from "../../components/ui/toast";
import { Link, router } from "expo-router";
import { useState } from "react";
import {
    Image,
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
    View
} from "react-native";
import Svg, { Path } from "react-native-svg";
import Animated, { FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSignIn, useOAuth } from "@clerk/clerk-expo";
import { EmailVerificationModal } from "../../components/email-verification-modal";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const animationDelay = 60;
    const increaseDelayBy = 60;
    const animationDuration = 800;

    const toast = useToast();

    const { signIn, setActive, isLoaded } = useSignIn();
    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

    const onGoogleSignIn = async () => {
        try {
            const { createdSessionId, setActive, signIn, signUp } = await startOAuthFlow();
            
            if (createdSessionId) {
                await setActive({ session: createdSessionId });
                router.replace("/(main)/home");
            }
        } catch (error) {
            console.error('Google sign in error:', error);
            toast.show({
                placement: "top",
                duration: 3000,
                render: ({ id }) => {
                    return (
                        <View className="bg-error-600 p-4 rounded-lg mx-4 mt-12">
                            <Text className="text-white font-medium">Google sign in failed. Please try again.</Text>
                        </View>
                    );
                },
            });
        }
    };

    const onSubmit = async () => {

        if (!email.trim() || !password.trim()) {
            toast.show({
                placement: "top",
                duration: 3000,
                render: ({ id }) => {
                    return (
                        <View className="bg-warning-600 p-4 rounded-lg mx-4 mt-12">
                            <Text className="text-white font-medium">Please fill all the fields</Text>
                        </View>
                    );
                },
            });
            return;
        }

        if (!isLoaded) return;

        setLoading(true);

        try{   
            const signInResult = await signIn.create({
                identifier: email,
                password,
            });    

            console.log('Sign in result:', signInResult.status);

            if (signInResult.status === "complete") {
                try {
                    await setActive({ session: signInResult.createdSessionId });
                    console.log('Session set, navigating to home');
                    router.replace("/(main)/home");
                } catch (sessionError) {
                    console.error('Error setting active session:', sessionError);
                    toast.show({
                        placement: "top",
                        duration: 3000,
                        render: ({ id }) => {
                            return (
                                <View className="bg-error-600 p-4 rounded-lg mx-4 mt-12">
                                    <Text className="text-white font-medium">Session activation failed. Please try again.</Text>
                                </View>
                            );
                        },
                    });
                }
            } else if (signInResult.status === "needs_second_factor") {
                // Prepare email code for 2FA
                await signIn.prepareSecondFactor({ strategy: "email_code" });
                setModalVisible(true);
            } else {
                console.log('Sign in incomplete:', signInResult);
            }
        }catch(error){
            console.error('Login error:', error);
            const errorMessage = error.errors?.[0]?.longMessage || error.errors?.[0]?.message || "Invalid email or password";
            toast.show({
                placement: "top",
                duration: 3000,
                render: ({ id }) => {
                    return (
                        <View className="bg-error-600 p-4 rounded-lg mx-4 mt-12">
                            <Text className="text-white font-medium">{errorMessage}</Text>
                        </View>
                    );
                },
            });
        }finally{
            setLoading(false);
        }

    };

    const onSubmitCode = async (code) => {
        if (!isLoaded) return;

        setLoading(true);

        try {
            const completeSignIn = await signIn.attemptSecondFactor({
                strategy: "email_code",
                code,
            });

            if (completeSignIn.status === "complete") {
                try {
                    await setActive({ session: completeSignIn.createdSessionId });
                    router.replace("/(main)/home");
                } catch (sessionError) {
                    console.error('Error setting active session after 2FA:', sessionError);
                    toast.show({
                        placement: "top",
                        duration: 3000,
                        render: ({ id }) => {
                            return (
                                <View className="bg-error-600 p-4 rounded-lg mx-4 mt-12">
                                    <Text className="text-white font-medium">Session activation failed after verification. Please try again.</Text>
                                </View>
                            );
                        },
                    });
                }
            } else {
                toast.show({
                    placement: "top",
                    duration: 3000,
                    render: ({ id }) => {
                        return (
                            <View className="bg-error-600 p-4 rounded-lg mx-4 mt-12">
                                <Text className="text-white font-medium">Verification failed. Please try again.</Text>
                            </View>
                        );
                    },
                });
            }
        } catch (error) {
            console.error('2FA verification error:', error);
            const errorMessage = error.errors?.[0]?.longMessage || error.errors?.[0]?.message || "Verification failed";
            toast.show({
                placement: "top",
                duration: 3000,
                render: ({ id }) => {
                    return (
                        <View className="bg-error-600 p-4 rounded-lg mx-4 mt-12">
                            <Text className="text-white font-medium">{errorMessage}</Text>
                        </View>
                    );
                },
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <ImageBackground
            source={require("../../assets/images/background.jpeg")}
            resizeMode="cover"
            className="flex-1"
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                className="flex-1"
            >
                <SafeAreaView className="flex-1">
                    <Box className="flex-1 px-6">
                        {/* logo */}
                        <Animated.View
                            entering={FadeInDown.springify(animationDuration)}
                            className="items-center justify-center "
                        >
                            <Image
                                style={{ width: 400, height: 300 }}
                                source={require("../../assets/images/logo.png")}
                                resizeMode="contain"
                            />
                        </Animated.View>

                        {/* form */}
                        <Box className="gap-5 flex-1 justify-center -mt-5">
                            <Animated.Text
                                entering={FadeInDown.delay(animationDelay).springify(animationDuration)}
                                className="text-2xl text-center font-semibold text-[#2E5E99] mb-6"
                            >
                                Login To Your Account
                            </Animated.Text>

                            <Animated.View
                                entering={FadeInDown.delay(animationDelay + increaseDelayBy * 1).springify(animationDuration)}
                            >
                                <Input
                                    variant="rounded"
                                    size="xl"
                                    className="w-full bg-white/90 border-0 h-14 px-4 rounded-full"
                                >
                                    <InputField
                                        value={email}
                                        onChangeText={setEmail}
                                        placeholder="Enter Your Email"
                                        className="text-black"
                                        placeholderTextColor="#666"
                                    />
                                </Input>
                            </Animated.View>

                            <Animated.View
                                entering={FadeInDown.delay(animationDelay + increaseDelayBy * 2).springify(animationDuration)}
                            >
                                <Input
                                    variant="rounded"
                                    size="xl"
                                    className="w-full bg-white/90 border-0 h-14 px-4 rounded-full"
                                >
                                    <InputField
                                        value={password}
                                        onChangeText={setPassword}
                                        placeholder="Enter Your Password"
                                        secureTextEntry
                                        className="text-black"
                                        placeholderTextColor="#666"
                                    />
                                </Input>
                            </Animated.View>

                            <Animated.View
                                entering={FadeInDown.delay(animationDelay + increaseDelayBy * 3).springify(animationDuration)}
                            >
                                <Button
                                    onPress={onSubmit}
                                    className="rounded-full w-full h-14 bg-[#2E5E99]"
                                    size="xl"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <Spinner color="white" />
                                    ) : (
                                        <ButtonText className="text-white font-bold text-xl">
                                            Login
                                        </ButtonText>
                                    )}
                                </Button>
                            </Animated.View>

                            <Animated.Text
                                entering={FadeInDown.delay(animationDelay + increaseDelayBy * 4).springify(animationDuration)}
                                className="text-center text-lg text-white/80 font-medium py-2"
                            >
                                or
                            </Animated.Text>

                            <Animated.View
                                entering={FadeInDown.delay(animationDelay + increaseDelayBy * 5).springify(animationDuration)}
                            >
                                <Button
                                    onPress={onGoogleSignIn}
                                    className="rounded-full w-full h-14 bg-white border border-black"
                                    size="xl"
                                >
                                    <Svg width="20" height="20" viewBox="0 0 24 24">
                                        <Path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                        <Path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                        <Path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                                        <Path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                                    </Svg>
                                    <ButtonText className="text-black font-bold text-xl ml-2">
                                        Continue with Google
                                    </ButtonText>
                                </Button>
                            </Animated.View>

                            <Animated.View
                                entering={FadeInDown.delay(animationDelay + increaseDelayBy * 6).springify(animationDuration)}
                                className="flex-row justify-center mt-6"
                            >
                                <Text className="text-white/90 text-lg">Do not have an account? </Text>
                                <Link href="/(auth)/signup" asChild>
                                    <Text className="text-[#2E5E99] font-bold text-lg underline">Sign Up</Text>
                                </Link>
                            </Animated.View>
                        </Box>
                    </Box>
                </SafeAreaView>
            </KeyboardAvoidingView>
        </ImageBackground>

        {modalVisible && (
            <EmailVerificationModal
                isOpen={modalVisible}
                onClose={() => setModalVisible(false)}
                loading={loading}
                onSubmitCode={onSubmitCode}
            />
        )}
        </>
    )
};

export default Login;
