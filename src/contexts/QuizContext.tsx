import { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from "sonner";

type Question = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  userAnswer?: string;
};

type QuizContextType = {
  apiKey: string;
  setApiKey: (key: string) => void;
  context: string;
  setContext: (context: string) => void;
  questions: Question[];
  setQuestions: (questions: Question[]) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  streak: number;
  setStreak: (streak: number) => void;
  totalAnswered: number;
  setTotalAnswered: (total: number) => void;
  correctAnswers: number;
  setCorrectAnswers: (correct: number) => void;
  generateQuestions: () => Promise<void>;
  answerQuestion: (questionId: string, answer: string) => void;
};

const GEMINI_API_KEY_STORAGE = 'geminiApiKey';
const GEMINI_API_KEY_TIMESTAMP = 'geminiApiKeyTimestamp';
const FOUR_HOURS_MS = 4 * 60 * 60 * 1000;

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export function QuizProvider({ children }: { children: ReactNode }) {
  const [apiKey, setApiKeyState] = useState<string>(() => {
    try {
      const key = localStorage.getItem(GEMINI_API_KEY_STORAGE);
      const timestampStr = localStorage.getItem(GEMINI_API_KEY_TIMESTAMP);
      if (!key || !timestampStr) return '';
      const timestamp = parseInt(timestampStr, 10);
      if (isNaN(timestamp)) return '';
      const now = Date.now();
      if (now - timestamp > FOUR_HOURS_MS) {
        localStorage.removeItem(GEMINI_API_KEY_STORAGE);
        localStorage.removeItem(GEMINI_API_KEY_TIMESTAMP);
        return '';
      }
      return key;
    } catch {
      return '';
    }
  });

  const [context, setContext] = useState<string>('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [streak, setStreak] = useState<number>(
    parseInt(localStorage.getItem('streak') || '0')
  );
  const [totalAnswered, setTotalAnswered] = useState<number>(
    parseInt(localStorage.getItem('totalAnswered') || '0')
  );
  const [correctAnswers, setCorrectAnswers] = useState<number>(
    parseInt(localStorage.getItem('correctAnswers') || '0')
  );

  const setApiKey = (key: string) => {
    setApiKeyState(key);
    if (key && key.trim()) {
      localStorage.setItem(GEMINI_API_KEY_STORAGE, key);
      localStorage.setItem(GEMINI_API_KEY_TIMESTAMP, Date.now().toString());
    } else {
      localStorage.removeItem(GEMINI_API_KEY_STORAGE);
      localStorage.removeItem(GEMINI_API_KEY_TIMESTAMP);
    }
  };

  const generateQuestions = async () => {
    if (!apiKey || !context) return;
    
    setIsLoading(true);
    
    try {
      const prompt = `Based on the following text, generate 10 multiple-choice questions with 4 options each (1 correct, 3 incorrect). For each question, specify the correct answer. Format the response as a JSON array with each question having the following structure:
      {
        "question": "The question text",
        "options": ["Option A", "Option B", "Option C", "Option D"],
        "correctAnswer": "The correct option text"
      }
      
      Text:
      ${context}`;
      
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey,
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 4000,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`API returned ${response.status}: ${await response.text()}`);
      }
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error.message || "API error");
      }
      
      if (!data.candidates || data.candidates.length === 0) {
        throw new Error("No response from API");
      }
      
      const generatedText = data.candidates[0]?.content?.parts?.[0]?.text;
      
      if (!generatedText) {
        throw new Error("Empty response from API");
      }
      
      const jsonMatch = generatedText.match(/\[\s*\{.*\}\s*\]/s);
      let formattedQuestions: Question[] = [];
      
      if (jsonMatch) {
        try {
          const parsedQuestions = JSON.parse(jsonMatch[0]);
          formattedQuestions = parsedQuestions.map((q: any, index: number) => ({
            id: `q-${index}`,
            question: q.question,
            options: q.options,
            correctAnswer: q.correctAnswer,
          }));
          
          toast.success("Questions generated successfully!");
        } catch (error) {
          console.error("Error parsing JSON:", error);
          toast.error("Couldn't parse the response from Gemini. Please try again.");
        }
      } else {
        toast.error("Couldn't extract questions from Gemini response. Please try again.");
      }
      
      setQuestions(formattedQuestions);
    } catch (error) {
      console.error('Error generating questions:', error);
      toast.error(error instanceof Error ? error.message : "Failed to generate questions. Please check your API key and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const answerQuestion = (questionId: string, answer: string) => {
    setQuestions((prevQuestions) => {
      return prevQuestions.map((q) => {
        if (q.id === questionId) {
          if (!q.userAnswer) {
            const isCorrect = q.correctAnswer === answer;
            
            setTotalAnswered((prev) => {
              const newTotal = prev + 1;
              localStorage.setItem('totalAnswered', newTotal.toString());
              return newTotal;
            });
            
            if (isCorrect) {
              setCorrectAnswers((prev) => {
                const newCorrect = prev + 1;
                localStorage.setItem('correctAnswers', newCorrect.toString());
                return newCorrect;
              });
              
              setStreak((prev) => {
                const newStreak = prev + 1;
                localStorage.setItem('streak', newStreak.toString());
                return newStreak;
              });
            } else {
              setStreak(0);
              localStorage.setItem('streak', '0');
            }
          }
          
          return { ...q, userAnswer: answer };
        }
        return q;
      });
    });
  };

  const value = {
    apiKey,
    setApiKey,
    context,
    setContext,
    questions,
    setQuestions,
    isLoading,
    setIsLoading,
    streak,
    setStreak,
    totalAnswered,
    setTotalAnswered,
    correctAnswers,
    setCorrectAnswers,
    generateQuestions,
    answerQuestion,
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
}
