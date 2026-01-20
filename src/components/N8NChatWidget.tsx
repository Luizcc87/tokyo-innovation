import { useEffect } from 'react';
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';

// Extend Window interface to track initialization
declare global {
  interface Window {
    __TOKYO_N8N_CHAT_INITIALIZED__?: boolean;
  }
}

export function N8NChatWidget() {
  useEffect(() => {
    // Guard 1: Global flag to prevent multiple initializations
    if (window.__TOKYO_N8N_CHAT_INITIALIZED__) {
      return;
    }

    // Guard 2: Check if chat widget already exists in DOM (for HMR scenarios)
    const existingChat = document.querySelector('.n8n-chat');
    const existingToggle = document.querySelector('[class*="chat-toggle"]');
    if (existingChat || existingToggle) {
      window.__TOKYO_N8N_CHAT_INITIALIZED__ = true;
      return;
    }

    // Create the chat widget
    createChat({
      webhookUrl: 'https://webh1.tokyoinnovation.com.br/webhook/840023e5-95f6-41d9-b078-3f7f8808cc58/chat',
      mode: 'window',
      showWelcomeScreen: true,
      loadPreviousSession: true,
      initialMessages: [
        'Olá! Sou a IA da Tokyo Innovation.',
        'Me diga seu nicho e o que você quer melhorar (vendas, atendimento, operação, dados).'
      ],
      i18n: {
        en: {
          title: 'Fale com a IA da Tokyo Innovation',
          subtitle: 'Respostas rápidas, em linguagem de dono.',
          footer: '',
          getStarted: 'Nova conversa',
          inputPlaceholder: 'Digite sua pergunta…',
          closeButtonTooltip: 'Fechar',
        }
      },
      metadata: {
        source: 'site',
        brand: 'Tokyo Innovation'
      }
    });

    // Mark as initialized
    window.__TOKYO_N8N_CHAT_INITIALIZED__ = true;
  }, []);

  // This component doesn't render anything visible
  // The chat widget is injected into the DOM by createChat()
  return null;
}
