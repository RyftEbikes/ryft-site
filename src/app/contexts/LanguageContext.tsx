'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface LanguageContextType {
  currentLanguage: string;
  setLanguage: (languageCode: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation data for different languages
const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.contact': 'Contact Us',
    'nav.products': 'Products',
    'nav.support': 'Support',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.submit': 'Submit',
    'common.close': 'Close',
    
    // Profile
    'profile.title': 'My Profile',
    'profile.manage': 'Manage your account and preferences',
    'profile.createAccount': 'Create Your Account',
    'profile.signIn': 'Sign In to Your Account',
    'profile.editProfile': 'Edit Profile',
    'profile.logout': 'Logout',
    'profile.contactInfo': 'Contact Information',
    'profile.fullName': 'Full Name',
    'profile.email': 'Email',
    'profile.phone': 'Phone Number',
    'profile.address': 'Address',
    'profile.password': 'Password',
    'profile.confirmPassword': 'Confirm Password',
    'profile.memberSince': 'Member since',
    'profile.orders': 'Orders',
    'profile.totalSpent': 'Total Spent',
    
    // Languages
    'languages.title': 'Choose Your Language',
    'languages.subtitle': 'Select your preferred language to view the Ryft website',
    'languages.apply': 'Apply Language',
    'languages.changed': 'Language changed successfully!',
    'languages.reloading': 'Reloading page with new language...',
    
    // Footer
    'footer.about': 'About',
    'footer.privacy': 'Privacy',
    'footer.terms': 'Terms',
    'footer.copyright': '© 2024 Ryft. All rights reserved.'
  },
  es: {
    // Navigation
    'nav.home': 'Inicio',
    'nav.about': 'Sobre Nosotros',
    'nav.contact': 'Contáctanos',
    'nav.products': 'Productos',
    'nav.support': 'Soporte',
    
    // Common
    'common.loading': 'Cargando...',
    'common.error': 'Error',
    'common.success': 'Éxito',
    'common.cancel': 'Cancelar',
    'common.save': 'Guardar',
    'common.edit': 'Editar',
    'common.delete': 'Eliminar',
    'common.back': 'Atrás',
    'common.next': 'Siguiente',
    'common.previous': 'Anterior',
    'common.submit': 'Enviar',
    'common.close': 'Cerrar',
    
    // Profile
    'profile.title': 'Mi Perfil',
    'profile.manage': 'Administra tu cuenta y preferencias',
    'profile.createAccount': 'Crear Tu Cuenta',
    'profile.signIn': 'Iniciar Sesión en Tu Cuenta',
    'profile.editProfile': 'Editar Perfil',
    'profile.logout': 'Cerrar Sesión',
    'profile.contactInfo': 'Información de Contacto',
    'profile.fullName': 'Nombre Completo',
    'profile.email': 'Correo Electrónico',
    'profile.phone': 'Número de Teléfono',
    'profile.address': 'Dirección',
    'profile.password': 'Contraseña',
    'profile.confirmPassword': 'Confirmar Contraseña',
    'profile.memberSince': 'Miembro desde',
    'profile.orders': 'Pedidos',
    'profile.totalSpent': 'Total Gastado',
    
    // Languages
    'languages.title': 'Elige Tu Idioma',
    'languages.subtitle': 'Selecciona tu idioma preferido para ver el sitio web de Ryft',
    'languages.apply': 'Aplicar Idioma',
    'languages.changed': '¡Idioma cambiado exitosamente!',
    'languages.reloading': 'Recargando página con nuevo idioma...',
    
    // Footer
    'footer.about': 'Acerca de',
    'footer.privacy': 'Privacidad',
    'footer.terms': 'Términos',
    'footer.copyright': '© 2024 Ryft. Todos los derechos reservados.'
  },
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.about': 'À Propos',
    'nav.contact': 'Contactez-nous',
    'nav.products': 'Produits',
    'nav.support': 'Support',
    
    // Common
    'common.loading': 'Chargement...',
    'common.error': 'Erreur',
    'common.success': 'Succès',
    'common.cancel': 'Annuler',
    'common.save': 'Sauvegarder',
    'common.edit': 'Modifier',
    'common.delete': 'Supprimer',
    'common.back': 'Retour',
    'common.next': 'Suivant',
    'common.previous': 'Précédent',
    'common.submit': 'Soumettre',
    'common.close': 'Fermer',
    
    // Profile
    'profile.title': 'Mon Profil',
    'profile.manage': 'Gérez votre compte et vos préférences',
    'profile.createAccount': 'Créer Votre Compte',
    'profile.signIn': 'Se Connecter à Votre Compte',
    'profile.editProfile': 'Modifier le Profil',
    'profile.logout': 'Se Déconnecter',
    'profile.contactInfo': 'Informations de Contact',
    'profile.fullName': 'Nom Complet',
    'profile.email': 'E-mail',
    'profile.phone': 'Numéro de Téléphone',
    'profile.address': 'Adresse',
    'profile.password': 'Mot de Passe',
    'profile.confirmPassword': 'Confirmer le Mot de Passe',
    'profile.memberSince': 'Membre depuis',
    'profile.orders': 'Commandes',
    'profile.totalSpent': 'Total Dépensé',
    
    // Languages
    'languages.title': 'Choisissez Votre Langue',
    'languages.subtitle': 'Sélectionnez votre langue préférée pour voir le site web Ryft',
    'languages.apply': 'Appliquer la Langue',
    'languages.changed': 'Langue changée avec succès !',
    'languages.reloading': 'Rechargement de la page avec la nouvelle langue...',
    
    // Footer
    'footer.about': 'À Propos',
    'footer.privacy': 'Confidentialité',
    'footer.terms': 'Conditions',
    'footer.copyright': '© 2024 Ryft. Tous droits réservés.'
  }
};

// Add more languages as needed...

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  // Load language preference from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('ryft-language');
    if (savedLanguage && translations[savedLanguage as keyof typeof translations]) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const setLanguage = (languageCode: string) => {
    if (translations[languageCode as keyof typeof translations]) {
      setCurrentLanguage(languageCode);
      localStorage.setItem('ryft-language', languageCode);
      
      // Show success message
      const successMessage = translations[languageCode as keyof typeof translations]['languages.changed'] || 'Language changed successfully!';
      
      // Create a toast notification
      const toast = document.createElement('div');
      toast.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform transition-all duration-300 translate-x-full';
      toast.textContent = successMessage;
      document.body.appendChild(toast);
      
      // Animate in
      setTimeout(() => {
        toast.classList.remove('translate-x-full');
      }, 100);
      
      // Animate out and remove
      setTimeout(() => {
        toast.classList.add('translate-x-full');
        setTimeout(() => {
          document.body.removeChild(toast);
        }, 300);
      }, 3000);
      
      // Reload the page after a short delay to apply the new language
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
  };

  const t = (key: string): string => {
    const langTranslations = translations[currentLanguage as keyof typeof translations];
    if (langTranslations && langTranslations[key as keyof typeof langTranslations]) {
      return langTranslations[key as keyof typeof langTranslations];
    }
    // Fallback to English if translation not found
    return translations.en[key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
