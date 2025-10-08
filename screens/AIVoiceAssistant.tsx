import React, { useState } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { Screen } from '../constants';
import { Container, Header, AppColors, Button } from '../components/common';
import { View, Text, StyleSheet, TouchableOpacity } from '../components/react-native';
import { MicrophoneIcon } from '../components/icons';

export const AIVoiceAssistantScreen = () => {
    const { dispatch } = useAppContext();
    const [isRecording, setIsRecording] = useState(false);
    const [transcription, setTranscription] = useState('Press the button and start speaking...');

    const handleToggleRecording = () => {
        setIsRecording(!isRecording);
        if (!isRecording) {
            setTranscription('Listening...');
            // Placeholder for starting Gemini Live API session
        } else {
            setTranscription('Processing...');
             // Placeholder for closing Gemini Live API session
        }
    };

    return (
        <Container>
            <Header title="AI Voice Assistant" onBack={() => dispatch({ type: 'NAVIGATE', payload: Screen.DASHBOARD })} />
            <View style={styles.content}>
                <Text style={styles.transcriptionText}>{transcription}</Text>
                <TouchableOpacity onPress={handleToggleRecording} style={[styles.micButton, isRecording && styles.micButtonRecording]}>
                    <MicrophoneIcon style={styles.micIcon} />
                </TouchableOpacity>
                <Text style={styles.micLabel}>{isRecording ? 'Tap to stop' : 'Tap to speak'}</Text>
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    transcriptionText: {
        fontSize: 20,
        color: AppColors.textSecondary,
        textAlign: 'center',
        minHeight: 100,
    },
    micButton: {
        width: 100,
        height: 100,
        borderRadius: 9999,
        backgroundColor: AppColors.primary,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 32,
        boxShadow: `0 0 20px ${AppColors.primary}`,
    },
    micButtonRecording: {
        backgroundColor: AppColors.danger,
        boxShadow: `0 0 20px ${AppColors.danger}`,
    },
    micIcon: {
        width: 48,
        height: 48,
        color: 'white',
    },
    micLabel: {
        color: AppColors.textSecondary,
        fontSize: 16,
    },
});
