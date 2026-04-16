import { startTransition, useEffect, useState } from "react";
import adminRoomService from "../../../service/admin-room.service";

export default function AdminRoomsPage() {
  const [rooms, setRooms] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [deletingRoom, setDeletingRoom] = useState(null);
  const [newRoom, setNewRoom] = useState({
    roomNumber: "",
    roomTypeId: "rt-1",
    status: "Available",
  });

  const loadRooms = async () => {
    const res = await adminRoomService.getRooms();
    return res.data.result;
  };

  const loadRoomTypes = async () => {
    const res = await adminRoomService.getRoomTypes();
    return res.data;
  };

  useEffect(() => {
    let isMounted = true;

    const loadInitialData = async () => {
      const [roomsData, roomTypesData] = await Promise.all([
        loadRooms(),
        loadRoomTypes(),
      ]);

      if (!isMounted) return;

      startTransition(() => {
        setRooms(roomsData);
        setRoomTypes(roomTypesData);
      });
    };

    loadInitialData();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredRooms = rooms.filter((room) => {
    const keyword = searchTerm.toLowerCase();

    return (
      room.roomNumber.toLowerCase().includes(keyword) ||
      room.roomType.toLowerCase().includes(keyword) ||
      room.status.toLowerCase().includes(keyword)
    );
  });

  const handleNewRoomChange = (e) => {
    const { name, value } = e.target;

    setNewRoom((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditRoomChange = (e) => {
    const { name, value } = e.target;

    setEditingRoom((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddRoom = async (e) => {
    e.preventDefault();

    await adminRoomService.createRoom(newRoom);
    const roomsData = await loadRooms();
    setRooms(roomsData);

    setNewRoom({
      roomNumber: "",
      roomTypeId: "rt-1",
      status: "Available",
    });

    setIsAddModalOpen(false);
  };

  const handleUpdateRoom = async (e) => {
    e.preventDefault();

    if (!editingRoom) return;

    await adminRoomService.updateRoom(editingRoom.id, editingRoom);
    const roomsData = await loadRooms();
    setRooms(roomsData);

    setIsEditModalOpen(false);
    setEditingRoom(null);
  };

  const handleDeleteRoom = async () => {
    if (!deletingRoom) return;

    await adminRoomService.deleteRoom(deletingRoom.id);
    const roomsData = await loadRooms();
    setRooms(roomsData);

    setIsDeleteModalOpen(false);
    setDeletingRoom(null);
  };

  return (
    <div className="space-y-6 pt-12">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Room Management</h1>
        <p className="mt-2 text-slate-500">Manage hotel rooms in admin panel</p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h2 className="text-xl font-semibold text-slate-800">Room List</h2>

          <div className="flex flex-col gap-3 md:flex-row">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by room number, type or status"
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-700 outline-none focus:border-amber-500"
            />

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="rounded-lg bg-amber-600 px-4 py-2 text-white hover:bg-amber-700"
            >
              Add Room
            </button>
          </div>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-left">
                <th className="px-4 py-3 text-sm font-semibold text-slate-600">
                  ID
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-slate-600">
                  Room Number
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-slate-600">
                  Type
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-slate-600">
                  Price
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-slate-600">
                  Capacity
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
              {filteredRooms.length > 0 ? (
                filteredRooms.map((room) => (
                  <tr key={room.id} className="border-b border-slate-100">
                    <td className="px-4 py-3 text-sm text-slate-700">
                      {room.id}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-700">
                      {room.roomNumber}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-700">
                      {room.roomType}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-700">
                      {room.price}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-700">
                      {room.capacity}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          room.status === "Available"
                            ? "bg-emerald-100 text-emerald-700"
                            : room.status === "Booked"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {room.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditingRoom(room);
                            setIsEditModalOpen(true);
                          }}
                          className="rounded-lg bg-blue-100 px-3 py-1 text-blue-700 hover:bg-blue-200"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => {
                            setDeletingRoom(room);
                            setIsDeleteModalOpen(true);
                          }}
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
                    colSpan="7"
                    className="px-4 py-6 text-center text-sm text-slate-500"
                  >
                    No rooms found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-800">Add Room</h2>

              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="rounded-lg px-3 py-1 text-slate-500 hover:bg-slate-100"
              >
                X
              </button>
            </div>

            <form onSubmit={handleAddRoom} className="mt-6 space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Room Number
                </label>
                <input
                  type="text"
                  name="roomNumber"
                  value={newRoom.roomNumber}
                  onChange={handleNewRoomChange}
                  required
                  className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Room Type
                  </label>
                  <select
                    name="roomTypeId"
                    value={newRoom.roomTypeId}
                    onChange={handleNewRoomChange}
                    className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-amber-500"
                  >
                    {roomTypes.map((roomType) => (
                      <option key={roomType.id} value={roomType.id}>
                        {roomType.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Status
                  </label>
                  <select
                    name="status"
                    value={newRoom.status}
                    onChange={handleNewRoomChange}
                    className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-amber-500"
                  >
                    <option value="Available">Available</option>
                    <option value="Booked">Booked</option>
                    <option value="Maintenance">Maintenance</option>
                  </select>
                </div>
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
                  Save Room
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isEditModalOpen && editingRoom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-800">Edit Room</h2>

              <button
                type="button"
                onClick={() => {
                  setIsEditModalOpen(false);
                  setEditingRoom(null);
                }}
                className="rounded-lg px-3 py-1 text-slate-500 hover:bg-slate-100"
              >
                X
              </button>
            </div>

            <form onSubmit={handleUpdateRoom} className="mt-6 space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Room Number
                </label>
                <input
                  type="text"
                  name="roomNumber"
                  value={editingRoom.roomNumber}
                  onChange={handleEditRoomChange}
                  required
                  className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Room Type
                  </label>
                  <select
                    name="roomTypeId"
                    value={editingRoom.roomTypeId}
                    onChange={handleEditRoomChange}
                    className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-amber-500"
                  >
                    {roomTypes.map((roomType) => (
                      <option key={roomType.id} value={roomType.id}>
                        {roomType.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Status
                  </label>
                  <select
                    name="status"
                    value={editingRoom.status}
                    onChange={handleEditRoomChange}
                    className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-amber-500"
                  >
                    <option value="Available">Available</option>
                    <option value="Booked">Booked</option>
                    <option value="Maintenance">Maintenance</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditModalOpen(false);
                    setEditingRoom(null);
                  }}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-slate-700 hover:bg-slate-100"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                  Update Room
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isDeleteModalOpen && deletingRoom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-2xl font-bold text-slate-800">Delete Room</h2>

            <p className="mt-4 text-sm text-slate-600">
              Are you sure you want to delete room{" "}
              <span className="font-semibold text-slate-800">
                {deletingRoom.roomNumber}
              </span>
              ?
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setDeletingRoom(null);
                }}
                className="rounded-lg border border-slate-300 px-4 py-2 text-slate-700 hover:bg-slate-100"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDeleteRoom}
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
