import React, { useState } from 'react';
import { AuthForm } from './components/AuthForm';
import { ContactList } from './components/ContactList';
import { ContactForm } from './components/ContactForm';
import { UserPlus, LogOut, Plus } from 'lucide-react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [showContactForm, setShowContactForm] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [contacts, setContacts] = useState([]);

  const handleAuth = (email, password) => {
    // Simple authentication for demo
    if (email && password) {
      setIsAuthenticated(true);
    }
  };

  const handleAddContact = (contactData) => {
    const newContact = {
      ...contactData,
      id: Date.now().toString(),
    };
    setContacts([...contacts, newContact]);
  };

  const handleEditContact = (contactData) => {
    if (editingContact) {
      setContacts(contacts.map(c => 
        c.id === editingContact.id ? { ...contactData, id: c.id } : c
      ));
    }
  };

  const handleDeleteContact = (id) => {
    setContacts(contacts.filter(c => c.id !== id));
  };

  const handleToggleFavorite = (id) => {
    setContacts(contacts.map(c =>
      c.id === id ? { ...c, favorite: !c.favorite } : c
    ));
  };

  if (!isAuthenticated) {
    return (
      <div className="auth-container">
        <div className="auth-form-container">
          <AuthForm
            type={isLoginMode ? 'login' : 'signup'}
            onSubmit={handleAuth}
          />
          <div className="auth-switch">
            <button
              onClick={() => setIsLoginMode(!isLoginMode)}
              className="auth-switch-button"
            >
              {isLoginMode ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <header className="app-header">
        <div className="header-content">
          <h1 className="header-title">Contacts</h1>
          <div className="header-actions">
            <button
              onClick={() => {
                setEditingContact(null);
                setShowContactForm(true);
              }}
              className="button button-primary"
            >
              <Plus className="button-icon" />
              Add Contact
            </button>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="button button-secondary"
            >
              <LogOut className="button-icon" />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="main-content">
        {contacts.length === 0 ? (
          <div className="empty-state">
            <UserPlus className="empty-icon" size={48} />
            <h3 className="empty-title">No contacts</h3>
            <p className="empty-description">Get started by creating a new contact.</p>
            <button
              onClick={() => {
                setEditingContact(null);
                setShowContactForm(true);
              }}
              className="button button-primary"
            >
              <Plus className="button-icon" />
              Add Contact
            </button>
          </div>
        ) : (
          <ContactList
            contacts={contacts}
            onDelete={handleDeleteContact}
            onEdit={(contact) => {
              setEditingContact(contact);
              setShowContactForm(true);
            }}
            onToggleFavorite={handleToggleFavorite}
          />
        )}
      </main>

      {showContactForm && (
        <ContactForm
          contact={editingContact}
          onSubmit={editingContact ? handleEditContact : handleAddContact}
          onClose={() => {
            setShowContactForm(false);
            setEditingContact(null);
          }}
        />
      )}
    </div>
  );
}

export default App;