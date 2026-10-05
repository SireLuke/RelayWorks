import { useEffect, useState } from "react";
import { getOperatorNotifications } from "../../services/operatorService";

export default function NotificationsPanel() {
  const [notes, setNotes] = useState<any[]>([]);

  useEffect(() => {
    getOperatorNotifications().then(setNotes).catch(console.error);
  }, []);

  return (
    <section>
      <h2>Notifications</h2>

      {notes.length === 0 && <p>No notifications.</p>}

      {notes.map(n => (
        <div key={n.id} style={{
          borderBottom: "1px solid #ccc",
          padding: "5px"
        }}>
          <p><strong>{n.title}</strong></p>
          <p>{n.message}</p>
        </div>
      ))}
    </section>
  );
}