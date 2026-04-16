import { startTransition, useEffect, useState } from "react";
import adminServiceService from "../../../service/admin-service.service";

export default function AdminServicesPage() {
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [deletingService, setDeletingService] = useState(null);
  const [newService, setNewService] = useState({
    serviceName: "",
    description: "",
    price: "",
    status: "Active",
  });

  const loadServices = async () => {
    const res = await adminServiceService.getServices();
    return res.data.result;
  };

  useEffect(() => {
    let isMounted = true;

    const loadInitialData = async () => {
      const servicesData = await loadServices();

      if (!isMounted) return;

      startTransition(() => {
        setServices(servicesData);
      });
    };

    loadInitialData();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredServices = services.filter((service) => {
    const keyword = searchTerm.toLowerCase();

    return (
      service.serviceName.toLowerCase().includes(keyword) ||
      service.description.toLowerCase().includes(keyword) ||
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

  const handleEditServiceChange = (e) => {
    const { name, value } = e.target;

    setEditingService((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddService = async (e) => {
    e.preventDefault();

    await adminServiceService.createService(newService);
    const servicesData = await loadServices();
    setServices(servicesData);

    setNewService({
      serviceName: "",
      description: "",
      price: "",
      status: "Active",
    });

    setIsAddModalOpen(false);
  };

  const handleUpdateService = async (e) => {
    e.preventDefault();

    if (!editingService) return;

    await adminServiceService.updateService(editingService.id, editingService);
    const servicesData = await loadServices();
    setServices(servicesData);

    setIsEditModalOpen(false);
    setEditingService(null);
  };

  const handleDeleteService = async () => {
    if (!deletingService) return;

    await adminServiceService.deleteService(deletingService.id);
    const servicesData = await loadServices();
    setServices(servicesData);

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
              placeholder="Search by service, description or status"
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
                  Description
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
                      {service.description}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-700">
                      {service.price}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          service.status === "Active"
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
                          onClick={() => {
                            setEditingService(service);
                            setIsEditModalOpen(true);
                          }}
                          className="rounded-lg bg-blue-100 px-3 py-1 text-blue-700 hover:bg-blue-200"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => {
                            setDeletingService(service);
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

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Description
                </label>
                <input
                  type="text"
                  name="description"
                  value={newService.description}
                  onChange={handleNewServiceChange}
                  required
                  className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-amber-500"
                />
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
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
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

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Description
                </label>
                <input
                  type="text"
                  name="description"
                  value={editingService.description}
                  onChange={handleEditServiceChange}
                  required
                  className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-amber-500"
                />
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
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
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
