import roomsMock from "../mocks/rooms.json";
import roomTypesMock from "../mocks/room_types.json";

const normalizeRoom = (room) => {
  const roomType = roomTypesMock.find((item) => item.id === room.room_type_id);

  return {
    id: room.id,
    roomNumber: room.room_number || "N/A",
    name:
      room.name ||
      `${roomType?.name || "Room"} ${room.room_number || ""}`.trim(),
    description:
      room.description || roomType?.description || "Room description",
    image:
      room.image ||
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80",
    price: Number(room.price || room.base_price || roomType?.base_price || 0),
    capacity: Number(room.capacity || roomType?.capacity || 2),
    type: roomType?.name || "Standard",
    status: String(room.status || "available").toLowerCase(),
    amenities: room.amenities || ["Wifi", "Breakfast"],
  };
};

const roomService = {
  async getRooms(filters = {}) {
    let rooms = roomsMock.map(normalizeRoom);

    if (filters.keyword) {
      const keyword = filters.keyword.toLowerCase();
      rooms = rooms.filter((room) =>
        `${room.name} ${room.type} ${room.roomNumber}`
          .toLowerCase()
          .includes(keyword)
      );
    }

    if (filters.checkInDate && filters.checkOutDate) {
      rooms = rooms.filter((room) => room.status === "available");
    }

    return rooms;
  },

  async getRoomById(id) {
    const room = roomsMock.find((item) => String(item.id) === String(id));
    return room ? normalizeRoom(room) : null;
  },
};

export default roomService;
