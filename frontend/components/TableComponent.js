import React, { useState } from "react";
import styles from "../styles/Table.module.css";

const TableComponent = ({ data, onUpdate, onDelete, onAdd }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [newRow, setNewRow] = useState({ name: "", dob: "" });
  const [error, setError] = useState("");

  const handleEditClick = (row) => {
    setSelectedRow(row);
    setError("");
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (id) => {
    onDelete(id);
  };

  const handleSaveEdit = () => {
    if (!selectedRow.name || !selectedRow.dob) {
      setError("Both fields are required!");
      return;
    }
    onUpdate(selectedRow);
    setIsEditModalOpen(false);
    setSelectedRow(null);
  };

  const handleAddRow = () => {
    if (!newRow.name || !newRow.dob) {
      setError("Both fields are required!");
      return;
    }
    onAdd(newRow);
    setIsAddModalOpen(false);
    setNewRow({ name: "", dob: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedRow((prev) => ({ ...prev, [name]: value }));
  };

  const handleNewRowChange = (e) => {
    const { name, value } = e.target;
    setNewRow((prev) => ({ ...prev, [name]: value }));
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  return (
    <div>
      <button
        className={styles.addButton}
        onClick={() => {
          setIsAddModalOpen(true);
          setError("");
        }}
      >
        Add Member
      </button>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date of Birth</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td>{row.name}</td>
              <td>{row.dob}</td>
              <td>{calculateAge(row.dob)}</td>
              <td style={{ paddingRight: "0" }}>
                <div className={styles.actions}>
                  <button
                    className={styles.editButton}
                    onClick={() => handleEditClick(row)}
                  >
                    Edit
                  </button>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDeleteClick(row.id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Edit Member</h2>
            {error && <p className={styles.error}>{error}</p>}
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={selectedRow?.name || ""}
                onChange={handleChange}
              />
            </label>
            <label>
              Date of Birth:
              <input
                type="date"
                name="dob"
                value={selectedRow?.dob || ""}
                onChange={handleChange}
              />
            </label>
            <div className={styles.modalActions}>
              <button className={styles.saveButton} onClick={handleSaveEdit}>
                Save
              </button>
              <button
                className={styles.cancelButton}
                onClick={() => setIsEditModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Add Member</h2>
            {error && <p className={styles.error}>{error}</p>}
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={newRow.name}
                onChange={handleNewRowChange}
              />
            </label>
            <label>
              Date of Birth:
              <input
                type="date"
                name="dob"
                value={newRow.dob}
                onChange={handleNewRowChange}
              />
            </label>
            <div className={styles.modalActions}>
              <button className={styles.saveButton} onClick={handleAddRow}>
                Add
              </button>
              <button
                className={styles.cancelButton}
                onClick={() => setIsAddModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableComponent;
