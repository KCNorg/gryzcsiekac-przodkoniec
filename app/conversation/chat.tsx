import React, { useState, useCallback } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  StyleSheet, 
  SafeAreaView 
} from 'react-native';
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

// Replace this with your own model endpoint, e.g. gpt-4 or gpt-3.5-turbo
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

export default function Conversation() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'system',
      content: "Jesteś wolontariuszem, masz na imię Roman oraz masz 20 lat, zachowuj się grzecznie i z szacunkiem. Osoba z którą piszesz jest starsza, i potrzebuje twojej pomocy. Postaraj się jak najlepiej jej pomóc, i proszę jak najbardziej staraj się odzworowywać człowieka i nie pokazuj, że jesteś sztucnym inteligentnym systemem.",
    },
  ]);
  const [inputText, setInputText] = useState<string>('');
  const apiKey = Constants.manifest?.extra?.openAiApiKey || '';

  const { recognizing, handleStart, handleStop } = useSpeechRecognition({
    setText: setInputText,
  });

  const handleSend = useCallback(async () => {
    if (!inputText.trim()) return;

    // Add the user message to the conversation
    const updatedMessages = [
      ...messages,
      { role: 'user' as 'user', content: inputText.trim() },
    ];
    setMessages(updatedMessages);
    setInputText('');

    try {
      // Prepare payload for the OpenAI Chat Completion API
      const requestBody = {
        model: 'gpt-4', // or "gpt-3.5-turbo"
        messages: updatedMessages,
        temperature: 0.7,
      };

      const response = await fetch(OPENAI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const assistantMessage = data.choices?.[0]?.message?.content ?? '';

      if (assistantMessage) {
        setMessages(prev => [
          ...prev,
          { role: 'assistant' as 'assistant', content: assistantMessage },
        ]);
      }
    } catch (error) {
      console.error('Error sending message to OpenAI:', error);
      setMessages(prev => [
        ...prev,
        { role: 'assistant' as 'assistant', content: 'Sorry, something went wrong.' },
      ]);
    }
  }, [apiKey, inputText, messages]);

  // Renders each chat bubble (assistant vs user)
  const renderItem = ({ item }: { item: Message }) => {
    const isUser = item.role === 'user';
    const isAssistant = item.role === 'assistant';
    const bubbleStyle = isUser ? styles.userBubble : styles.assistantBubble;
    const textStyle = isUser ? styles.userText : styles.assistantText;

    // We generally don’t display the system message bubble in the chat UI
    if (item.role === 'system') return null;

    return (
      <View style={[styles.messageBubble, bubbleStyle]}>
        <Text style={textStyle}>{item.content}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(_, index) => String(index)}
        contentContainerStyle={styles.chatContainer}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={handleSend}
          returnKeyType="send"
        />
        <TouchableOpacity
          style={styles.mic}
          onPress={recognizing ? handleStop : handleStart}
        >
          {recognizing ? (
            <Ionicons name="mic-off-outline" size={32} />
          ) : (
            <Ionicons name="mic-outline" size={32} />
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  chatContainer: {
    padding: 10,
    paddingBottom: 100, // leave space for the input
  },
  messageBubble: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
    maxWidth: '80%',
  },
  userBubble: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end',
  },
  assistantBubble: {
    backgroundColor: '#E5E5EA',
    alignSelf: 'flex-start',
  },
  userText: {
    color: '#000000',
  },
  assistantText: {
    color: '#000000',
  },
  inputContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#f2f2f2',
    padding: 10,
    paddingBottom: 32,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    fontSize: 16,
  },
  mic: {
    padding: 8,
    borderRadius: 100,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sendButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});