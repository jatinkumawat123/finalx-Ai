const express = require('express');
const { protect } = require('../middleware/auth');
const User = require('../models/User');
const router = express.Router();

const generateAIResponse = async (module, prompt) => {
  // Try Gemini API
  if (process.env.GEMINI_API_KEY) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{ text: `You are FinalX.AI assistant for ${module}. Answer: ${prompt}` }]
            }]
          })
        }
      );
      const data = await response.json();
      if (data.candidates && data.candidates[0]) {
        return data.candidates[0].content.parts[0].text;
      }
    } catch (err) {
      console.log('Gemini error:', err.message);
    }
  }

  // Demo responses
  const responses = {
    chat: `**FinalX.AI Response:**\n\nThank you for your question: "${prompt}"\n\nThis is a demo response. Connect your API key for real AI responses!\n\n*Powered by FinalX.AI — Ask Anything. Build Everything.*`,
    study: `**Study Assistant:**\n\nTopic: "${prompt}"\n\n📚 **Key Points:**\n• Add API key for real explanations\n• I can generate notes, Q&A, and exam tips\n\n*Keep studying! 🎯*`,
    content: `**Content Generator:**\n\nFor: "${prompt}"\n\n📱 **Instagram Caption:**\n"Elevate your game. Stay ahead. ✨ #Growth #Success"\n\n🎬 **YouTube Title:**\n"The ULTIMATE Guide to ${prompt}"\n\n#Trending #Viral #FinalXAI`,
    code: `**Code Generator:**\n\nRequest: "${prompt}"\n\n\`\`\`html\n<!DOCTYPE html>\n<html>\n<head><title>FinalX.AI</title></head>\n<body><h1>Hello from FinalX.AI!</h1></body>\n</html>\n\`\`\``,
    astrology: `**🔮 Astrology Insights:**\n\nFor: "${prompt}"\n\n✨ **Today's Energy:** Stay positive!\n\n💚 **Health Tip:** Practice yoga today.\n\n*For entertainment only.*`,
    business: `**💼 Business Ideas:**\n\nFor: "${prompt}"\n\n🚀 **Top Ideas:**\n1. Freelancing\n2. YouTube channel\n3. Digital products\n\n*Educational purposes only.*`
  };
  return responses[module] || responses.chat;
};

router.post('/chat', protect, async (req, res) => {
  try {
    const { prompt, module = 'chat' } = req.body;
    if (!prompt || prompt.trim().length === 0) {
      return res.status(400).json({ message: 'Prompt is required' });
    }

    const user = req.user;
    if (!user.hasActiveSubscription() && user.usage.aiRequests >= 5) {
      return res.status(403).json({ 
        message: 'Free limit reached. Please subscribe to continue.',
        code: 'USAGE_LIMIT'
      });
    }

    let aiResponse = await generateAIResponse(module, prompt.trim());

    await User.findByIdAndUpdate(user._id, {
      $push: { 
        chatHistory: { 
          module, 
          prompt: prompt.substring(0, 500), 
          response: aiResponse.substring(0, 2000) 
        } 
      },
      $inc: { 'usage.aiRequests': 1 }
    });

    res.json({ response: aiResponse, module });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'AI service error' });
  }
});

router.get('/history', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('chatHistory');
    res.json({ history: user.chatHistory.slice(-50).reverse() });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
