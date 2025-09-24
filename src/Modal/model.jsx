import "./model.css";

const Model = ({
  formData,
  setFormData,
  setShowModal,
  handleAddUser,
  editTrue,
  handleEditUser,
}) => {
  const handleUser = () => {
    if (editTrue) {
      handleEditUser(formData);
    } else {
      handleAddUser(formData);
    }
    setShowModal(false);
    setFormData({ name: "", email: "", department: "" });
  };

  const handleClearForm = () => {
    setShowModal(false);
    setFormData({ name: "", email: "", department: "" });
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Add New User</h2>
        <input
          type="text"
          placeholder="Full Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="email"
          placeholder="Department"
          value={formData.department}
          onChange={(e) =>
            setFormData({ ...formData, department: e.target.value })
          }
        />
        <div className="modal-actions">
          <button onClick={handleClearForm} className="btn">
            Cancel
          </button>
          <button onClick={handleUser} className="btn primary">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
export default Model;
