import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    keyboardContainer: {
        flex: 1,
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },
    headerContainer: {
        marginBottom: 20,
    },
    brandRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 6,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#0f172a',
        letterSpacing: -0.5,
    },
    badge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 9999,
        backgroundColor: '#e0e7ff',
    },
    badgeText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#4338ca',
    },
    subtitle: {
        fontSize: 14,
        color: '#64748b',
        lineHeight: 20,
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 18,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        ...Platform.select({
            ios: {
                shadowColor: '#0f172a',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 8,
            },
            android: {
                elevation: 2,
            },
        }),
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#0f172a',
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 999,
    },
    statusBadgeOnline: {
        backgroundColor: '#dcfce7',
    },
    statusBadgeOffline: {
        backgroundColor: '#f1f5f9',
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 6,
    },
    statusDotOnline: {
        backgroundColor: '#16a34a',
    },
    statusDotOffline: {
        backgroundColor: '#94a3b8',
    },
    statusText: {
        fontSize: 12,
        fontWeight: '600',
    },
    statusTextOnline: {
        color: '#15803d',
    },
    statusTextOffline: {
        color: '#64748b',
    },
    userProfileRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    avatarAndInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    avatar: {
        width: 46,
        height: 46,
        borderRadius: 23,
        backgroundColor: '#2563eb',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    avatarText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '700',
    },
    userNameText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#0f172a',
    },
    userIdText: {
        fontSize: 13,
        color: '#64748b',
        marginTop: 2,
    },
    logoutButton: {
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 8,
        backgroundColor: '#fee2e2',
        borderWidth: 1,
        borderColor: '#fecaca',
    },
    logoutButtonText: {
        color: '#dc2626',
        fontSize: 13,
        fontWeight: '600',
    },
    inputGroup: {
        marginBottom: 14,
    },
    inputLabel: {
        fontSize: 13,
        fontWeight: '600',
        color: '#334155',
        marginBottom: 6,
    },
    input: {
        width: '100%',
        height: 46,
        borderColor: '#cbd5e1',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 14,
        fontSize: 15,
        color: '#0f172a',
        backgroundColor: '#f8fafc',
    },
    presetsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 8,
        marginTop: 8,
        marginBottom: 6,
    },
    presetLabel: {
        fontSize: 12,
        color: '#64748b',
        marginRight: 2,
    },
    presetChip: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 999,
        backgroundColor: '#f1f5f9',
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    presetChipText: {
        fontSize: 12,
        color: '#334155',
        fontWeight: '500',
    },
    primaryButton: {
        height: 48,
        borderRadius: 10,
        backgroundColor: '#2563eb',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 6,
    },
    primaryButtonDisabled: {
        opacity: 0.6,
    },
    primaryButtonText: {
        color: '#ffffff',
        fontSize: 15,
        fontWeight: '600',
    },
    callSectionTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: '#0f172a',
        marginBottom: 4,
    },
    callSectionSubtitle: {
        fontSize: 13,
        color: '#64748b',
        marginBottom: 14,
    },
    callButtonsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
        marginTop: 10,
    },
    callButtonWrapper: {
        flex: 1,
        alignItems: 'center',
    },
    callButtonLabel: {
        fontSize: 12,
        fontWeight: '600',
        color: '#475569',
        marginTop: 6,
    },
    infoBox: {
        backgroundColor: '#f0f9ff',
        borderRadius: 12,
        padding: 14,
        borderWidth: 1,
        borderColor: '#bae6fd',
        marginTop: 4,
    },
    infoTitle: {
        fontSize: 13,
        fontWeight: '600',
        color: '#0369a1',
        marginBottom: 4,
    },
    infoText: {
        fontSize: 12,
        color: '#0c4a6e',
        lineHeight: 18,
    },
    cardSubtitle: {
        fontSize: 14,
        color: '#64748b',
        lineHeight: 20,
        marginBottom: 16,
    },
    boldText: {
        fontWeight: '700',
    },
});

export default styles;
