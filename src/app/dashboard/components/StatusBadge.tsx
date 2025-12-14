import React from "react";

const StatusBadge = ({ status }: { status: string }) => {
  const statusMap: Record<string, { text: string; className: string }> = {
    confirmed: {
      text: "Confirmed",
      className: "bg-green-100 text-green-800",
    },
    cancelled: { text: "Cancelled", className: "bg-red-100 text-red-800" },
    shipping: { text: "Shipping", className: "bg-yellow-100 text-yellow-800" },
    delivered: { text: "Delivered", className: "bg-blue-100 text-blue-800" },
  };

  const statusInfo = statusMap[status] || {
    text: status,
    className: "bg-gray-100 text-gray-800",
  };
  return (
    <span
      className={`inline-flex h-6 items-center rounded-full px-2.5 text-xs font-medium ${statusInfo.className}`}
    >
      {statusInfo.text}
    </span>
  );
};

export default StatusBadge;
