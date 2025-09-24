import React from "react";
import "./filter.css";

const FilterPopup = ({
  isOpen,
  onClose,
  filters,
  setFilters,
  onApplyFilters,
}) => {
  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      name: "",
      email: "",
      department: "",
    });
  };

  const handleApply = () => {
    onApplyFilters(filters);
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <div className="popup-header">
          <h2>Filter Users</h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="filter-form">
          <div className="filter-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={filters.name}
              onChange={handleInputChange}
              placeholder="Filter by name..."
            />
          </div>

          <div className="filter-group">
            <label>Email</label>
            <input
              type="text"
              name="email"
              value={filters.email}
              onChange={handleInputChange}
              placeholder="Filter by email..."
            />
          </div>

          <div className="filter-group">
            <label>Department</label>
            <input
              type="text"
              name="department"
              value={filters.department}
              onChange={handleInputChange}
              placeholder="Filter by department..."
            />
          </div>
        </div>

        <div className="popup-actions">
          <button className="btn-clear" onClick={handleClearFilters}>
            Clear
          </button>
          <button className="btn-apply" onClick={handleApply}>
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterPopup;
