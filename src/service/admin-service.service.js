import servicesMock from "../mocks/services.json";

let servicesData = [...servicesMock];

const normalizeService = (service) => ({
  id: service.id,
  serviceName: service.name,
  description: service.description,
  price: String(service.price),
  status: service.status,
});

const buildListResponse = (items) => ({
  statusCode: 200,
  message: "Get services successfully",
  data: {
    meta: {
      current: 1,
      limit: items.length,
      total: items.length,
    },
    result: items,
  },
});

const adminServiceService = {
  async getServices() {
    return buildListResponse(servicesData.map(normalizeService));
  },

  async createService(payload) {
    const nextService = {
      id: `srv-${servicesData.length + 1}`,
      name: payload.serviceName,
      description: payload.description,
      price: Number(payload.price),
      status: payload.status,
    };

    servicesData = [nextService, ...servicesData];

    return {
      statusCode: 201,
      message: "Create service successfully",
      data: {
        id: nextService.id,
      },
    };
  },

  async updateService(id, payload) {
    const matchedService = servicesData.find((service) => service.id === id);

    if (!matchedService) {
      throw new Error("Service not found");
    }

    servicesData = servicesData.map((service) =>
      service.id === id
        ? {
            ...service,
            name: payload.serviceName,
            description: payload.description,
            price: Number(payload.price),
            status: payload.status,
          }
        : service
    );

    return {
      statusCode: 200,
      message: "Update service successfully",
      data: {
        id,
      },
    };
  },

  async deleteService(id) {
    const matchedService = servicesData.find((service) => service.id === id);

    if (!matchedService) {
      throw new Error("Service not found");
    }

    servicesData = servicesData.filter((service) => service.id !== id);

    return {
      statusCode: 200,
      message: "Delete service successfully",
      data: {
        id,
      },
    };
  },
};

export default adminServiceService;
