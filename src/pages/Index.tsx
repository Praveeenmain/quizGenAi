
import { Navbar } from "@/components/navbar";
import { ApiKeyForm } from "@/components/api-key-form";
import { ContextForm } from "@/components/context-form";
import { McqQuiz } from "@/components/mcq-quiz";
import { WelcomeSection } from "@/components/welcome-section";
import { useQuiz } from "@/contexts/QuizContext";

const Index = () => {
  const { apiKey, questions } = useQuiz();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto py-8 px-4 flex-1">
        <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          QuizGenAi
        </h1>
        
        <div className="space-y-8">
          <WelcomeSection />
          
          {!apiKey && (
            <div className="mb-8">
              <ApiKeyForm />
            </div>
          )}
          
          <ContextForm />
          
          {questions.length > 0 && (
            <div className="mt-10">
              <McqQuiz />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
