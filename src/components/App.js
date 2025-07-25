import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then(setQuestions);
  },[]);

  function handleAddQuestion(newQuestion) {
    setQuestions([...questions, newQuestion]);
  }

  function handleDeleteQuestion(deleteQuestion) {
     const updatedQuestions = questions.filter(
    (question) => question.id !== deleteQuestion.id
  );
  setQuestions(updatedQuestions);
}
  
  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? ( <QuestionForm onAddQuestion={handleAddQuestion}  onChangePage={setPage} /> ): ( <QuestionList questions={questions} onDeleteQuestion={handleDeleteQuestion} /> )}
    </main>
  );
}

export default App;
