import React, { useState } from 'react';
import { User, Plus, Search, Star, MapPin, Clock, DollarSign, Filter, Bell, Menu, X, CreditCard, Users, TrendingUp } from 'lucide-react';

const HostelMarketplace = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Iron 5 Shirts",
      description: "Need my formal shirts ironed for placement interviews this week",
      category: "Laundry",
      price: 50,
      duration: "30 mins",
      location: "Room 201, Block A",
      postedBy: "Rahul Kumar",
      postedTime: "2 hours ago",
      status: "open",
      rating: 4.8
    },
    {
      id: 2,
      title: "Help with Java Assignment",
      description: "Need help debugging my Java code for OOP assignment. Due tomorrow!",
      category: "Academic",
      price: 200,
      duration: "2 hours",
      location: "Library, 2nd Floor",
      postedBy: "Priya Sharma",
      postedTime: "4 hours ago",
      status: "open",
      rating: 4.9
    },
    {
      id: 3,
      title: "Cook Dinner for 2",
      description: "Make simple dal-chawal and sabzi for me and my roommate",
      category: "Cooking",
      price: 150,
      duration: "1 hour",
      location: "Common Kitchen, Block B",
      postedBy: "Amit Singh",
      postedTime: "1 hour ago",
      status: "open",
      rating: 4.7
    },
    {
      id: 4,
      title: "Rent Formal Shoes Size 9",
      description: "Need black formal shoes for interview tomorrow. Will return same day",
      category: "Rental",
      price: 100,
      duration: "1 day",
      location: "Block C, Room 305",
      postedBy: "Neha Patel",
      postedTime: "30 mins ago",
      status: "open",
      rating: 4.6
    }
  ]);

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    category: 'Laundry',
    price: '',
    duration: '',
    location: ''
  });

  const categories = ['All', 'Laundry', 'Academic', 'Cooking', 'Rental', 'Cleaning', 'Shopping', 'Other'];

  const LoginForm = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">TaskMate</h1>
          <p className="text-gray-600">Your Hostel Task Marketplace</p>
        </div>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input type="email" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="your.email@college.edu" />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input type="password" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="••••••••" />
          </div>
          
          <button 
            onClick={() => {
              setIsLoggedIn(true);
              setUser({ name: 'Demo User', hostel: 'Block A', room: '201' });
              setCurrentPage('home');
            }}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Login
          </button>
          
          <div className="text-center">
            <p className="text-gray-600">Don't have an account? <span className="text-blue-600 cursor-pointer hover:underline">Sign Up</span></p>
          </div>
        </div>
      </div>
    </div>
  );

  const Header = () => (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-600">TaskMate</h1>
            <span className="ml-2 text-sm text-gray-500">Hostel Marketplace</span>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <button 
              onClick={() => setCurrentPage('home')}
              className={`px-3 py-2 rounded-md text-sm font-medium ${currentPage === 'home' ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600'}`}
            >
              Browse Tasks
            </button>
            <button 
              onClick={() => setCurrentPage('post')}
              className={`px-3 py-2 rounded-md text-sm font-medium ${currentPage === 'post' ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600'}`}
            >
              Post Task
            </button>
            <button 
              onClick={() => setCurrentPage('my-tasks')}
              className={`px-3 py-2 rounded-md text-sm font-medium ${currentPage === 'my-tasks' ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600'}`}
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
              <span className="text-sm font-medium text-gray-700">{user?.name}</span>
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
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{task.title}</h3>
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
          <span>{task.rating}</span>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">
          <span>by {task.postedBy}</span>
          <span className="mx-2">•</span>
          <span>{task.postedTime}</span>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
          Accept Task
        </button>
      </div>
    </div>
  );

  const BrowseTasks = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Available Tasks</h2>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
            <input 
              type="text" 
              placeholder="Search tasks..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );

  const PostTask = () => (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Post a New Task</h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Task Title</label>
            <input 
              type="text"
              value={newTask.title}
              onChange={(e) => setNewTask({...newTask, title: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Iron 5 shirts for placement interviews"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea 
              value={newTask.description}
              onChange={(e) => setNewTask({...newTask, description: e.target.value})}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Provide details about what you need done..."
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select 
                value={newTask.category}
                onChange={(e) => setNewTask({...newTask, category: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.slice(1).map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹)</label>
              <input 
                type="number"
                value={newTask.price}
                onChange={(e) => setNewTask({...newTask, price: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="50"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
              <input 
                type="text"
                value={newTask.duration}
                onChange={(e) => setNewTask({...newTask, duration: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="30 mins"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input 
                type="text"
                value={newTask.location}
                onChange={(e) => setNewTask({...newTask, location: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Room 201, Block A"
              />
            </div>
          </div>
          
          <button 
            onClick={() => {
              if (newTask.title && newTask.description && newTask.price) {
                setTasks([...tasks, {
                  id: tasks.length + 1,
                  ...newTask,
                  price: parseInt(newTask.price),
                  postedBy: user.name,
                  postedTime: "Just now",
                  status: "open",
                  rating: 4.5
                }]);
                setNewTask({title: '', description: '', category: 'Laundry', price: '', duration: '', location: ''});
                setCurrentPage('home');
              }
            }}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Post Task
          </button>
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
            <h3 className="text-lg font-semibold text-gray-800">Tasks Posted</h3>
            <p className="text-2xl font-bold text-blue-600">3</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Tasks Completed</h3>
            <p className="text-2xl font-bold text-green-600">7</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Rating</h3>
            <p className="text-2xl font-bold text-yellow-600">4.8</p>
          </div>
        </div>
        
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-800">Iron 5 Shirts</p>
                <p className="text-sm text-gray-600">Completed by Raj Kumar</p>
              </div>
              <span className="text-green-600 font-medium">+₹50</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-800">Cook Dinner</p>
                <p className="text-sm text-gray-600">Completed for Priya</p>
              </div>
              <span className="text-green-600 font-medium">+₹150</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (!isLoggedIn) {
    return <LoginForm />;
  }

  return (
    <>
      
      <div className="min-h-screen bg-gray-50">
        <Header />

        {currentPage === "home" && <BrowseTasks />}
        {currentPage === "post" && <PostTask />}
        {currentPage === "my-tasks" && <MyTasks />}
      </div>
    </>
  );
};

export default HostelMarketplace;