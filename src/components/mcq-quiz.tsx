
import { useQuiz } from "@/contexts/QuizContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export function McqQuiz() {
  const { questions, answerQuestion } = useQuiz();
  const navigate = useNavigate();
  
  if (questions.length === 0) {
    return null;
  }
  
  const handleFinish = () => {
    navigate("/dashboard");
  };
  
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Generated Quiz</h2>
        <Button onClick={handleFinish}>
          Finish & View Results
        </Button>
      </div>
      
      {questions.map((question) => (
        <Card key={question.id} className="w-full">
          <CardHeader>
            <CardTitle>{question.question}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-2">
              {question.options.map((option, index) => {
                const isUserAnswer = question.userAnswer === option;
                const isCorrectAnswer = question.correctAnswer === option;
                
                let buttonClass = "";
                
                if (question.userAnswer) {
                  if (isCorrectAnswer) {
                    buttonClass = "bg-green-500 hover:bg-green-600 text-white";
                  } else if (isUserAnswer) {
                    buttonClass = "bg-red-500 hover:bg-red-600 text-white";
                  }
                }
                
                return (
                  <Button
                    key={index}
                    variant="outline"
                    className={`justify-start text-left ${buttonClass}`}
                    onClick={() => !question.userAnswer && answerQuestion(question.id, option)}
                    disabled={!!question.userAnswer}
                  >
                    <span className="mr-2">{String.fromCharCode(65 + index)}.</span>
                    {option}
                  </Button>
                );
              })}
            </div>
            {question.userAnswer && (
              <div className="mt-4 text-sm">
                {question.userAnswer === question.correctAnswer ? (
                  <p className="text-green-500 font-medium">Correct answer!</p>
                ) : (
                  <p className="text-red-500 font-medium">
                    Incorrect. The correct answer is: {question.correctAnswer}
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
