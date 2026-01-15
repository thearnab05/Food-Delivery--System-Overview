"use client";

import { useState } from 'react';
import { MessageCircle, Send, ChefHat, Lightbulb, Clock, Users, Sparkles } from 'lucide-react';

const AICookingAssistant = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: "Hello! I'm your AI cooking assistant. I can help you with recipe suggestions, cooking tips, ingredient substitutions, and answer any food-related questions. What would you like to know today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickQuestions = [
    "What's a good substitute for eggs?",
    "How do I cook perfect rice?",
    "What spices go well with chicken?",
    "How long should I cook pasta?",
    "What's the best way to season vegetables?",
    "How do I make a roux?",
    "How do I make perfect basmati rice?",
    "What are essential Indian spices?",
    "How do I temper spices for Indian cooking?"
  ];

  const aiResponses = {
    "What's a good substitute for eggs?": "Great question! Here are some excellent egg substitutes:\n\n• **Flax eggs**: 1 tbsp ground flax + 3 tbsp water\n• **Chia eggs**: 1 tbsp chia seeds + 3 tbsp water\n• **Banana**: 1/4 cup mashed banana per egg\n• **Applesauce**: 1/4 cup per egg\n• **Silken tofu**: 1/4 cup blended per egg\n• **Aquafaba**: 3 tbsp chickpea water per egg\n\nFor binding, use flax or chia. For moisture, use banana or applesauce. For structure, use silken tofu.",
    
    "How do I cook perfect rice?": "Here's the foolproof method for perfect rice:\n\n**For white rice (1 cup):**\n1. Rinse rice until water runs clear\n2. Add 1.5 cups water and 1/4 tsp salt\n3. Bring to boil, then reduce to low simmer\n4. Cover and cook 18-20 minutes\n5. Let rest 5 minutes, then fluff\n\n**Pro tips:**\n• Don't peek while cooking\n• Use a heavy-bottomed pot\n• Keep the lid on tight\n• Let it rest before serving",
    
    "What spices go well with chicken?": "Chicken is incredibly versatile! Here are some amazing spice combinations:\n\n**Classic:**\n• Garlic, onion, paprika, thyme, rosemary\n\n**Mediterranean:**\n• Oregano, basil, lemon, garlic, olive oil\n\n**Asian:**\n• Ginger, garlic, soy sauce, sesame oil, five-spice\n\n**Mexican:**\n• Cumin, chili powder, oregano, lime, cilantro\n\n**Indian:**\n• Turmeric, cumin, coriander, garam masala, ginger\n\n**Pro tip:** Always season under the skin for maximum flavor!",
    
    "How long should I cook pasta?": "Pasta cooking times vary by type:\n\n**Fresh pasta:** 2-4 minutes\n**Dried pasta:**\n• Spaghetti: 8-10 minutes\n• Penne: 10-12 minutes\n• Fettuccine: 10-11 minutes\n• Lasagna sheets: 8-10 minutes\n\n**Key tips:**\n• Use plenty of salted water (1 tbsp salt per pound)\n• Stir occasionally to prevent sticking\n• Test 2 minutes before package time\n• Reserve 1 cup pasta water for sauces\n• Cook to 'al dente' - firm but not hard",
    
    "What's the best way to season vegetables?": "Here are the best ways to season vegetables:\n\n**Basic seasoning:**\n• Salt, pepper, olive oil, garlic\n\n**Roasting:**\n• Olive oil, salt, herbs (rosemary, thyme)\n• 400°F for 20-30 minutes\n\n**Sautéing:**\n• Butter or oil, garlic, onions, herbs\n• Add acid (lemon, vinegar) at the end\n\n**Grilling:**\n• Olive oil, salt, pepper, herbs\n• High heat, char marks = flavor\n\n**Pro tip:** Season in layers - salt early, herbs late!",
    
    "How do I make a roux?": "A roux is the foundation of many sauces! Here's how:\n\n**Equal parts fat + flour:**\n1. Melt butter in pan over medium heat\n2. Add equal amount of flour\n3. Whisk constantly for 2-3 minutes\n\n**Types of roux:**\n• **White roux:** 2-3 minutes (béchamel)\n• **Blond roux:** 5-6 minutes (velouté)\n• **Brown roux:** 8-10 minutes (gumbo)\n\n**Pro tips:**\n• Keep whisking to prevent burning\n• Add cold liquid gradually\n• Cook out flour taste\n• Use for thickening soups and sauces",
    
    "How do I make perfect basmati rice?": "Perfect basmati rice is essential for Indian cuisine! Here's the foolproof method:\n\n**For 1 cup basmati rice:**\n1. Rinse rice 3-4 times until water runs clear\n2. Soak for 30 minutes in cold water\n3. Drain completely\n4. Add 1.5 cups water and 1/4 tsp salt\n5. Bring to boil, then reduce to low simmer\n6. Cover and cook 15-18 minutes\n7. Let rest 5 minutes, then fluff with fork\n\n**Pro tips:**\n• Soaking is crucial for long, fluffy grains\n• Don't stir while cooking\n• Use a heavy-bottomed pot\n• The rice should be fragrant and separate",
    
    "What are essential Indian spices?": "Here are the essential Indian spices every kitchen should have:\n\n**Whole Spices:**\n• Cumin seeds, mustard seeds, cardamom pods\n• Cinnamon sticks, bay leaves, black peppercorns\n• Cloves, star anise, fenugreek seeds\n\n**Ground Spices:**\n• Turmeric, cumin powder, coriander powder\n• Garam masala, red chili powder, black pepper\n• Amchur (dry mango powder), asafoetida\n\n**Pro tips:**\n• Buy whole spices and grind as needed\n• Store in airtight containers away from heat\n• Toast whole spices before grinding\n• Garam masala should be added at the end",
    
    "How do I temper spices for Indian cooking?": "Tempering (tadka) is a crucial Indian cooking technique! Here's how:\n\n**Basic tempering method:**\n1. Heat oil/ghee in a small pan\n2. Add whole spices (cumin, mustard seeds)\n3. Wait for spices to crackle and pop\n4. Add aromatics (ginger, garlic, onions)\n5. Pour over finished dish\n\n**Common combinations:**\n• **Dal tadka:** Cumin, mustard, asafoetida, red chili\n• **Curry tadka:** Cinnamon, cardamom, bay leaf, onions\n• **Rice tadka:** Cumin, cloves, cardamom, bay leaf\n\n**Pro tips:**\n• Don't burn the spices - they should be fragrant\n• Add tempering at the end for maximum flavor\n• Use ghee for authentic taste\n• The sound of crackling indicates readiness"
  };

  const sendMessage = async (content) => {
    if (!content.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: content,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = aiResponses[content] || "I'm here to help with your cooking questions! Try asking about ingredients, techniques, or recipe suggestions. I can also help with substitutions, cooking times, and flavor combinations.";
      
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: aiResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(inputMessage);
  };

  return (
    <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-950 dark:to-black py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <ChefHat className="w-8 h-8 text-green-600" />
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">AI Cooking Assistant</h2>
            <ChefHat className="w-8 h-8 text-green-600" />
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Get instant cooking help, recipe advice, and culinary expertise
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-green-500 to-blue-500 p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <ChefHat className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Cooking Assistant</h3>
                    <p className="text-white/80 text-sm">Online • Ready to help</p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="h-96 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                        message.type === 'user'
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                      }`}
                    >
                      <div className="whitespace-pre-line">{message.content}</div>
                      <div className={`text-xs mt-2 ${
                        message.type === 'user' ? 'text-white/70' : 'text-gray-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 text-gray-800 px-4 py-3 rounded-2xl">
                                        <div className="flex items-center gap-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">AI is typing...</span>
                  </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <form onSubmit={handleSubmit} className="p-4 border-t border-gray-100 dark:border-gray-700">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Ask me anything about cooking..."
                    className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  />
                  <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-xl transition-colors duration-200"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Quick Questions & Features */}
          <div className="space-y-6">
            {/* Quick Questions */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                <h3 className="font-semibold text-gray-800 dark:text-white">Quick Questions</h3>
              </div>
              <div className="space-y-2">
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => sendMessage(question)}
                    className="w-full text-left p-3 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200 text-sm text-gray-700 dark:text-gray-300"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>

            {/* AI Features */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-purple-500" />
                <h3 className="font-semibold text-gray-800 dark:text-white">AI Features</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <Clock className="w-4 h-4 text-purple-600" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Cooking time estimates</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <Users className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Serving size adjustments</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <ChefHat className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Ingredient substitutions</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <Lightbulb className="w-4 h-4 text-orange-600" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Cooking tips & tricks</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl p-6 text-white">
              <h3 className="font-semibold mb-4">Today's Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Questions answered</span>
                  <span className="font-bold">24</span>
                </div>
                <div className="flex justify-between">
                  <span>Recipes suggested</span>
                  <span className="font-bold">12</span>
                </div>
                <div className="flex justify-between">
                  <span>Tips shared</span>
                  <span className="font-bold">18</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AICookingAssistant; 