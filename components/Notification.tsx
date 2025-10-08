
import React, { useEffect } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { StyleSheet, View, Text } from './react-native';
import { AppColors } from './common';
import { Notification as NotificationType } from '../types';

const Notification = ({ notification, onDismiss }: { notification: NotificationType, onDismiss: () => void }) => {
    useEffect(() => {
        const timer = setTimeout(onDismiss, 3000);
        return () => clearTimeout(timer);
    }, [onDismiss]);

    const typeStyles: Record<string, React.CSSProperties> = {
        success: { backgroundColor: AppColors.success, color: 'white' },
        error: { backgroundColor: AppColors.danger, color: 'white' },
        info: { backgroundColor: AppColors.primary, color: 'white' },
    };

    return (
        <View style={[styles.notification, typeStyles[notification.type]]}>
            <Text style={{ color: 'white' }}>{notification.message}</Text>
        </View>
    );
};

export const NotificationContainer = () => {
    const { state, dispatch } = useAppContext();
    const { notifications } = state;

    return (
        <View style={styles.container}>
            {notifications.map(notif => (
                <Notification
                    key={notif.id}
                    notification={notif}
                    onDismiss={() => dispatch({ type: 'REMOVE_NOTIFICATION', payload: notif.id })}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'fixed',
        top: 20,
        right: 20,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
    },
    notification: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        animation: 'slideIn 0.5s forwards',
    },
    '@keyframes slideIn': {
        'from': { transform: 'translateX(100%)', opacity: 0 },
        'to': { transform: 'translateX(0)', opacity: 1 },
    }
});

const keyframes = `@keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }`;
const styleSheet = document.createElement("style");
styleSheet.innerText = keyframes;
document.head.appendChild(styleSheet);