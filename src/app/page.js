import Quiz from "./Pages/Quiz";

import { jsQuizz } from "./components/constants";

export default function Home() {
  return (
    <main className="font-mono bg-gradient-to-t from-blue-900  to-yellow-700 flex justify-center my-0 mx-auto py-0 px-8 h-screen">
      <Quiz questions={jsQuizz.questions} />
    </main>
  );
}
