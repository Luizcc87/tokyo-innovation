import { useEffect } from 'react';
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';

// Extend Window interface to track initialization
declare global {
  interface Window {
    __n8nChatInitialized?: boolean;
  }
}

export function N8NChatWidget() {
  useEffect(() => {
    // Prevent multiple initializations across route changes
    if (window.__n8nChatInitialized) {
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
          inputPlaceholder: 'Escreva sua pergunta...',
          closeButtonTooltip: 'Fechar',
        }
      },
      metadata: {
        source: 'site',
        brand: 'Tokyo Innovation'
      }
    });

    // Mark as initialized
    window.__n8nChatInitialized = true;
  }, []);

  // This component doesn't render anything visible
  // The chat widget is injected into the DOM by createChat()
  return null;
}
