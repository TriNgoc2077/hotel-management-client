import { useEffect, useState } from "react";

export default function AdminServicesPage() {
  const STORAGE_KEY = "admin_services";

  const defaultServices = [
    {
      id: "SER001",
      serviceName: "Breakfast Buffet",
      category: "F&B",
      price: "150000",
      status: "Available",
    },
    {
      id: "SER002",
      serviceName: "Laundry",
      category: "Laundry",
      price: "80000",
      status: "Available",
    },
    {
      id: "SER003",
      serviceName: "Airport Pickup",
      category: "Transportation",
      price: "300000",
      status: "Unavailable",
    },
  ];

  const [services, setServices] = useState(() => {
    const savedServices = localStorage.getItem(STORAGE_KEY);
    return savedServices ? JSON.parse(savedServices) : defaultServices;
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [deletingService, setDeletingService] = useState(null);
  const [newService, setNewService] = useState({
    serviceName: "",
    category: "F&B",
    price: "",
    status: "Available",
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(services));
  }, [services]);

  const filteredServices = services.filter((service) => {
    const keyword = searchTerm.toLowerCase();

    return (
      service.serviceName.toLowerCase().includes(keyword) ||
      service.category.toLowerCase().includes(keyword) ||
      service.status.toLowerCase().includes(keyword)
    );
  });

  const handleNewServiceChange = (e) => {
    const { name, value } = e.target;

    setNewService((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddService = (e) => {
    e.preventDefault();

    const serviceId = `SER${String(services.length + 1).padStart(3, "0")}`;

    const serviceToAdd = {
      id: serviceId,
      ...newService,
    };

    setServices((prev) => [serviceToAdd, ...prev]);

    setNewService({
      serviceName: "",
      category: "F&B",
      price: "",
      status: "Available",
    });

    setIsAddModalOpen(false);
  };

  const handleOpenEditModal = (service) => {
    setEditingService(service);
    setIsEditModalOpen(true);
  };

  const handleEditServiceChange = (e) => {
    const { name, value } = e.target;

    setEditingService((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateService = (e) => {
    e.preventDefault();

    setServices((prev) =>
      prev.map((service) =>
        service.id === editingService.id ? editingService : service
      )
    );

    setIsEditModalOpen(false);
    setEditingService(null);
  };

  const handleOpenDeleteModal = (service) => {
    setDeletingService(service);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteService = () => {
    setServices((prev) =>
      prev.filter((service) => service.id !== deletingService.id)
    );

    setIsDeleteModalOpen(false);
    setDeletingService(null);
  };

  return (
    <div className="space-y-6 pt-12">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Service Management
        </h1>
        <p className="mt-2 text-slate-500">
          Manage hotel services in admin panel
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h2 className="text-xl font-semibold text-slate-800">Service List</h2>

          <div className="flex flex-col gap-3 md:flex-row">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by service, category or status"
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-700 outline-none focus:border-amber-500"
            />

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="rounded-lg bg-amber-600 px-4 py-2 text-white hover:bg-amber-700"
            >
              Add Service
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
                  Service Name
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-slate-600">
                  Category
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-slate-600">
                  Price
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
              {filteredServices.length > 0 ? (
                filteredServices.map((service) => (
                  <tr key={service.id} className="border-b border-slate-100">
                    <td className="px-4 py-3 text-sm text-slate-700">
                      {service.id}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-700">
                      {service.serviceName}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-700">
                      {service.category}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-700">
                      {service.price}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          service.status === "Available"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {service.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleOpenEditModal(service)}
                          className="rounded-lg bg-blue-100 px-3 py-1 text-blue-700 hover:bg-blue-200"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleOpenDeleteModal(service)}
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
                    colSpan="6"
                    className="px-4 py-6 text-center text-sm text-slate-500"
                  >
                    No services found
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
              <h2 className="text-2xl font-bold text-slate-800">Add Service</h2>

              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="rounded-lg px-3 py-1 text-slate-500 hover:bg-slate-100"
              >
                X
              </button>
            </div>

            <form onSubmit={handleAddService} className="mt-6 space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Service Name
                </label>
                <input
                  type="text"
                  name="serviceName"
                  value={newService.serviceName}
                  onChange={handleNewServiceChange}
                  required
                  className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Category
                  </label>
                  <select
                    name="category"
                    value={newService.category}
                    onChange={handleNewServiceChange}
                    className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-amber-500"
                  >
                    <option value="F&B">F&B</option>
                    <option value="Laundry">Laundry</option>
                    <option value="Spa">Spa</option>
                    <option value="Transportation">Transportation</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Status
                  </label>
                  <select
                    name="status"
                    value={newService.status}
                    onChange={handleNewServiceChange}
                    className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-amber-500"
                  >
                    <option value="Available">Available</option>
                    <option value="Unavailable">Unavailable</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Price
                </label>
                <input
                  type="text"
                  name="price"
                  value={newService.price}
                  onChange={handleNewServiceChange}
                  required
                  className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-amber-500"
                />
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
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isEditModalOpen && editingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-800">
                Edit Service
              </h2>

              <button
                type="button"
                onClick={() => {
                  setIsEditModalOpen(false);
                  setEditingService(null);
                }}
                className="rounded-lg px-3 py-1 text-slate-500 hover:bg-slate-100"
              >
                X
              </button>
            </div>

            <form onSubmit={handleUpdateService} className="mt-6 space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Service Name
                </label>
                <input
                  type="text"
                  name="serviceName"
                  value={editingService.serviceName}
                  onChange={handleEditServiceChange}
                  required
                  className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Category
                  </label>
                  <select
                    name="category"
                    value={editingService.category}
                    onChange={handleEditServiceChange}
                    className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-amber-500"
                  >
                    <option value="F&B">F&B</option>
                    <option value="Laundry">Laundry</option>
                    <option value="Spa">Spa</option>
                    <option value="Transportation">Transportation</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Status
                  </label>
                  <select
                    name="status"
                    value={editingService.status}
                    onChange={handleEditServiceChange}
                    className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-amber-500"
                  >
                    <option value="Available">Available</option>
                    <option value="Unavailable">Unavailable</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Price
                </label>
                <input
                  type="text"
                  name="price"
                  value={editingService.price}
                  onChange={handleEditServiceChange}
                  required
                  className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditModalOpen(false);
                    setEditingService(null);
                  }}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-slate-700 hover:bg-slate-100"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                  Update Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isDeleteModalOpen && deletingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-2xl font-bold text-slate-800">
              Delete Service
            </h2>

            <p className="mt-4 text-sm text-slate-600">
              Are you sure you want to delete service{" "}
              <span className="font-semibold text-slate-800">
                {deletingService.serviceName}
              </span>
              ?
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setDeletingService(null);
                }}
                className="rounded-lg border border-slate-300 px-4 py-2 text-slate-700 hover:bg-slate-100"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDeleteService}
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
