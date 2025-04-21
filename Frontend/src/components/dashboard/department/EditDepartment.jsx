import React, { useEffect , useState} from "react";
import { useParams , useNavigate} from "react-router-dom";
import axios from "axios";

const EditDepartment = () => {
  const { id } = useParams();
  console.log(id);
  const [department, setDepartment] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value });
  };

  useEffect(() => {
    const fetchDepartments = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/api/department/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          setDepartment(response.data.department);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          console.log(error.response);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchDepartments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/api/department/${id}`,
        department,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response)
      if (response.data.success) {
        navigate("/admin-dashboard/departments");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        console.log(error.response.data);
      }
    }
    // Add your API call here to submit the department data
  };

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="p-6 bg-white shadow-md rounded-2xl max-w-xl mx-auto">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-gray-800">
              Edit Department
            </h3>
          </div>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label
                htmlFor="departmentName"
                className="mb-1 text-gray-700 font-medium"
              >
                Department Name
              </label>
              <input
                type="text"
                id="departmentName"
                name="dep_name"
                placeholder="Enter Department Name"
                onChange={handleChange}
                value={department.dep_name}
                required
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="description"
                className="mb-1 text-gray-700 font-medium"
              >
                Description
              </label>
              <input
                type="text"
                id="description"
                name="description"
                placeholder="Enter Description"
                onChange={handleChange}
                value={department.description}
                required
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <button
              type="submit"
              className="mt-4 cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg transition"
            >
              Edit Department
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default EditDepartment;
