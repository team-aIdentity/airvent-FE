"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/UserContext";
import { formatDate } from "./utils/formatDate";

import Container from "@/components/Layout/Container";
import StatusBadge from "./components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Order } from "@/types";

import pro from "@/assets/Product/pro.png";
import titan from "@/assets/Product/pro.png";
import { SquareArrowOutUpRight, Truck, Edit2, Save, X } from "lucide-react";
import { Loading } from "@/components/Layout/Loading";

const Dashboard = () => {
  const router = useRouter();
  const { user, isLoading: userLoading } = useUser();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Admin 필터링
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // 수정 모드
  const [editingOrderId, setEditingOrderId] = useState<string | null>(null);
  const [editingStatus, setEditingStatus] = useState<string>("");
  const [editingTracking, setEditingTracking] = useState({
    trackingNumber: "",
    carrier: "",
    shippedAt: "",
    deliveredAt: "",
  });

  const isAdmin = user?.role === "admin";

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const url = isAdmin
          ? `/api/orders/all?status=${statusFilter}`
          : "/api/orders/me";
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch order information.");
        }

        const data = await response.json();
        setOrders(data.orders);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error has occurred.");
      } finally {
        setIsLoading(false);
      }
    };

    if (!userLoading) {
      fetchOrders();
    }
  }, [user, userLoading, isAdmin, statusFilter]);

  const handleStatusUpdate = async (orderId: string) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: editingStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update order status.");
      }

      const data = await response.json();
      setOrders((prev) =>
        prev.map((order) => (order.id === orderId ? data.order : order)),
      );
      setEditingOrderId(null);
      setEditingStatus("");
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to update status.");
    }
  };

  const handleShippingUpdate = async (orderId: string) => {
    try {
      const response = await fetch(`/api/shipping/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingTracking),
      });

      if (!response.ok) {
        throw new Error("Failed to update shipping information.");
      }

      // 주문 목록 새로고침
      const url = isAdmin
        ? `/api/orders/all?status=${statusFilter}`
        : "/api/orders/me";
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setOrders(data.orders);
      }

      setEditingOrderId(null);
      setEditingTracking({
        trackingNumber: "",
        carrier: "",
        shippedAt: "",
        deliveredAt: "",
      });
    } catch (err) {
      alert(
        err instanceof Error ? err.message : "Failed to update shipping info.",
      );
    }
  };

  const startEditing = (order: Order) => {
    setEditingOrderId(order.id);
    setEditingStatus(order.status);
    if (order.shipping) {
      setEditingTracking({
        trackingNumber: order.shipping.trackingNumber || "",
        carrier: order.shipping.carrier || "",
        shippedAt: order.shipping.shippedAt
          ? new Date(order.shipping.shippedAt).toISOString().split("T")[0]
          : "",
        deliveredAt: order.shipping.deliveredAt
          ? new Date(order.shipping.deliveredAt).toISOString().split("T")[0]
          : "",
      });
    }
  };

  const cancelEditing = () => {
    setEditingOrderId(null);
    setEditingStatus("");
    setEditingTracking({
      trackingNumber: "",
      carrier: "",
      shippedAt: "",
      deliveredAt: "",
    });
  };

  if (isLoading) {
    return <Loading withContainer />;
  }

  if (!isLoading && !user) {
    return null;
  }

  return (
    <Container className="bg-white py-5">
      <div className="mx-auto flex w-full max-w-xl flex-col lg:max-w-7xl">
        {error && (
          <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-800 lg:p-5">
            {error}
          </div>
        )}

        {/* Admin 필터링 */}
        {isAdmin && (
          <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <h1 className="text-2xl font-bold">All Orders ({orders.length})</h1>
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Filter by Status:</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-[#10B981] focus:outline-none"
              >
                <option value="all">All</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="shipping">Shipping</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        )}

        {!isAdmin && (
          <h1 className="mb-4 hidden text-2xl font-bold lg:block">
            My Orders ({orders.length})
          </h1>
        )}

        {orders.length === 0 ? (
          <p className="w-full text-center text-gray-600">No order history.</p>
        ) : (
          <div className="flex w-full flex-col gap-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="flex flex-col overflow-hidden rounded-lg border shadow-sm"
              >
                {/* order info */}
                <div className="flex justify-between border-b bg-[#F8FAFC] p-4 lg:p-5">
                  <div className="flex flex-col gap-[2px]">
                    <span className="text-sm font-semibold">
                      Order ID #{order.id.slice(0, 8)}...
                    </span>
                    <span className="text-xs text-[#6B7280]">
                      {formatDate(order.createdAt, "date")}
                    </span>
                    {isAdmin && order.user && (
                      <span className="text-xs text-[#6B7280]">
                        User: {order.user.email}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {editingOrderId === order.id ? (
                      <select
                        value={editingStatus}
                        onChange={(e) => setEditingStatus(e.target.value)}
                        className="rounded-md border border-gray-300 px-2 py-1 text-sm"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="shipping">Shipping</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    ) : (
                      <StatusBadge status={order.status} />
                    )}
                    {isAdmin && (
                      <Button
                        size="xs"
                        variant="ghost"
                        onClick={() =>
                          editingOrderId === order.id
                            ? cancelEditing()
                            : startEditing(order)
                        }
                      >
                        {editingOrderId === order.id ? (
                          <X size={16} />
                        ) : (
                          <Edit2 size={16} />
                        )}
                      </Button>
                    )}
                  </div>
                </div>

                {/* product info */}
                <div className="flex flex-col gap-4 p-4 lg:flex-row lg:justify-between lg:p-5">
                  <div className="flex justify-between gap-3">
                    <div className="flex h-15 w-15 min-w-15 items-center justify-center overflow-hidden rounded-md border border-[#E5E7EB] bg-[#F9FAFB] p-2 lg:h-20 lg:w-20 lg:min-w-20">
                      <Image
                        src={order.productType === "pro" ? pro : titan}
                        alt="product"
                        className="!scale-150"
                      />
                    </div>
                    <div className="flex w-full flex-col items-start justify-center text-sm lg:gap-1">
                      <div className="font-semibold lg:text-lg">
                        {order.productType === "pro"
                          ? "AIRVENT PRO"
                          : "AIRVENT TITAN"}
                      </div>
                      <div className="text-[#6B7280]">
                        {order.color === "gray" ? "Space Gray" : "Rose Gold"} •
                        Qty: 1
                      </div>
                      <div className="flex items-center gap-1 text-xs text-[#6B7280]">
                        TxID:{" "}
                        {order.transactionId ? (
                          <a
                            href={`https://solscan.io/tx/${order.transactionId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-blue-600 underline hover:text-blue-800"
                          >
                            {order.transactionId.length > 16
                              ? `${order.transactionId.slice(0, 8)}...${order.transactionId.slice(-6)}`
                              : order.transactionId}
                            <SquareArrowOutUpRight size={12} />
                          </a>
                        ) : (
                          "Pending..."
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between lg:flex-col">
                    <span className="font-bold lg:text-xl">${order.price}</span>
                    <Button
                      variant={
                        order.status === "cancelled" ? "secondary" : "default"
                      }
                      disabled={order.status === "cancelled"}
                      onClick={() => router.push(`/dashboard/${order.id}`)}
                    >
                      Details
                    </Button>
                  </div>
                </div>

                {/* Admin 수정 폼 */}
                {isAdmin && editingOrderId === order.id && (
                  <div className="border-t bg-gray-50 p-4">
                    <div className="mb-4 font-semibold">
                      Shipping Information
                    </div>
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium">
                          Tracking Number
                        </label>
                        <Input
                          value={editingTracking.trackingNumber}
                          onChange={(e) =>
                            setEditingTracking({
                              ...editingTracking,
                              trackingNumber: e.target.value,
                            })
                          }
                          placeholder="Enter tracking number"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium">Carrier</label>
                        <Input
                          value={editingTracking.carrier}
                          onChange={(e) =>
                            setEditingTracking({
                              ...editingTracking,
                              carrier: e.target.value,
                            })
                          }
                          placeholder="e.g., FedEx, DHL, UPS"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium">
                          Shipped At
                        </label>
                        <Input
                          type="date"
                          value={editingTracking.shippedAt}
                          onChange={(e) =>
                            setEditingTracking({
                              ...editingTracking,
                              shippedAt: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium">
                          Delivered At
                        </label>
                        <Input
                          type="date"
                          value={editingTracking.deliveredAt}
                          onChange={(e) =>
                            setEditingTracking({
                              ...editingTracking,
                              deliveredAt: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button
                        onClick={() => {
                          handleStatusUpdate(order.id);
                          if (order.shipping) {
                            handleShippingUpdate(order.id);
                          }
                        }}
                        className="bg-[#10B981]"
                      >
                        <Save size={16} className="mr-2" />
                        Save Changes
                      </Button>
                      <Button variant="secondary" onClick={cancelEditing}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}

                {/* shipping info */}
                {order.shipping &&
                  (order.status === "shipping" ||
                    order.status === "delivered" ||
                    isAdmin) && (
                    <div className="p-4 pt-0 lg:p-5 lg:pt-0">
                      <div className="flex flex-col gap-2 rounded-lg bg-[#EFF6FF] p-3 text-[#1E40AF]">
                        <span className="flex items-center gap-1 text-xs font-semibold lg:text-sm">
                          <Truck size={12} /> Tracking Information
                        </span>
                        {order.shipping.trackingNumber && (
                          <span className="text-[11px] lg:text-xs">
                            Tracking: {order.shipping.trackingNumber}
                          </span>
                        )}
                        {order.shipping.carrier && (
                          <span className="text-[11px] lg:text-xs">
                            Carrier: {order.shipping.carrier}
                          </span>
                        )}
                        {order.shipping.shippedAt && (
                          <span className="text-[11px] lg:text-xs">
                            Shipped:{" "}
                            {formatDate(
                              order.shipping.shippedAt.toString(),
                              "date",
                            )}
                          </span>
                        )}
                        {order.shipping.deliveredAt && (
                          <span className="text-[11px] lg:text-xs">
                            Delivered:{" "}
                            {formatDate(
                              order.shipping.deliveredAt.toString(),
                              "date",
                            )}
                          </span>
                        )}
                        {!order.shipping.trackingNumber && (
                          <span className="text-[11px] lg:text-xs">
                            {isAdmin
                              ? "Click Edit to add tracking information"
                              : "Tracking information will be updated soon"}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
              </div>
            ))}
          </div>
        )}
      </div>
    </Container>
  );
};

export default Dashboard;
