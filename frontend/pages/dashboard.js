import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import api from "../utils/api";
import TableComponent from "../components/TableComponent";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../styles/Dashboard.module.css";
import { Audio } from "react-loader-spinner";

export default function DashboardPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const router = useRouter();

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await api.get("/items");
      setData(response.data);
    } catch (error) {
      console.error("Failed to fetch data", error);
      toast.error("Failed to fetch data!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      router.push("/");
      return;
    }
    fetchData();
  }, [router]);

  const handleUpdate = async (updatedItem) => {
    setUpdating(true);
    try {
      await api.put(`/items/${updatedItem.id}`, updatedItem);
      toast.success("Item updated successfully!");
      await fetchData();
    } catch (error) {
      console.error("Failed to update item", error);
      toast.error("Failed to update item!");
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/items/${id}`);
      toast.success("Item deleted successfully!");
      await fetchData();
    } catch (error) {
      console.error("Failed to delete item", error);
      toast.error("Failed to delete item!");
    }
  };

  const handleAdd = async (newData) => {
    try {
      const response = await api.post("/items", newData);
      toast.success("Item added successfully!");
      await fetchData(); // Refetch data after add
    } catch (error) {
      console.error("Failed to add item:", error);
      toast.error("Failed to add item!");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    router.push("/");
  };

  if (loading)
    return (
      <div className={styles.center}>
        <Audio
          height="80"
          width="80"
          radius="9"
          // color="red"
          ariaLabel="loading"
          wrapperStyle
          wrapperClass={styles.loader}
        />
      </div>
    );

  return (
    <div className={styles.container}>
      <h1>Dashboard</h1>
      <ToastContainer />
      <TableComponent
        data={data}
        onAdd={handleAdd}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
      {updating && <div className={styles.spinner}>Updating...</div>}
      <button className={styles.logoutButton} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
