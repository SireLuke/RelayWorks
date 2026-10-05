import { useEffect, useState } from "react";
import { getReviewerMessages } from "../../services/reviewerService";

export default function ReviewerMessagesPanel() {
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    getReviewerMessages().then(setMessages).catch(console.error);
  }, []);

  return (
    <section>
      <h2>Messages</h2>

      {messages.length === 0 && <p>No messages.</p>}

      {messages.map(msg => (
        <div key={msg.id} style={{
          border: "1px solid #ccc",
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "8px"
        }}>
          <p><strong>From:</strong> {msg.from}</p>
          <p>{msg.text}</p>
          <p><small>{msg.createdAt}</small></p>
        </div>
      ))}
    </section>
  );
}