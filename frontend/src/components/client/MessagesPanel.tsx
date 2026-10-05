import { useEffect, useState } from "react";
import { getClientMessages } from "../../services/clientService";

export default function MessagesPanel() {
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    getClientMessages().then(setMessages).catch(console.error);
  }, []);

  return (
    <section>
      <h2>Messages</h2>

      {messages.length === 0 && <p>No messages yet.</p>}

      {messages.map(msg => (
        <div key={msg.id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
          <p><strong>From:</strong> {msg.from}</p>
          <p>{msg.text}</p>
          <p><small>{msg.createdAt}</small></p>
        </div>
      ))}
    </section>
  );
}