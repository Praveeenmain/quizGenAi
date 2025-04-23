
import { Navbar } from "@/components/navbar";
import { StatsCards } from "@/components/stats-cards";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "@/contexts/QuizContext";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

const Dashboard = () => {
  const navigate = useNavigate();
  const { totalAnswered, correctAnswers, streak, questions } = useQuiz();
  
  const goBack = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto py-8 px-4 flex-1">
        <h1 className="text-3xl font-bold text-center mb-8">
          Your Quiz Dashboard
        </h1>
        
        <div className="space-y-8">
          <StatsCards />
          
          <Card>
            <CardHeader>
              <CardTitle>Performance Summary</CardTitle>
              <CardDescription>
                Your overall quiz performance statistics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted p-4 rounded-md">
                    <h3 className="font-medium mb-2">Total Questions</h3>
                    <p className="text-2xl font-bold">{totalAnswered}</p>
                  </div>
                  <div className="bg-muted p-4 rounded-md">
                    <h3 className="font-medium mb-2">Correct Answers</h3>
                    <p className="text-2xl font-bold">{correctAnswers}</p>
                  </div>
                </div>
                
                <div className="bg-muted p-4 rounded-md">
                  <h3 className="font-medium mb-2">Current Streak</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold">{streak}</span>
                    {streak > 0 && (
                      <span className="text-sm px-2 py-1 bg-primary text-primary-foreground rounded-full">
                        Great work!
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="bg-muted p-4 rounded-md">
                  <h3 className="font-medium mb-2">Recent Quiz</h3>
                  {questions.length > 0 ? (
                    <p className="text-sm">{questions.length} questions generated</p>
                  ) : (
                    <p className="text-sm">No recent quizzes</p>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={goBack} className="w-full">
                Create New Quiz
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
