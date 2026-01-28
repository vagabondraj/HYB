import { useState, useEffect, useCallback, useRef } from 'react';
import api from '../api/axios';

const POLL_INTERVAL = 5000; // 5 seconds for chat

export const useChat = (chatId, enabled = true) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const intervalRef = useRef(null);
  const lastMessageIdRef = useRef(null);

  const fetchMessages = useCallback(async () => {
    if (!enabled || !chatId) return;

    try {
      setIsLoading(true);
      const response = await api.get(`/chat/${chatId}/messages`);
      const data = response.data.data.messages || [];
      setMessages(data);
      if (data.length > 0) {
        lastMessageIdRef.current = data[data.length - 1]._id;
      }
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Failed to fetch messages:', err);
    } finally {
      setIsLoading(false);
    }
  }, [chatId, enabled]);

  const sendMessage = useCallback(async (content, image = null) => {
    if (!chatId) return { success: false };

    try {
      const formData = new FormData();
      formData.append('content', content);
      if (image) {
        formData.append('image', image);
      }

      const response = await api.post(`/chat/${chatId}/messages`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const newMessage = response.data.data.message;
      setMessages(prev => [...prev, newMessage]);
      return { success: true, message: newMessage };
    } catch (err) {
      console.error('Failed to send message:', err);
      return { success: false, error: err.message };
    }
  }, [chatId]);

  const deleteMessage = useCallback(async (messageId) => {
    if (!chatId) return;

    try {
      await api.delete(`/chat/${chatId}/messages/${messageId}`);
      setMessages(prev => prev.filter(m => m._id !== messageId));
    } catch (err) {
      console.error('Failed to delete message:', err);
    }
  }, [chatId]);

  // Initial fetch
  useEffect(() => {
    if (enabled && chatId) {
      fetchMessages();
    }
  }, [enabled, chatId, fetchMessages]);

  // Polling
  useEffect(() => {
    if (enabled && chatId) {
      intervalRef.current = setInterval(fetchMessages, POLL_INTERVAL);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [enabled, chatId, fetchMessages]);

  return {
    messages,
    isLoading,
    error,
    refetch: fetchMessages,
    sendMessage,
    deleteMessage,
  };
};

export const useChatList = (enabled = true) => {
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const intervalRef = useRef(null);

  const fetchChats = useCallback(async () => {
    if (!enabled) return;

    try {
      setIsLoading(true);
      const response = await api.get('/chat');
      setChats(response.data.data.chats || []);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Failed to fetch chats:', err);
    } finally {
      setIsLoading(false);
    }
  }, [enabled]);

  useEffect(() => {
    if (enabled) {
      fetchChats();
    }
  }, [enabled, fetchChats]);

  useEffect(() => {
    if (enabled) {
      intervalRef.current = setInterval(fetchChats, 15000); // 15 seconds
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [enabled, fetchChats]);

  return {
    chats,
    isLoading,
    error,
    refetch: fetchChats,
  };
};
