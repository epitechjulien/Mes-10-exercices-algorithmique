/**
 * In this challenge, you should sort messages by their sentAt property (oldest first) and
 * modify them by adding an "unread" property
 * (boolean meaning that the current user did not read this message) based on the lastActivityDatetime
 * input.
 *
 * @param lastActivityDatetime String representing an ISO8601 datetime. Represent the last time the user checked his messages
 * @param messages List of messages, unsorted and without unread property
 * @returns Sorted list of messages with the unread information
 */

// ↓ uncomment bellow lines and add your response!
export default function ({
  lastActivityDatetime,
  messages,
}: {
  lastActivityDatetime: string;
  messages: Message[];
}): MessageWithUnread[] {
  // Changement du type de la variable messages
  let messagesSorted: MessageWithUnread[] = messages as MessageWithUnread[];
  // Trie des messages par les anciens en premiers
  messagesSorted.sort((a, b) => {
    if (a.sentAt !== b.sentAt) {
      return a.sentAt.localeCompare(b.sentAt);
    }
    return 0;
  });
  // Ajout de la propriété "unread" à chaque message en fonction de la date de la dernière activité
  for (let i = 0; i < messagesSorted.length; i++) {
    if (messagesSorted[i]["sentAt"] > lastActivityDatetime) {
      messagesSorted[i]["unread"] = true;
    } else {
      messagesSorted[i]["unread"] = false;
    }
  }
  return messagesSorted;
}

// used interfaces, do not touch
export interface Message {
  author: string;
  sentAt: string;
  message: string;
}

export interface MessageWithUnread extends Message {
  unread: boolean;
}
