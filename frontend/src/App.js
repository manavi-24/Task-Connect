import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";
import {
  User,
  Search,
  Star,
  MapPin,
  Clock,
  DollarSign,
  Bell,
  Users,
  TrendingUp,
} from "lucide-react";

const API = "http://localhost:5000/api"; // Change to your backend base path if needed

function AuthForm({ setUser, setToken, setIsLoggedIn }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    hostel: "",
    room: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url =
        mode === "register" ? `${API}/auth/register` : `${API}/auth/login`;
      const { data } = await axios.post(url, form);
      setUser(data.user);
      setToken(data.token);
      setIsLoggedIn(true);
      localStorage.setItem("token", data.token);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <form
        className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">TaskMate</h1>
          <p className="text-gray-600">Your Hostel Task Marketplace</p>
        </div>
        <div className="space-y-6">
          {mode === "register" && (
            <>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full px-4 py-3 border rounded-lg"
                required
              />
              <input
                name="hostel"
                value={form.hostel}
                onChange={handleChange}
                placeholder="Hostel"
                className="w-full px-4 py-3 border rounded-lg"
              />
              <input
                name="room"
                value={form.room}
                onChange={handleChange}
                placeholder="Room"
                className="w-full px-4 py-3 border rounded-lg"
              />
            </>
          )}
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full px-4 py-3 border rounded-lg"
            required
          />
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full px-4 py-3 border rounded-lg"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            {mode === "register" ? "Register" : "Login"}
          </button>
          <button
            type="button"
            onClick={() => setMode(mode === "login" ? "register" : "login")}
            className="w-full text-blue-600 underline"
          >
            Switch to {mode === "login" ? "Register" : "Login"}
          </button>
          {error && <div className="text-red-600">{error}</div>}
        </div>
      </form>
    </div>
  );
}

const HostelMarketplace = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    category: "Laundry",
    price: "",
    duration: "",
    location: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const categories = [
    "All",
    "Laundry",
    "Academic",
    "Cooking",
    "Rental",
    "Cleaning",
    "Shopping",
    "Other",
  ];

  // Set axios default header for auth
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  // Fetch tasks from backend
  useEffect(() => {
    if (isLoggedIn) {
      (async () => {
        setLoading(true);
        try {
          const { data } = await axios.get(`${API}/tasks`);
          setTasks(data);
        } catch (err) {
          setError(err.response?.data?.message || "Failed to fetch tasks");
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [isLoggedIn]);

  // Post a new task to backend
  const handlePostTask = async () => {
    if (!newTask.title || !newTask.description || !newTask.price) {
      setError("Fill all required fields");
      return;
    }
    setLoading(true);
    try {
      const { data } = await axios.post(`${API}/tasks/post`, {
        ...newTask,
        price: Number(newTask.price), // Ensure price is a number
      });
      setTasks([...tasks, data.task]);
      setNewTask({
        title: "",
        description: "",
        category: "Laundry",
        price: "",
        duration: "",
        location: "",
      });
      setCurrentPage("home");
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to post task");
    } finally {
      setLoading(false);
    }
  };

  // Accept task
  const handleAcceptTask = async (taskId) => {
    setLoading(true);
    try {
      const { data } = await axios.patch(`${API}/tasks/accept/${taskId}`);
      // Refetch all tasks so acceptedBy is always populated
      const refreshed = await axios.get(`${API}/tasks`);
      setTasks(refreshed.data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to accept task");
    } finally {
      setLoading(false);
    }
  };

  // FIX: Use a stable handleInputChange for Post Task form (do NOT re-create function inside render)
  const handleInputChange = React.useCallback((e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  // Filter tasks for "My Tasks"
  const userId = user?._id || user?.id;
  const myPostedTasks = tasks.filter(
    (task) => String(task.postedBy?._id) === String(userId)
  );
  const myAcceptedTasks = tasks.filter(
    (task) =>
      task.acceptedBy &&
      (String(task.acceptedBy._id) === String(userId) ||
        String(task.acceptedBy) === String(userId))
  );

  const Header = () => (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-600">TaskMate</h1>
            <span className="ml-2 text-sm text-gray-500">
              Hostel Marketplace
            </span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <button
              onClick={() => setCurrentPage("home")}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                currentPage === "home"
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              Browse Tasks
            </button>
            <button
              onClick={() => setCurrentPage("post")}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                currentPage === "post"
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              Post Task
            </button>
            <button
              onClick={() => setCurrentPage("my-tasks")}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                currentPage === "my-tasks"
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              My Tasks
            </button>
          </nav>
          <div className="flex items-center space-x-4">
            <Bell className="w-6 h-6 text-gray-600 cursor-pointer hover:text-blue-600" />
            <div className="flex items-center space-x-2 cursor-pointer">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700">
                {user?.name}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );

  const TaskCard = ({ task }) => (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {task.title}
          </h3>
          <p className="text-gray-600 text-sm mb-3">{task.description}</p>
        </div>
        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
          {task.category}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
        <div className="flex items-center">
          <DollarSign className="w-4 h-4 mr-1" />
          <span className="font-medium text-green-600">₹{task.price}</span>
        </div>
        <div className="flex items-center">
          <Clock className="w-4 h-4 mr-1" />
          <span>{task.duration}</span>
        </div>
        <div className="flex items-center">
          <MapPin className="w-4 h-4 mr-1" />
          <span>{task.location}</span>
        </div>
        <div className="flex items-center">
          <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
          <span>{task.rating || 4.5}</span>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">
          <span>by {task.postedBy?.name || "unknown"}</span>
          <span className="mx-2">•</span>
          <span>{new Date(task.createdAt).toLocaleString()}</span>
        </div>
        {task.status === "open" && String(task.postedBy?._id) !== String(userId) && (
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            onClick={() => handleAcceptTask(task._id)}
            disabled={loading}
          >
            Accept Task
          </button>
        )}
        {task.status === "accepted" &&
          task.acceptedBy &&
          (String(task.acceptedBy._id) === String(userId) ||
            String(task.acceptedBy) === String(userId)) && (
            <span className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium">
              Accepted
            </span>
          )}
      </div>
    </div>
  );

  const BrowseTasks = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Available Tasks
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search tasks..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg">
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>
      {loading ? (
        <div>Loading tasks...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks
            .filter((t) => t.status === "open")
            .map((task) => (
              <TaskCard key={task._id} task={task} />
            ))}
        </div>
      )}
    </div>
  );

  const PostTask = () => (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Post a New Task
        </h2>
        <div className="space-y-6">
          <input
            name="title"
            value={newTask.title}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border rounded-lg"
            placeholder="Task Title"
          />
          <textarea
            name="description"
            value={newTask.description}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-4 py-3 border rounded-lg"
            placeholder="Description"
          />
          <select
            name="category"
            value={newTask.category}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border rounded-lg"
          >
            {categories.slice(1).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <input
            name="price"
            type="number"
            value={newTask.price}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border rounded-lg"
            placeholder="Price (₹)"
          />
          <input
            name="duration"
            type="text"
            value={newTask.duration}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border rounded-lg"
            placeholder="Duration"
          />
          <input
            name="location"
            type="text"
            value={newTask.location}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border rounded-lg"
            placeholder="Location"
          />
          <button
            onClick={handlePostTask}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            disabled={loading}
          >
            {loading ? "Posting..." : "Post Task"}
          </button>
          {error && <div className="text-red-600">{error}</div>}
        </div>
      </div>
    </div>
  );

  const MyTasks = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">My Tasks</h2>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">
              Tasks Posted
            </h3>
            <p className="text-2xl font-bold text-blue-600">
              {myPostedTasks.length}
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">
              Tasks Accepted
            </h3>
            <p className="text-2xl font-bold text-green-600">
              {myAcceptedTasks.length}
            </p>
          </div>
        </div>
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Posted Tasks
          </h3>
          <div className="space-y-4 mb-8">
            {myPostedTasks.map((task) => (
              <TaskCard key={task._id} task={task} />
            ))}
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Accepted Tasks
          </h3>
          <div className="space-y-4">
            {myAcceptedTasks.map((task) => (
              <TaskCard key={task._id} task={task} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  if (!isLoggedIn) {
    return (
      <AuthForm
        setUser={setUser}
        setToken={setToken}
        setIsLoggedIn={setIsLoggedIn}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {currentPage === "home" && <BrowseTasks />}
      {currentPage === "post" && <PostTask />}
      {currentPage === "my-tasks" && <MyTasks />}
    </div>
  );
};

export default HostelMarketplace;