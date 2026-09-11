import React, { useState } from 'react';

// Sub-Component 1: Single Task Item with Date & Time Display
function TaskItem({ task, onToggleComplete, onDeleteTask }) {
  return (
    <li style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px',
      marginBottom: '8px',
      borderRadius: '8px',
      backgroundColor: task.completed ? '#0f172a' : '#1e293b',
      border: '1px solid #334155',
      opacity: task.completed ? 0.6 : 1,
      transition: '0.2s'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <input 
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleComplete(task.id)}
          style={{ cursor: 'pointer', width: '16px', height: '16px' }}
        />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ 
            fontSize: '14px', 
            color: '#f8fafc',
            textDecoration: task.completed ? 'line-through' : 'none' 
          }}>
            {task.text}
          </span>
          {/* Display Created Date & Time */}
          <span style={{ fontSize: '10px', color: '#64748b', marginTop: '2px' }}>
            📅 {task.createdAt}
          </span>
        </div>
      </div>

      <button 
        onClick={() => onDeleteTask(task.id)}
        style={{
          backgroundColor: 'transparent',
          color: '#f87171',
          border: '1px solid #7f1d1d',
          padding: '4px 8px',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '12px'
        }}
      >
        Delete
      </button>
    </li>
  );
}

// Sub-Component 2: Task List Wrapper
function TaskList({ tasks, onToggleComplete, onDeleteTask }) {
  if (tasks.length === 0) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '24px 0',
        color: '#64748b',
        fontSize: '14px',
        backgroundColor: '#0f172a',
        borderRadius: '8px',
        border: '1px dashed #334155'
      }}>
        No tasks available. Add one above to get started!
      </div>
    );
  }

  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      {tasks.map((task) => (
        <TaskItem 
          key={task.id} 
          task={task} 
          onToggleComplete={onToggleComplete}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </ul>
  );
}

// Sub-Component 3: Task Input Form
function TaskForm({ onAddTask }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    
    onAddTask(text.trim());
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
      <input 
        type="text" 
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task..."
        style={{
          flex: 1,
          backgroundColor: '#0f172a',
          border: '1px solid #334155',
          borderRadius: '8px',
          padding: '10px 12px',
          color: '#ffffff',
          fontSize: '14px',
          outline: 'none'
        }}
      />
      <button 
        type="submit"
        style={{
          backgroundColor: '#4f46e5',
          color: '#ffffff',
          border: 'none',
          borderRadius: '8px',
          padding: '10px 16px',
          fontWeight: 'bold',
          cursor: 'pointer',
          fontSize: '14px'
        }}
      >
        Add Task
      </button>
    </form>
  );
}

// Main Parent Component
function App() {
  const [tasks, setTasks] = useState([
    { 
      id: 1, 
      text: 'Complete React Setup with Vite', 
      completed: true, 
      createdAt: 'Sep 11, 2026, 10:30 AM' 
    },
    { 
      id: 2, 
      text: 'Build Task Tracker App Components', 
      completed: false, 
      createdAt: 'Sep 11, 2026, 11:15 AM' 
    },
  ]);

  // Function to capture current date and time
  const handleAddTask = (text) => {
    const now = new Date();
    const formattedDateTime = now.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });

    const newTask = {
      id: Date.now(),
      text: text,
      completed: false,
      createdAt: formattedDateTime, // Adds exact creation date and time
    };

    setTasks([...tasks, newTask]);
  };

  const handleToggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#020617',
      color: '#f8fafc',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Segoe UI, Roboto, sans-serif',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: '#0f172a',
        border: '1px solid #1e293b',
        borderRadius: '16px',
        padding: '24px',
        maxWidth: '420px',
        width: '100%',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)'
      }}>
        
        {/* Header */}
        <div style={{ marginBottom: '20px' }}>
          <span style={{
            fontSize: '10px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: '#818cf8',
            backgroundColor: '#1e1b4b',
            border: '1px solid #3730a3',
            padding: '4px 10px',
            borderRadius: '20px'
          }}>
            Day 7 • Mini Project
          </span>
          <h1 style={{ fontSize: '22px', fontWeight: 'bold', marginTop: '12px', marginBottom: '2px' }}>
            Task Tracker App
          </h1>
          <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>
            ZoyaSofts Internship — Week 2 Final Project
          </p>
        </div>

        {/* Form Component */}
        <TaskForm onAddTask={handleAddTask} />

        {/* List Component */}
        <TaskList 
          tasks={tasks} 
          onToggleComplete={handleToggleComplete} 
          onDeleteTask={handleDeleteTask} 
        />

        {/* Footer Metrics */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '20px',
          paddingTop: '12px',
          borderTop: '1px solid #1e293b',
          fontSize: '12px',
          color: '#94a3b8'
        }}>
          <span>Total Tasks: <strong style={{ color: '#f8fafc' }}>{tasks.length}</strong></span>
          <span>Completed: <strong style={{ color: '#818cf8' }}>{completedCount}</strong> / {tasks.length}</span>
        </div>

      </div>
    </div>
  );
}

export default App;