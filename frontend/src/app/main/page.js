"use client";
 
import { useState, useEffect } from "react";
import Image from "next/image";
import HeaderWithCart from "../_components/HeaderWithCart";
import AIFoodShowcase from "../../components/AIFoodShowcase";
import AIRecommendations from "../../components/AIRecommendations";
import AICookingAssistant from "../../components/AICookingAssistant";
import { useAuth } from "../../contexts/AuthContext";
import AuthModal from "../../components/AuthModal";

export default function Main() {
  const { isAuthenticated, loading } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleLoginSuccess = () => {
    // Refresh the page or update state as needed
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 dark:from-black dark:via-gray-950 dark:to-black transition-colors duration-300">
      <HeaderWithCart 
        isAuthenticated={isAuthenticated}
        onAuthRequired={() => setShowAuthModal(true)}
      />
      <AIFoodShowcase 
        isAuthenticated={isAuthenticated}
        onAuthRequired={() => setShowAuthModal(true)}
      />
      <AIRecommendations 
        isAuthenticated={isAuthenticated}
        onAuthRequired={() => setShowAuthModal(true)}
      />
      <AICookingAssistant />
      
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}
