const responses = [
  "That's a great question! Based on my analysis, I'd suggest considering multiple perspectives here. The key factors to weigh are efficiency, scalability, and user experience.",
  "I've thought about this carefully. Here's my take: the most effective approach would be to break this down into smaller, manageable steps and tackle each one systematically.",
  "Interesting point! From what I understand, there are several ways to approach this. Let me outline the pros and cons of each option for you.",
  "Great thinking! I'd recommend starting with the fundamentals first. Once you have a solid foundation, the more complex aspects will become much clearer.",
  "That's a fascinating topic. Research suggests that the best results come from combining creative thinking with structured methodology. Here's how I'd approach it...",
  "I appreciate you bringing this up! The short answer is yes, but with some important caveats. Let me explain the nuances so you can make an informed decision.",
  "Excellent question! In my experience, the most successful strategies involve a balance of innovation and proven methods. Here are some specific recommendations...",
  "You've raised an important consideration. The data points to several possible outcomes, and I think the most likely scenario involves a combination of factors working together.",
];

export function getAIResponse(userMessage: string): Promise<string> {
  return new Promise((resolve) => {
    const delay = 800 + Math.random() * 1500;
    const idx = Math.abs(userMessage.split("").reduce((a, c) => a + c.charCodeAt(0), 0)) % responses.length;
    setTimeout(() => resolve(responses[idx]), delay);
  });
}
