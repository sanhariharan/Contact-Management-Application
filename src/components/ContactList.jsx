import React from 'react';
import { Phone, Mail, Star, Trash2, PenSquare, User2 } from 'lucide-react';

export function ContactList({ contacts, onDelete, onEdit, onToggleFavorite }) {
  return (
    <div className="contacts-grid">
      {contacts.map((contact) => (
        <div key={contact.id} className="contact-card">
          <div className="contact-header">
            <div className="contact-info">
              <div className="contact-avatar">
                <User2 />
              </div>
              <div>
                <h3 className="contact-name">{contact.name}</h3>
                <span className="contact-category">
                  {contact.category}
                </span>
              </div>
            </div>
            <button
              onClick={() => onToggleFavorite(contact.id)}
              className={`contact-favorite ${contact.favorite ? 'active' : ''}`}
            >
              <Star />
            </button>
          </div>
          
          <div className="contact-details">
            <div className="contact-detail">
              <Phone size={16} />
              <span>{contact.phone}</span>
            </div>
            <div className="contact-detail">
              <Mail size={16} />
              <span>{contact.email}</span>
            </div>
          </div>
          
          <div className="contact-actions">
            <button
              onClick={() => onEdit(contact)}
              className="action-button edit"
            >
              <PenSquare />
            </button>
            <button
              onClick={() => onDelete(contact.id)}
              className="action-button delete"
            >
              <Trash2 />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}