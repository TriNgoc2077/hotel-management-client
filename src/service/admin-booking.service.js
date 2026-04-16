import bookingsMock from "../mocks/bookings.json";
import bookingRoomsMock from "../mocks/booking_rooms.json";
import bookingServicesMock from "../mocks/booking_services.json";
import usersMock from "../mocks/users.json";
import roomsMock from "../mocks/rooms.json";
import servicesMock from "../mocks/services.json";

let bookingsData = [...bookingsMock];
let bookingRoomsData = [...bookingRoomsMock];
let bookingServicesData = [...bookingServicesMock];

const getCustomerName = (customerId) => {
  const matchedUser = usersMock.find((user) => user.id === customerId);
  return matchedUser?.full_name || "Unknown Customer";
};

const getRoomNumber = (bookingId) => {
  const bookingRoom = bookingRoomsData.find(
    (item) => item.booking_id === bookingId
  );

  if (!bookingRoom) return "N/A";

  const room = roomsMock.find((item) => item.id === bookingRoom.room_id);
  return room?.room_number || "N/A";
};

const getServiceNames = (bookingId) => {
  const bookingServices = bookingServicesData.filter(
    (item) => item.booking_id === bookingId
  );

  return bookingServices.map((item) => {
    const service = servicesMock.find(
      (service) => service.id === item.service_id
    );
    return service?.name || "Unknown Service";
  });
};

const normalizeStatus = (status) => {
  if (status === "Checked-in") return "Confirmed";
  return status;
};

const normalizeBooking = (booking) => ({
  id: booking.id,
  shortId: booking.short_id,
  customerId: booking.customer_id,
  customerName: getCustomerName(booking.customer_id),
  roomNumber: getRoomNumber(booking.id),
  services: getServiceNames(booking.id),
  checkInDate: booking.check_in_date,
  checkOutDate: booking.check_out_date,
  status: normalizeStatus(booking.status),
});

const buildListResponse = (items) => ({
  statusCode: 200,
  message: "Get bookings successfully",
  data: {
    meta: {
      current: 1,
      limit: items.length,
      total: items.length,
    },
    result: items,
  },
});

const adminBookingService = {
  async getBookings() {
    return buildListResponse(bookingsData.map(normalizeBooking));
  },

  async getCustomers() {
    const customers = usersMock
      .filter((user) => user.role_id === "role-3")
      .map((user) => ({
        id: user.id,
        fullName: user.full_name,
      }));

    return {
      statusCode: 200,
      message: "Get customers successfully",
      data: customers,
    };
  },

  async getRooms() {
    const rooms = roomsMock.map((room) => ({
      id: room.id,
      roomNumber: room.room_number,
      status: room.status,
    }));

    return {
      statusCode: 200,
      message: "Get rooms successfully",
      data: rooms,
    };
  },

  async getServices() {
    return {
      statusCode: 200,
      message: "Get services successfully",
      data: servicesMock.map((service) => ({
        id: service.id,
        serviceName: service.name,
      })),
    };
  },

  async createBooking(payload) {
    const nextBookingId = `bk-${bookingsData.length + 1}`;
    const nextShortId = `BK10${String(bookingsData.length + 1).padStart(
      2,
      "0"
    )}`;

    const matchedCustomer = usersMock.find(
      (user) => user.full_name === payload.customerName
    );
    const matchedRoom = roomsMock.find(
      (room) => room.room_number === payload.roomNumber
    );

    const nextBooking = {
      id: nextBookingId,
      short_id: nextShortId,
      customer_id: matchedCustomer?.id || "user-3",
      staff_id: "user-2",
      check_in_date: payload.checkInDate,
      check_out_date: payload.checkOutDate,
      actual_check_in: null,
      actual_check_out: null,
      total_room_price: 0,
      total_service_price: 0,
      grand_total: 0,
      status: payload.status,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    bookingsData = [nextBooking, ...bookingsData];

    if (matchedRoom) {
      bookingRoomsData = [
        {
          id: `bkr-${bookingRoomsData.length + 1}`,
          booking_id: nextBookingId,
          room_id: matchedRoom.id,
          price_per_night: 0,
        },
        ...bookingRoomsData,
      ];
    }

    const selectedServices = servicesMock.filter((service) =>
      payload.services.includes(service.name)
    );

    const newBookingServices = selectedServices.map((service, index) => ({
      id: `bks-${bookingServicesData.length + index + 1}`,
      booking_id: nextBookingId,
      service_id: service.id,
      quantity: 1,
      price: service.price,
      used_at: new Date().toISOString(),
    }));

    bookingServicesData = [...newBookingServices, ...bookingServicesData];

    return {
      statusCode: 201,
      message: "Create booking successfully",
      data: {
        id: nextBookingId,
      },
    };
  },

  async updateBooking(id, payload) {
    const matchedBooking = bookingsData.find((booking) => booking.id === id);

    if (!matchedBooking) {
      throw new Error("Booking not found");
    }

    const matchedCustomer = usersMock.find(
      (user) => user.full_name === payload.customerName
    );
    const matchedRoom = roomsMock.find(
      (room) => room.room_number === payload.roomNumber
    );

    bookingsData = bookingsData.map((booking) =>
      booking.id === id
        ? {
            ...booking,
            customer_id: matchedCustomer?.id || booking.customer_id,
            check_in_date: payload.checkInDate,
            check_out_date: payload.checkOutDate,
            status: payload.status,
            updated_at: new Date().toISOString(),
          }
        : booking
    );

    if (matchedRoom) {
      bookingRoomsData = bookingRoomsData.map((item) =>
        item.booking_id === id
          ? {
              ...item,
              room_id: matchedRoom.id,
            }
          : item
      );
    }

    bookingServicesData = bookingServicesData.filter(
      (item) => item.booking_id !== id
    );

    const selectedServices = servicesMock.filter((service) =>
      payload.services.includes(service.name)
    );

    const newBookingServices = selectedServices.map((service, index) => ({
      id: `bks-${bookingServicesData.length + index + 1}`,
      booking_id: id,
      service_id: service.id,
      quantity: 1,
      price: service.price,
      used_at: new Date().toISOString(),
    }));

    bookingServicesData = [...newBookingServices, ...bookingServicesData];

    return {
      statusCode: 200,
      message: "Update booking successfully",
      data: {
        id,
      },
    };
  },

  async deleteBooking(id) {
    const matchedBooking = bookingsData.find((booking) => booking.id === id);

    if (!matchedBooking) {
      throw new Error("Booking not found");
    }

    bookingsData = bookingsData.filter((booking) => booking.id !== id);
    bookingRoomsData = bookingRoomsData.filter(
      (item) => item.booking_id !== id
    );
    bookingServicesData = bookingServicesData.filter(
      (item) => item.booking_id !== id
    );

    return {
      statusCode: 200,
      message: "Delete booking successfully",
      data: {
        id,
      },
    };
  },
};

export default adminBookingService;
