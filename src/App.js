import React, { useState } from 'react';
import logo from './assets/logo.png';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { clubsData, eventsData, registrationsData } from "./data";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { 
  Heart, ArrowRight, Calendar, MapPin, ShieldCheck, 
  Globe, User, LogOut, Award, Clock, BookOpen 
} from 'lucide-react';
import './App.css';

// ---- Navbar ----
const Navbar = ({ isLoggedIn, setLoggedIn, isAdmin, setIsAdmin, isCoordinator, setIsCoordinator }) => {
  const navigate = useNavigate();
  return (
    <nav className="navbar flex-between">
      <Link to="/" className="logo">
        <img src={logo} alt="NGO Connect Logo" className="nav-logo-img" />
      </Link>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/#impact">Impact</Link></li>
        <li><Link to="/events">Events</Link></li>
        {!isAdmin && !isCoordinator && !isLoggedIn && (
          <>
            <li><Link to="/admin">Admin</Link></li>
            <li><Link to="/coordinator">Coordinator</Link></li>
          </>
        )}
      </ul>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        {isAdmin ? (
          <>
            <Link to="/admin" className="btn">
              <User size={18} /> Dashboard
            </Link>
            <button className="btn btn-primary" onClick={() => { setIsAdmin(false); navigate("/"); }}>
              <LogOut size={18} /> Admin Logout
            </button>
          </>
        ) : isCoordinator ? (
          <>
            <Link to="/coordinator" className="btn">
              <User size={18} /> Dashboard
            </Link>
            <button className="btn btn-primary" onClick={() => { setIsCoordinator(false); navigate("/"); }}>
              <LogOut size={18} /> Coordinator Logout
            </button>
          </>
        ) : isLoggedIn ? (
          <>
            <Link to="/volunteer" className="btn">
              <User size={18} /> Dashboard
            </Link>
            <button className="btn btn-primary" onClick={() => { setLoggedIn(false); navigate("/"); }}>
              <LogOut size={16} /> Log Out
            </button>
          </>
        ) : (
          <Link to="/volunteer" className="btn btn-primary">Join Us</Link>
        )}
      </div>
    </nav>
  );
};

// ---- Home ----
const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#impact") {
  const section = document.getElementById("impact");
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
} else {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
  }, [location]);

  return (
    <main id="home" className="section hero">
      <div className="hero-text">
        <span style={{ color: 'var(--accent)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px' }}>
          Kindness is Powerful
        </span>
        <h1>Changing the world, one community at a time.</h1>
        <p>
          We connect passionate volunteers with local causes that need a helping hand. 
          From reforestation to education, find your purpose here.
        </p>
        <div style={{ display: 'flex', gap: '20px' }}>
          <Link to="/events" className="btn btn-primary">
            Explore Events <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      <img 
        src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80" 
        className="hero-img" 
        alt="Volunteers working together" 
      />
    </main>
  );
};
// ---- Features ----
const Features = () => (
  <section className="features-section">
    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
      <h2 style={{ fontSize: '2.5rem' }}>Why Join NGO Connect?</h2>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
      <div className="card">
        <Globe size={40} color="var(--accent)" />
        <h3>Global Reach</h3>
        <p>Support initiatives across the country or in your own backyard.</p>
      </div>
      <div className="card">
        <ShieldCheck size={40} color="var(--accent)" />
        <h3>Verified NGOs</h3>
        <p>Every organization on our platform is strictly vetted for transparency.</p>
      </div>
      <div className="card">
        <Heart size={40} color="var(--accent)" />
        <h3>Direct Impact</h3>
        <p>See exactly how your time and donations are changing lives.</p>
      </div>
    </div>
  </section>
);

// ---- Impact ----
function Impact() {
  const stats = [
    { label: "Trees Planted", value: "12,400+", icon: "🌳" },
    { label: "Meals Served", value: "50,000+", icon: "🍱" },
    { label: "Active Volunteers", value: "1,200+", icon: "🤝" }
  ];

  return (
    <section id="impact" className="impact-container">
      <div className="impact-header">
        <span className="subtitle">Our Results</span>
        <h2>Small Steps, Big Changes</h2>
        <p>Since 2020, NGO Connect has been a bridge between kindness and necessity. Here is what we have achieved together.</p>
      </div>
      <div className="stats-grid">
        {stats.map((item, index) => (
          <div key={index} className="stat-card">
            <span className="stat-icon">{item.icon}</span>
            <h3 className="stat-value">{item.value}</h3>
            <p className="stat-label">{item.label}</p>
          </div>
        ))}
      </div>
      <div className="impact-gallery">
        <img src="https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8" />
        <img src="https://images.unsplash.com/photo-1526976668912-1a811878dd37" />
        <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmdvfGVufDB8fDB8fHww" />
      </div>
      <div className="impact-story">
        <div className="story-text">
          <h3>"I found my purpose here."</h3>
          <p>
            - <strong>Sarah J., Volunteer</strong> <br />
            "Joining the Tree Plantation drive wasn't just about environment; 
            it was about meeting people who actually care. It changed my perspective on community."
          </p>
        </div>
      </div>
    </section>
  );
}

// ---- Events Page ----
function EventsPage({ events = [], clubs = [], isLoggedIn, registrations = [], setRegistrations, userName }) {
  const [selectedClub, setSelectedClub] = useState(null);

  if (!clubs || !events) return <div>Loading...</div>;

  return (
    <div className="events-container">
      <h2 className="events-title">VIT NGO Clubs</h2>
      {!selectedClub ? (
        <div className="events-grid">
          {clubs.map((club) => (
            <div key={club.name} className="event-card club-card" onClick={() => setSelectedClub(club.name)}>
              <div className="event-content">
                <h2 style={{ color: "#059669" }}>{club.name}</h2>
                <p className="club-description">{club.description}</p>
                <p className="club-view">Click to view events →</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <button className="btn btn-primary" onClick={() => setSelectedClub(null)}>
  ← Back to Clubs
</button>
          <h2 style={{ marginTop: "20px", color: "#059669" }}>{selectedClub} Events</h2>
          <div className="events-grid">
            {events
              .filter(event => event.club === selectedClub)
              .map((event) => (
                <div key={event.id} className="event-card">
                  <img src={event.image} alt={event.title} className="event-image" />
                  <div className="event-content">
                    <h3>{event.title}</h3>
                    <p><strong>Date:</strong> {event.date}</p>
                    <p><strong>Location:</strong> {event.location}</p>
                    <p><strong>Hours:</strong> {event.hours}</p>
                    <button 
                      className="join-btn" 
                      disabled={registrations.some(r => r.eventId === event.id && r.user === userName)} 
                      onClick={() => {
                        if (!isLoggedIn) { alert("Please login as a Volunteer first!"); return; }
                        const newRegistration = { user: userName, eventId: event.id, attended: false, approved: false };
                        setRegistrations([...registrations, newRegistration]);
                      }}
                    >
                      {registrations.some(r => r.eventId === event.id && r.user === userName) ? "Joined" : "Join Event"}
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ---- Volunteer Login ----
function VolunteerLogin({ setLoggedIn, setUserName }) {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = React.useState(false);
  const [name, setName] = useState("");

  return (
    <div className="portal-bg">
      <div className="login-container">
        <h2>{isSignup ? "Sign Up" : "Login"}</h2>
        <input placeholder="Email" />
        <input placeholder="Password" type="password" />
        {isSignup && (
          <input placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
        )}
        <button className="btn btn-primary" onClick={() => {
          if (isSignup && !name) { alert("Enter name"); return; }
          setLoggedIn(true);
          setUserName(name || "Volunteer");
          navigate("/volunteer");
        }}>
          {isSignup ? "Create Account" : "Login"}
        </button>
        <p style={{ cursor: "pointer", color: "var(--accent)" }} onClick={() => setIsSignup(!isSignup)}>
          {isSignup ? "Already have account? Login" : "New user? Sign Up"}
        </p>
      </div>
    </div>
  );
}

// ---- Volunteer Dashboard ----
function VolunteerDashboard({ registrations, events, userName }) {
  return (
    <div className="portal-bg">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <div className="profile-card">
            <User size={60} color="#059669" />
            <h2>{userName || "Volunteer"}</h2>
            <p className="email">Volunteer Account</p>
            <span className="badge">
              <Award size={16} /> Active Volunteer
            </span>
          </div>
        </div>
        <div className="dashboard-grid">
          <div className="card stat-big">
            <Clock size={30} color="#059669" />
            <h3>Hours Contributed</h3>
            <h1>
              {registrations
                .filter(r => r.user === userName && r.approved)
                .reduce((total, r) => {
                  const event = events.find(e => e.id === r.eventId);
                  return total + (event?.hours || 0);
                }, 0)}
            </h1>
            <p>Total volunteer hours</p>
          </div>
          <div className="card">
            <BookOpen size={25} color="#059669" />
            <h3>Registered Events</h3>
            <ul className="event-list">
              {registrations
                .filter(r => r.user === userName)
                .map((r, index) => {
                  const event = events.find(e => e.id === r.eventId);
                  return <li key={index}>{event?.title}</li>;
                })}
            </ul>
          </div>
          <div className="card">
            <Award size={25} color="#059669" />
            <h3>Achievements</h3>
            <p>🌱 Environment Hero</p>
            <p>🤝 Community Helper</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---- Admin Login ----
function AdminLogin({ setIsAdmin }) {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (password === "admin123") {
      setIsAdmin(true);
      navigate("/admin");
    } else {
      alert("Wrong password!");
    }
  };

  return (
    <div className="admin-bg">
      <div className="login-container">
        <h2>Admin Login</h2>
        <input 
          placeholder="Admin password" 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button className="btn btn-primary" onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

// ---- Admin Dashboard ----
function AdminDashboard({ events, setEvents }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [hours, setHours] = useState("");
  const [club, setClub] = useState("VRIKSH");

  function createEvent() {
    if (!title || !date || !location || !hours) { alert("Fill all fields"); return; }
    const newEvent = { 
      id: Date.now(), 
      title, 
      date, 
      location, 
      hours: Number(hours), 
      club, 
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a" 
    };
    setEvents([...events, newEvent]);
    setTitle(""); setDate(""); setLocation(""); setHours("");
  }

  function deleteEvent(id) {
    setEvents(events.filter(event => event.id !== id));
  }

  return (
    <div className="admin-bg"> {/* Changed from events-container */}
      <h2 className="admin-title">Admin Portal</h2>
      
      {/* This is the "Create Event" card */}
      <div className="card admin-create-bar"> 
        <input placeholder="Event Title" value={title} onChange={e => setTitle(e.target.value)} />
        <input placeholder="Date" value={date} onChange={e => setDate(e.target.value)} />
        <input placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} />
        <input placeholder="Hours" value={hours} onChange={e => setHours(e.target.value)} />
        <select value={club} onChange={e => setClub(e.target.value)}>
          <option>VRIKSH</option>
          <option>ANOKHA</option>
          <option>AYUDA</option>
          <option>RRC</option>
        </select>
        <button className="btn btn-primary" onClick={createEvent}>Create Event</button>
      </div>

      <div className="events-grid">
        {(events || []).map(event => (
          <div key={event.id} className="card">
            <h3>{event.title}</h3>
            <p><strong>Date:</strong> {event.date}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <p><strong>Hours:</strong> {event.hours} hrs</p>
            <p><strong>Club:</strong> {event.club}</p>
            <button onClick={() => deleteEvent(event.id)} className="join-btn">Delete Event</button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---- Coordinator Login ----
function CoordinatorLogin({ setIsCoordinator }) {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");

  return (
    <div className="admin-bg">
      <div className="login-container">
        <h2>Coordinator Login</h2>
        <input placeholder="Coordinator password" type="password" onChange={e => setPassword(e.target.value)} />
        <button className="btn btn-primary" onClick={() => {
          if (password === "coord123") { setIsCoordinator(true); navigate("/coordinator"); }
          else { alert("Wrong password"); }
        }}>Login</button>
      </div>
    </div>
  );
}

// ---- Coordinator Dashboard ----
// ---- Coordinator Dashboard ----
function CoordinatorDashboard({ events, registrations, setRegistrations }) {

  function markAttendance(user, eventId) {
    setRegistrations(registrations.map(r => 
      r.user === user && r.eventId === eventId ? { ...r, attended: true } : r
    ));
  }

  function approveHours(user, eventId) {
    setRegistrations(registrations.map(r => 
      r.user === user && r.eventId === eventId ? { ...r, approved: true } : r
    ));
  }

  return (
    <div className="admin-bg"> {/* Changed to admin-bg for consistent padding */}
      <h2 className="admin-title">Coordinator Portal</h2>
      
      <div className="coordinator-grid">
        {(events || []).map(event => (
          <div key={event.id} className="card coordinator-card">
            <div className="coord-event-header">
              <h3>{event.title}</h3>
              <span className="coord-date">{event.date}</span>
            </div>
            
            <h4>Registered Volunteers:</h4>
            <div className="volunteer-list">
              {registrations.filter(r => r.eventId === event.id).length > 0 ? (
                registrations
                  .filter(r => r.eventId === event.id)
                  .map((r, index) => (
                    <div key={index} className="volunteer-row">
                      <span className="vol-name">{r.user}</span>
                      <div className="action-btns">
                        <button 
                          className={`coord-btn ${r.attended ? 'btn-success' : 'btn-outline'}`}
                          disabled={r.attended} 
                          onClick={() => markAttendance(r.user, event.id)}
                        >
                          {r.attended ? "✓ Present" : "Mark Present"}
                        </button>
                        
                        <button 
                          className={`coord-btn ${r.approved ? 'btn-approve-done' : 'btn-approve'}`}
                          disabled={!r.attended || r.approved} 
                          onClick={() => approveHours(r.user, event.id)}
                        >
                          {r.approved ? "Approved" : "Approve Hours"}
                        </button>
                      </div>
                    </div>
                  ))
              ) : (
                <p className="no-volunteers">No volunteers registered yet.</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
// ---- Main App ----
export default function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [clubs, setClubs] = useState(clubsData);
  const [events, setEvents] = useState(eventsData);
  const [registrations, setRegistrations] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCoordinator, setIsCoordinator] = useState(false);

  return (
    <Router>
      <Navbar 
        isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} 
        isAdmin={isAdmin} setIsAdmin={setIsAdmin} 
        isCoordinator={isCoordinator} setIsCoordinator={setIsCoordinator} 
      />
      <Routes>
        <Route path="/" element={<div><Home /><Features /><Impact /></div>} />
        <Route path="/events" element={
          <EventsPage 
            clubs={clubs} events={events} isLoggedIn={isLoggedIn} 
            registrations={registrations} setRegistrations={setRegistrations} 
            userName={userName} 
          />
        } />
        <Route path="/volunteer" element={
          isLoggedIn ? 
          <VolunteerDashboard registrations={registrations} events={events} userName={userName} /> :
          <VolunteerLogin setLoggedIn={setLoggedIn} setUserName={setUserName} />
        } />
        <Route path="/admin" element={
          isAdmin ? <AdminDashboard events={events} setEvents={setEvents} /> : <AdminLogin setIsAdmin={setIsAdmin} />
        } />
        <Route path="/coordinator" element={
          isCoordinator ? <CoordinatorDashboard events={events} registrations={registrations} setRegistrations={setRegistrations} /> : <CoordinatorLogin setIsCoordinator={setIsCoordinator} />
        } />
      </Routes>
      <footer style={{ textAlign: 'center', padding: '20px', background: 'white' }}>
        <p>&copy; 2026 NGO Connect</p>
      </footer>
    </Router>
  );
}