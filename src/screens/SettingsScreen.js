import React from 'react';
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useApp } from '../context/AppContext';
import { COLORS, SIZES, SOUNDS } from '../constants';

const SettingsScreen = () => {
  const router = useRouter();
  const {
    volume,
    soundEnabled,
    animationsEnabled,
    hapticEnabled,
    currentSound,
    setVolume,
    toggleSound,
    toggleAnimations,
    toggleHaptic,
    setSound,
  } = useApp();

  const soundOptions = Object.entries(SOUNDS).map(([key, value]) => ({
    label: key.charAt(0).toUpperCase() + key.slice(1),
    value,
    key,
  }));

  const showVolumeAlert = () => {
    Alert.prompt(
      'Set Volume',
      'Enter volume (0.0 - 1.0)',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Set',
          onPress: (text) => {
            const vol = parseFloat(text);
            if (!isNaN(vol) && vol >= 0 && vol <= 1) {
              setVolume(vol);
            }
          },
        },
      ],
      'plain-text',
      volume.toString()
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Audio</Text>
        
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Sound Enabled</Text>
          <Switch
            value={soundEnabled}
            onValueChange={toggleSound}
            trackColor={{ false: COLORS.gray, true: COLORS.secondary }}
            thumbColor={soundEnabled ? COLORS.accent : COLORS.lightGray}
          />
        </View>

        <TouchableOpacity style={styles.settingRow} onPress={showVolumeAlert}>
          <Text style={styles.settingLabel}>Volume</Text>
          <Text style={styles.settingValue}>{Math.round(volume * 100)}%</Text>
        </TouchableOpacity>

        <Text style={styles.subsectionTitle}>Sound Selection</Text>
        {soundOptions.map((option) => (
          <TouchableOpacity
            key={option.key}
            style={[
              styles.settingRow,
              currentSound === option.value && styles.selectedRow,
            ]}
            onPress={() => setSound(option.value)}
          >
            <Text style={styles.settingLabel}>{option.label}</Text>
            {currentSound === option.value && (
              <Text style={styles.checkmark}>✓</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Animations</Text>
        
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Animations Enabled</Text>
          <Switch
            value={animationsEnabled}
            onValueChange={toggleAnimations}
            trackColor={{ false: COLORS.gray, true: COLORS.secondary }}
            thumbColor={animationsEnabled ? COLORS.accent : COLORS.lightGray}
          />
        </View>

        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Haptic Feedback</Text>
          <Switch
            value={hapticEnabled}
            onValueChange={toggleHaptic}
            trackColor={{ false: COLORS.gray, true: COLORS.secondary }}
            thumbColor={hapticEnabled ? COLORS.accent : COLORS.lightGray}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.base,
    paddingTop: SIZES.base * 3,
  },
  backButton: {
    padding: SIZES.base / 2,
  },
  backText: {
    fontSize: SIZES.body,
    color: COLORS.black,
    fontWeight: '600',
  },
  title: {
    fontSize: SIZES.h2,
    fontWeight: 'bold',
    color: COLORS.black,
    marginLeft: SIZES.base,
  },
  section: {
    margin: SIZES.base,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.base,
  },
  sectionTitle: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: SIZES.base,
  },
  subsectionTitle: {
    fontSize: SIZES.body,
    fontWeight: '600',
    color: COLORS.black,
    marginTop: SIZES.base,
    marginBottom: SIZES.base / 2,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SIZES.base,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  selectedRow: {
    backgroundColor: COLORS.accent,
    borderRadius: SIZES.radius / 2,
    paddingHorizontal: SIZES.base / 2,
  },
  settingLabel: {
    fontSize: SIZES.body,
    color: COLORS.black,
  },
  settingValue: {
    fontSize: SIZES.body,
    color: COLORS.gray,
    fontWeight: '600',
  },
  checkmark: {
    fontSize: SIZES.body,
    color: COLORS.secondary,
    fontWeight: 'bold',
  },
});

export default SettingsScreen;
