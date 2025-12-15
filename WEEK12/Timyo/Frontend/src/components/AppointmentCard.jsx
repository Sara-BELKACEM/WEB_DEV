export default function AppointmentCard({ appointment, onCancel, isAdmin, onApprove, onReject }) {
  return (
    <div className="border p-4 rounded shadow">
      <p><b>Date:</b> {appointment.date}</p>
      <p><b>Time:</b> {appointment.time}</p>
      <p><b>Status:</b> {appointment.status}</p>

      {!isAdmin && appointment.status === "pending" && (
        <button
          onClick={() => onCancel(appointment.id)}
          className="mt-2 text-red-500 underline"
        >
          Cancel
        </button>
      )}

      {isAdmin && (
        <div className="space-x-2 mt-2">
          <button onClick={() => onApprove(appointment.id)} className="text-green-600">
            Approve
          </button>
          <button onClick={() => onReject(appointment.id)} className="text-red-600">
            Reject
          </button>
        </div>
      )}
    </div>
  );
}
