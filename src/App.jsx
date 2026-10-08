import { useState } from "react";

function UncontrolledInput({task, placeholder, buttonText, onSubmit}) {
  const handleSubmit = (e) => {
    e.preventDefault(); // empêche le rechargement de la page

    const value = new FormData(e.currentTarget).get(task);

    // `required` laisse passer "   " : on re-vérifie avec trim()
    if (typeof value === "string" && value.trim()) {
      onSubmit(value.trim()); // remonte la valeur au parent
    }
    e.currentTarget.reset(); // vide le formulaire
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 py-5">
      {/* Pas de value ni onChange : c'est le DOM qui garde la valeur */}
      <input
        type="text"
        name={task}
        placeholder={placeholder}
        aria-label={placeholder}
        required
        className="rounded border px-3 py-2"
      />
      <button
        type="submit"
        className="rounded bg-blue-600 px-4 py-2 text-white"
      >
        {buttonText}
      </button>
    </form>
  );
}




function App() {
  // DATA
   const [tasks, setTasks] = useState([
    { id: crypto.randomUUID(), title: "Task1", description: "Do this", finished: false },
    { id: crypto.randomUUID(), title: "Task2", description: "Do that", finished: true },
    { id: crypto.randomUUID(), title: "Task3", description: "Do it", finished: false },
    { id: crypto.randomUUID(), title: "Task4", description: "Be it test it see if it fits probably won't but we'll see how far can this go ????? Be it test it see if it fits probably won't but we'll see how far can this go ?????Be it test it see if it fits probably won't but we'll see how far can this go ????? ", finished: false },
  ]);


  // AJOUTER TASK
  const handleTaskSubmit = (task) => {
    const newTask = {
      id: crypto.randomUUID(),
      title: task,
      description: "",
      finished: false,
    };
    setTasks((current) => [...current, newTask]);
  };

  // RETIRER UNE TASK
  const deleteTask = (id) => {
    setTasks((current) => current.filter((task) => task.id !== id));
  };

  // MODIFIER STATUS D UNE TASK
  const toggleTask = (id) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, finished: !task.finished } : task,
      ),
    );
  };


  // FILTRES
  const [filter, setFilterTask] = useState("all");
  let visibleTasks = tasks; // Par défaut, "all"

  switch (filter) {
    case "finished":
      visibleTasks = tasks.filter((tasks) => tasks.finished);
      break;
    case "unfinished":
      visibleTasks = tasks.filter((tasks) => !tasks.finished);
      break;
  }
  const countTotal = tasks.length;
  const countFinished = tasks.filter((t) => t.finished).length;
  const countUnfinished = countTotal - countFinished;



  return (
    <main className="bg-white h-screen p-5">
      <h1 className="font-bold text-2xl">To do List</h1>


      <section className="mb-4 flex gap-2">
        <button
          onClick={() => setFilterTask("all")}
          className="rounded border px-3 py-1"
        >
          Tous ({countTotal})
        </button>
        <button
          onClick={() => setFilterTask("finished")}
          className="rounded border px-3 py-1"
        >
          Finis ({countFinished})
        </button>
        <button
          onClick={() => setFilterTask("unfinished")}
          className="rounded border px-3 py-1"
        >
          À finir ({countUnfinished})
        </button>
      </section>



      <UncontrolledInput
        task="task"
        placeholder="Nouvelle Tache"
        buttonText="Soumettre"
        onSubmit={handleTaskSubmit}
      />
      <ul className="space-y-5 bg-gray-200">
        {visibleTasks.length === 0 ? (
          <li className="text-gray-600"> Aucune tâche à afficher.</li>
        ) : (
          visibleTasks.map((task) => (
            <li key={task.id} className="flex flex-row gap-20 my-5 bg-white rounded">
              <div className="flex flex-row gap-5 w-full">
                <p>{task.finished ? "🟢" : "⚪"}</p>
                <p className="font-bold w-30">{task.title}</p>
                <div className="flex flex-col w-full">
                  <p className="font-bold">Description</p>
                  <p>{task.description}</p>
                </div>

              </div>

              <div className="flex gap-2">
                <button onClick={() => toggleTask(task.id)} className="rounded bg-blue-500 px-3 py-1 text-sm h-fit w-fit text-white">
                  Terminer
                </button>
                <button onClick={() => deleteTask(task.id)} className="rounded bg-red-400 px-3 py-1 text-sm  h-fit w-fit text-white">
                  Supprimer
                </button>

              </div>
            </li>
          ))
        )}
      </ul>
     

    </main>
  );
}

export default App;