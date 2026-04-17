import { startTransition, useEffect, useState } from "react";
import adminBookingService from "../../../service/admin-booking.service";

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingBooking, setDeletingBooking] = useState(null);
  const [editingBooking, setEditingBooking] = useState(null);

  const [newBooking, setNewBooking] = useState({
    customerName: "",
    roomNumber: "",
    services: [],
    checkInDate: "",
    checkOutDate: "",
    status: "Pending",
  });

  const loadBookings = async () => {
    const res = await adminBookingService.getBookings();
    return res.data.result;
  };

  const loadCustomers = async () => {
    const res = await adminBookingService.getCustomers();
    return res.data;
  };

  const loadRooms = async () => {
    const res = await adminBookingService.getRooms();
    return res.data;
  };

  const loadServices = async () => {
    const res = await adminBookingService.getServices();
    return res.data;
  };

  useEffect(() => {
    let isMounted = true;

    const loadInitialData = async () => {
      const [bookingsData, customersData, roomsData, servicesData] =
        await Promise.all([
          loadBookings(),
          loadCustomers(),
          loadRooms(),
          loadServices(),
        ]);

      if (!isMounted) return;

      startTransition(() => {
        setBookings(bookingsData);
        setCustomers(customersData);
        setRooms(roomsData);
        setServices(servicesData);
      });
    };

    loadInitialData();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredBookings = bookings.filter((booking) => {
    const keyword = searchTerm.toLowerCase();

    return (
      booking.customerName.toLowerCase().includes(keyword) ||
      booking.roomNumber.toLowerCase().includes(keyword) ||
      booking.status.toLowerCase().includes(keyword) ||
      booking.shortId.toLowerCase().includes(keyword)
    );
  });

  const handleBookingChange = (e) => {
    const { name, value } = e.target;

    setNewBooking((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditBookingChange = (e) => {
    const { name, value } = e.target;

    setEditingBooking((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleServiceToggle = (serviceName) => {
    setNewBooking((prev) => ({
      ...prev,
      services: prev.services.includes(serviceName)
        ? prev.services.filter((item) => item !== serviceName)
        : [...prev.services, serviceName],
    }));
  };

  const handleEditServiceToggle = (serviceName) => {
    setEditingBooking((prev) => ({
      ...prev,
      services: prev.services.includes(serviceName)
        ? prev.services.filter((item) => item !== serviceName)
        : [...prev.services, serviceName],
    }));
  };

  const handleAddBooking = async (e) => {
    e.preventDefault();

    await adminBookingService.createBooking(newBooking);
    const bookingsData = await loadBookings();
    setBookings(bookingsData);

    setNewBooking({
      customerName: "",
      roomNumber: "",
      services: [],
      checkInDate: "",
      checkOutDate: "",
      status: "Pending",
    });

    setIsAddModalOpen(false);
  };

  const handleUpdateBooking = async (e) => {
    e.preventDefault();

    if (!editingBooking) return;

    await adminBookingService.updateBooking(editingBooking.id, editingBooking);
    const bookingsData = await loadBookings();
    setBookings(bookingsData);

    setIsEditModalOpen(false);
    setEditingBooking(null);
  };

  const handleOpenDeleteModal = (booking) => {
    setDeletingBooking(booking);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteBooking = async () => {
    if (!deletingBooking) return;

    await adminBookingService.deleteBooking(deletingBooking.id);
    const bookingsData = await loadBookings();
    setBookings(bookingsData);

    setIsDeleteModalOpen(false);
    setDeletingBooking(null);
  };

  return (
    <div className="-mt-7 space-y-4 pt-1">
      <div>
        <h1 className="text-base font-semibold text-slate-800">
          Booking Management
        </h1>
        <p className="mt-0 text-xs text-slate-500">
          Manage hotel bookings in admin panel
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h2 className="text-lg font-semibold text-slate-800">Booking List</h2>

          <div className="flex flex-col gap-3 md:flex-row">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by booking, customer, room or status"
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-700 outline-none focus:border-amber-500"
            />

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="rounded-lg bg-amber-600 px-4 py-2 text-white hover:bg-amber-700"
            >
              Add Booking
            </button>
          </div>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-left">
                <th className="px-4 py-3 text-sm font-semibold text-slate-600">
                  Booking Code
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-slate-600">
                  Customer
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-slate-600">
                  Room
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-slate-600">
                  Services
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-slate-600">
                  Check In
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-slate-600">
                  Check Out
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-slate-600">
                  Status
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-slate-600">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredBookings.length > 0 ? (
                filteredBookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-slate-100">
                    <td className="px-4 py-3 text-sm text-slate-700">
                      {booking.shortId}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-700">
                      {booking.customerName}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-700">
                      {booking.roomNumber}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-700">
                      {booking.services.length > 0
                        ? booking.services.join(", ")
                        : "No service"}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-700">
                      {booking.checkInDate}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-700">
                      {booking.checkOutDate}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          booking.status === "Confirmed"
                            ? "bg-emerald-100 text-emerald-700"
                            : booking.status === "Pending"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditingBooking(booking);
                            setIsEditModalOpen(true);
                          }}
                          className="rounded-lg bg-blue-100 px-3 py-1 text-blue-700 hover:bg-blue-200"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleOpenDeleteModal(booking)}
                          className="rounded-lg bg-slate-200 px-3 py-1 text-slate-700 hover:bg-slate-300"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="px-4 py-6 text-center text-sm text-slate-500"
                  >
                    No bookings found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-800">Add Booking</h2>

              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="rounded-lg px-3 py-1 text-slate-500 hover:bg-slate-100"
              >
                X
              </button>
            </div>

            <form onSubmit={handleAddBooking} className="mt-6 space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Customer
                </label>
                <select
                  name="customerName"
                  value={newBooking.customerName}
                  onChange={handleBookingChange}
                  required
                  className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-amber-500"
                >
                  <option value="">Select customer</option>
                  {customers.map((customer) => (
                    <option key={customer.id} value={customer.fullName}>
                      {customer.fullName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Room
                </label>
                <select
                  name="roomNumber"
                  value={newBooking.roomNumber}
                  onChange={handleBookingChange}
                  required
                  className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-amber-500"
                >
                  <option value="">Select room</option>
                  {rooms.map((room) => (
                    <option key={room.id} value={room.roomNumber}>
                      {room.roomNumber}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Services
                </label>
                <div className="grid gap-2 md:grid-cols-2">
                  {services.map((service) => (
                    <label
                      key={service.id}
                      className="flex items-center gap-2 rounded-lg border border-slate-200 p-3"
                    >
                      <input
                        type="checkbox"
                        checked={newBooking.services.includes(
                          service.serviceName
                        )}
                        onChange={() =>
                          handleServiceToggle(service.serviceName)
                        }
                      />
                      <span className="text-sm text-slate-700">
                        {service.serviceName}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Check In Date
                  </label>
                  <input
                    type="date"
                    name="checkInDate"
                    value={newBooking.checkInDate}
                    onChange={handleBookingChange}
                    required
                    className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Check Out Date
                  </label>
                  <input
                    type="date"
                    name="checkOutDate"
                    value={newBooking.checkOutDate}
                    onChange={handleBookingChange}
                    required
                    className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Status
                </label>
                <select
                  name="status"
                  value={newBooking.status}
                  onChange={handleBookingChange}
                  className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-amber-500"
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-slate-700 hover:bg-slate-100"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-lg bg-amber-600 px-4 py-2 text-white hover:bg-amber-700"
                >
                  Save Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isEditModalOpen && editingBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-800">
                Edit Booking
              </h2>

              <button
                type="button"
                onClick={() => {
                  setIsEditModalOpen(false);
                  setEditingBooking(null);
                }}
                className="rounded-lg px-3 py-1 text-slate-500 hover:bg-slate-100"
              >
                X
              </button>
            </div>

            <form onSubmit={handleUpdateBooking} className="mt-6 space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Customer
                </label>
                <select
                  name="customerName"
                  value={editingBooking.customerName}
                  onChange={handleEditBookingChange}
                  required
                  className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-amber-500"
                >
                  <option value="">Select customer</option>
                  {customers.map((customer) => (
                    <option key={customer.id} value={customer.fullName}>
                      {customer.fullName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Room
                </label>
                <select
                  name="roomNumber"
                  value={editingBooking.roomNumber}
                  onChange={handleEditBookingChange}
                  required
                  className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-amber-500"
                >
                  <option value="">Select room</option>
                  {rooms.map((room) => (
                    <option key={room.id} value={room.roomNumber}>
                      {room.roomNumber}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Services
                </label>
                <div className="grid gap-2 md:grid-cols-2">
                  {services.map((service) => (
                    <label
                      key={service.id}
                      className="flex items-center gap-2 rounded-lg border border-slate-200 p-3"
                    >
                      <input
                        type="checkbox"
                        checked={editingBooking.services.includes(
                          service.serviceName
                        )}
                        onChange={() =>
                          handleEditServiceToggle(service.serviceName)
                        }
                      />
                      <span className="text-sm text-slate-700">
                        {service.serviceName}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Check In Date
                  </label>
                  <input
                    type="date"
                    name="checkInDate"
                    value={editingBooking.checkInDate}
                    onChange={handleEditBookingChange}
                    required
                    className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Check Out Date
                  </label>
                  <input
                    type="date"
                    name="checkOutDate"
                    value={editingBooking.checkOutDate}
                    onChange={handleEditBookingChange}
                    required
                    className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Status
                </label>
                <select
                  name="status"
                  value={editingBooking.status}
                  onChange={handleEditBookingChange}
                  className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-amber-500"
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditModalOpen(false);
                    setEditingBooking(null);
                  }}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-slate-700 hover:bg-slate-100"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                  Update Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isDeleteModalOpen && deletingBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-2xl font-bold text-slate-800">
              Delete Booking
            </h2>

            <p className="mt-4 text-sm text-slate-600">
              Are you sure you want to delete booking{" "}
              <span className="font-semibold text-slate-800">
                {deletingBooking.shortId}
              </span>
              ?
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setDeletingBooking(null);
                }}
                className="rounded-lg border border-slate-300 px-4 py-2 text-slate-700 hover:bg-slate-100"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDeleteBooking}
                className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
