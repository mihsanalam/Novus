// import { Stack } from 'expo-router';

// export default function MainLayout() {
//     return (
//         <Stack>
//             <Stack.Screen name="home" options={{ headerShown: false }} />
//             <Stack.Screen name="courses" options={{ headerShown: false }} />
//             <Stack.Screen name="course-details" options={{ headerShown: false }} />
//             <Stack.Screen name="profile" options={{ headerShown: false }} />
//             <Stack.Screen name="billing" options={{ headerShown: false }} />
//         </Stack>
//     );
// }
import { Stack } from 'expo-router';

export default function MainLayout() {
    return (
        <Stack screenOptions={{ 
            headerShown: false,
        }}>
            <Stack.Screen name="home" options={{ headerShown: false }} />
            <Stack.Screen name="courses" options={{ headerShown: false }} />
            <Stack.Screen name="course-details" options={{ headerShown: false }} />
            <Stack.Screen name="profile" options={{ headerShown: false }} />
            <Stack.Screen name="billing" options={{ headerShown: false }} />
        </Stack>
    );
}