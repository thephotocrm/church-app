import React from 'react';
import { View, Text, ScrollView, Pressable, Linking, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MapPin, Navigation, Clock, Phone } from 'lucide-react-native';
import { WebView } from 'react-native-webview';
import { ScreenWrapper } from '../../components/ui';
import { useTheme } from '../../lib/useTheme';

const CHURCH_ADDRESS = '110 Security Ct, Wylie, TX 75098';
const CHURCH_LAT = 33.0151;
const CHURCH_LNG = -96.5389;

const MAP_HTML = `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <style>
    body { margin: 0; padding: 0; }
    #map { width: 100%; height: 100vh; }
  </style>
</head>
<body>
  <div id="map"></div>
  <script>
    var map = L.map('map', { zoomControl: false }).setView([${CHURCH_LAT}, ${CHURCH_LNG}], 16);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap'
    }).addTo(map);
    L.marker([${CHURCH_LAT}, ${CHURCH_LNG}]).addTo(map)
      .bindPopup('<b>First Pentecostal Church of Dallas</b><br>${CHURCH_ADDRESS}')
      .openPopup();
  </script>
</body>
</html>
`;

function openDirections() {
  const encoded = encodeURIComponent(CHURCH_ADDRESS);
  const url = Platform.select({
    ios: `maps:?daddr=${encoded}`,
    default: `https://www.google.com/maps/dir/?api=1&destination=${encoded}`,
  });
  Linking.openURL(url!);
}

export function LocationScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <ScreenWrapper>
      <ScrollView
        contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Map */}
        <View style={{ height: 280, borderBottomWidth: 1, borderBottomColor: colors.border }}>
          <WebView
            source={{ html: MAP_HTML }}
            style={{ flex: 1 }}
            scrollEnabled={false}
            javaScriptEnabled
          />
        </View>

        <View style={{ padding: 20 }}>
          {/* Address card */}
          <View
            style={{
              backgroundColor: colors.card,
              borderRadius: 16,
              padding: 20,
              borderWidth: 1,
              borderColor: colors.border,
              marginBottom: 16,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
              <View
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                  backgroundColor: colors.primary + '15',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 14,
                }}
              >
                <MapPin size={22} color={colors.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontFamily: 'PlayfairDisplay_700Bold',
                    fontSize: 20,
                    color: colors.foreground,
                    marginBottom: 4,
                  }}
                >
                  First Pentecostal Church of Dallas
                </Text>
                <Text
                  style={{
                    fontFamily: 'OpenSans_400Regular',
                    fontSize: 14,
                    color: colors.mutedForeground,
                    lineHeight: 20,
                  }}
                >
                  {CHURCH_ADDRESS}
                </Text>
              </View>
            </View>
          </View>

          {/* Get Directions button */}
          <Pressable
            onPress={openDirections}
            style={{
              backgroundColor: colors.primary,
              borderRadius: 14,
              paddingVertical: 14,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 20,
            }}
          >
            <Navigation size={18} color="#fff" />
            <Text
              style={{
                fontFamily: 'OpenSans_700Bold',
                fontSize: 15,
                color: '#fff',
                marginLeft: 10,
              }}
            >
              Get Directions
            </Text>
          </Pressable>

          {/* Service times */}
          <Text
            style={{
              fontFamily: 'OpenSans_700Bold',
              fontSize: 16,
              color: colors.foreground,
              marginBottom: 12,
            }}
          >
            Service Times
          </Text>

          <View
            style={{
              backgroundColor: colors.card,
              borderRadius: 16,
              padding: 16,
              borderWidth: 1,
              borderColor: colors.border,
              marginBottom: 12,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
              <Clock size={16} color={colors.primary} />
              <Text
                style={{
                  fontFamily: 'OpenSans_700Bold',
                  fontSize: 14,
                  color: colors.foreground,
                  marginLeft: 10,
                }}
              >
                Sunday Morning Worship
              </Text>
            </View>
            <Text
              style={{
                fontFamily: 'OpenSans_400Regular',
                fontSize: 13,
                color: colors.mutedForeground,
                marginLeft: 26,
              }}
            >
              10:30 AM
            </Text>
          </View>

          <View
            style={{
              backgroundColor: colors.card,
              borderRadius: 16,
              padding: 16,
              borderWidth: 1,
              borderColor: colors.border,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
              <Clock size={16} color={colors.primary} />
              <Text
                style={{
                  fontFamily: 'OpenSans_700Bold',
                  fontSize: 14,
                  color: colors.foreground,
                  marginLeft: 10,
                }}
              >
                Connect Nights
              </Text>
            </View>
            <Text
              style={{
                fontFamily: 'OpenSans_400Regular',
                fontSize: 13,
                color: colors.mutedForeground,
                marginLeft: 26,
              }}
            >
              Sundays at 6:00 PM
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}
