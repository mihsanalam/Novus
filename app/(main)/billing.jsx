import React from 'react';
import { Box } from '../../components/ui/box';
import { Text } from '../../components/ui/text';
import { Button, ButtonText } from '../../components/ui/button';
import { Protect, UserProfile } from '@clerk/clerk-expo/web';
import { Platform, Linking, Pressable } from 'react-native';
import { WebView } from 'react-native-webview';
import Ionicon from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';

// PricingTable is web‑only; we import dynamically inside the component when on web


export default function Billing() {

  const router = useRouter();

  // if not web, show the billing page in an embedded WebView instead of leaving the app
  if (Platform.OS !== 'web') {
    const host = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';
    const url = `http://${host}:8081/billing`;

    const injectedJavaScript = `
      var style = document.createElement('style');
      style.textContent = \`
        /* Center Clerk modals */
        .cl-modal, .cl-modal-overlay, [data-clerk-modal], .modal, [role="dialog"] {
          position: fixed !important;
          top: 50% !important;
          left: 50% !important;
          transform: translate(-50%, -50%) !important;
          z-index: 9999 !important;
        }
        /* Add safe area padding */
        body { padding-top: 40px !important; }
      \`;
      document.head.appendChild(style);
      true;
    `;

    return (
      <>
        {/* <Box className="flex-row items-center pt-16 p-4">
          <Pressable onPress={() => router.back()} className="absolute left-4 z-10 p-2">
            <Ionicon name="chevron-back" size={24} color="#000" />
          </Pressable>
          <Text className="flex-1 text-center text-lg font-semibold text-black">Billing</Text>
        </Box> */}
        <WebView
          source={{ uri: url }}
          style={{ flex: 1 }}
          injectedJavaScript={injectedJavaScript}
          // prevent links to external schemes from crashing the app
          onShouldStartLoadWithRequest={(request) => {
            // if Clerk tries to redirect back to a deep link (e.g. novus://), ignore it
            if (request.url.startsWith('novus://') || request.url.startsWith('exp://')) {
              console.log('Ignoring deep link inside WebView', request.url);
              return false;
            }
            return true;
          }}
        />
      </>
    );
  }

  // web case: render PricingTable inside Protect fallback
  const PricingTable = React.lazy(() =>
    import('@clerk/clerk-expo/web').then(m => ({ default: m.PricingTable }))
  );

  return (
    <Box className="flex-1 gap-6 px-4">
      <Box className="flex-row items-center pt-16 p-4">
        <Pressable onPress={() => router.replace('/(main)/home')} className="absolute left-4 z-10 p-2">
          <Ionicon name="chevron-back" size={24} color="#000" />
        </Pressable>
        <Text className="flex-1 text-center text-lg font-semibold text-black">Billing</Text>
      </Box>
      <Protect plan="pro" fallback={<PricingTable newSubscriptionRedirectUrl="/profile" />}>
        <UserProfile />
      </Protect>
    </Box>
  );
}
