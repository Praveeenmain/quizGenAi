
import { Link } from "react-router-dom";
import { ThemeToggle } from "./theme-toggle";
import { useQuiz } from "@/contexts/QuizContext";

export function Navbar() {
  const { streak, totalAnswered, correctAnswers } = useQuiz();
  
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4 container mx-auto">
        <Link to="/" className="flex items-center">
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            QuizGenAi
          </h1>
        </Link>
        
        <div className="ml-auto flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              to="/dashboard" 
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Dashboard
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4 mr-4">
            <div className="flex items-center px-3 py-1 rounded-md bg-muted">
              <span className="text-sm font-medium">
                Streak: {streak}
              </span>
            </div>
            <div className="flex items-center px-3 py-1 rounded-md bg-muted">
              <span className="text-sm font-medium">
                Score: {correctAnswers}/{totalAnswered}
              </span>
            </div>
          </div>
          
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
