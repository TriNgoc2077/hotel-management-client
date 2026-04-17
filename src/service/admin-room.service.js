import roomsMock from "../mocks/rooms.json";
import roomTypesMock from "../mocks/room_types.json";

let roomsData = [...roomsMock];

const getRoomType = (roomTypeId) => {
  return roomTypesMock.find((roomType) => roomType.id === roomTypeId);
};

const normalizeRoom = (room) => {
  const roomType = getRoomType(room.room_type_id);

  return {
    id: room.id,
    roomNumber: room.room_number,
    roomTypeId: room.room_type_id,
    roomType: roomType?.name || "Standard",
    price: String(roomType?.base_price || 0),
    capacity: String(roomType?.capacity || 1),
    status:
      room.status === "Vacant"
        ? "Available"
        : room.status === "Occupied"
        ? "Booked"
        : room.status === "Out_of_Order"
        ? "Maintenance"
        : room.status,
    createdAt: room.created_at,
  };
};

const mapStatusToMock = (status) => {
  if (status === "Available") return "Vacant";
  if (status === "Booked") return "Occupied";
  if (status === "Maintenance") return "Out_of_Order";
  return status;
};

const buildListResponse = (items) => ({
  statusCode: 200,
  message: "Get rooms successfully",
  data: {
    meta: {
      current: 1,
      limit: items.length,
      total: items.length,
    },
    result: items,
  },
});

const adminRoomService = {
  async getRooms() {
    const normalizedRooms = roomsData.map(normalizeRoom);

    return buildListResponse(normalizedRooms);
  },

  async createRoom(payload) {
    const nextRoom = {
      id: `room-${roomsData.length + 1}`,
      room_number: payload.roomNumber,
      room_type_id: payload.roomTypeId,
      status: mapStatusToMock(payload.status),
      created_at: new Date().toISOString(),
    };

    roomsData = [nextRoom, ...roomsData];

    return {
      statusCode: 201,
      message: "Create room successfully",
      data: {
        id: nextRoom.id,
      },
    };
  },

  async updateRoom(id, payload) {
    const matchedRoom = roomsData.find((room) => room.id === id);

    if (!matchedRoom) {
      throw new Error("Room not found");
    }

    roomsData = roomsData.map((room) =>
      room.id === id
        ? {
            ...room,
            room_number: payload.roomNumber,
            room_type_id: payload.roomTypeId,
            status: mapStatusToMock(payload.status),
          }
        : room
    );

    return {
      statusCode: 200,
      message: "Update room successfully",
      data: {
        id,
      },
    };
  },

  async deleteRoom(id) {
    const matchedRoom = roomsData.find((room) => room.id === id);

    if (!matchedRoom) {
      throw new Error("Room not found");
    }

    roomsData = roomsData.filter((room) => room.id !== id);

    return {
      statusCode: 200,
      message: "Delete room successfully",
      data: {
        id,
      },
    };
  },

  async getRoomTypes() {
    return {
      statusCode: 200,
      message: "Get room types successfully",
      data: roomTypesMock,
    };
  },
};

export default adminRoomService;
