import { useState } from "react";
import { motion } from "motion/react";


function SummaryCard({ label, count, accent }) {
  return (
    <article className="sb-card flex min-w-0 items-center gap-4 overflow-hidden p-4">
      <div
        className={`h-12 w-1.5 shrink-0 rounded-pill ${accent}`}
        aria-hidden="true"
      />

      <div className="min-w-0">
        <p className="text-ink-soft">{label}</p>

        <p className="mt-1 text-3xl font-semibold tracking-display text-starbucks-house">
          {count}
        </p>
      </div>
    </article>
  );
}


function UncontrolledInput({
  task,
  placeholder,
  buttonText,
  onSubmit,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const value = new FormData(form).get(task);

    if (typeof value === "string" && value.trim()) {
      onSubmit(value.trim());
      form.reset();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 py-5 sm:flex-row">
      <input
        type="text"
        name={task}
        placeholder={placeholder}
        aria-label={placeholder}
        required
        className="sb-input min-w-0 flex-1"
      />

      <motion.button
        variants={buttonVariants}
        initial="rest"
        whileHover="hover"
        whileTap="tap"
        type="submit" className="sb-button sb-button-primary">
        {buttonText}
      </motion.button>
    </form>
  );
}
const buttonVariants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.1,
    backgroundColor: "#d1d5db",
    color: "#000000",
    transition: { type: "spring", damping: 10, stiffness: 600 },
  },
  tap: { scale: 0.9 },
};


function App() {
  // DATA
  const [tasks, setTasks] = useState([
    {
      id: crypto.randomUUID(),
      title: "Task1",
      description: "Do this",
      finished: false,
    },
    {
      id: crypto.randomUUID(),
      title: "Task2",
      description: "Do that",
      finished: true,
    },
    {
      id: crypto.randomUUID(),
      title: "Task3",
      description: "Do it",
      finished: false,
    },
    {
      id: crypto.randomUUID(),
      title: "Task4",
      description:
        "Be it test it see if it fits probably won't but we'll see how far can this go ?????",
      finished: false,
    },
  ]);

  const [filter, setFilterTask] = useState("all");

  // ADD TASK
  const handleTaskSubmit = (title) => {
    const newTask = {
      id: crypto.randomUUID(),
      title,
      description: "",
      finished: false,
    };

    setTasks((current) => [...current, newTask]);
  };

  // DELETE TASK
  const deleteTask = (id) => {
    setTasks((current) => current.filter((task) => task.id !== id));
  };

  // DELETE ALL FINISHED TASKS
  const deleteAllFinishedTasks = () => {
    setTasks((current) => current.filter((task) => !task.finished));
  };

  // TOGGLE TASK STATUS
  const toggleTask = (id) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === id
          ? { ...task, finished: !task.finished }
          : task,
      ),
    );
  };

  // FILTERS AND COUNTS
  const visibleTasks = tasks.filter((task) => {
    if (filter === "finished") return task.finished;
    if (filter === "unfinished") return !task.finished;
    return true;
  });

  const countTotal = tasks.length;
  const countFinished = tasks.filter((task) => task.finished).length;
  const countUnfinished = countTotal - countFinished;

  const filters = [
    { id: "all", label: "Toutes", count: countTotal },
    { id: "unfinished", label: "À faire", count: countUnfinished },
    { id: "finished", label: "Terminées", count: countFinished },
  ];


  return (
    <main className="min-h-screen bg-canvas items-center align-center px-4 py-8 text-ink sm:px-6 lg:px-10">
      <motion.img
        src="https://www.vectorlogo.zone/logos/starbucks/starbucks-ar21.svg"
        alt="Starbucks Logo"
        className="mx-auto mb-6 w-200"
        animate={{
          rotate: [-3, 3, -3],
          y: [0, -5, 0],
        }}
        transition={{
          duration: 3,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "mirror",
        }}
      />

      <div className="mx-auto max-w-5xl">
        <header className="mb-8">
          <p className="mb-2 font-semibold uppercase tracking-loose text-starbucks-accent">
            Your daily ritual
          </p>

          <h1 className="text-3xl font-semibold tracking-display text-starbucks sm:text-4xl">
            To-do list
          </h1>

          <p className="mt-3 max-w-xxl text-ink-soft">
            Organisez vos tâches, suivez votre progression et
            prenez le temps d'accomplir une chose après l'autre.
          </p>
        </header>

        {/* SUMMARY */}
        <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <SummaryCard
            label="Toutes les tâches"
            count={countTotal}
            accent="bg-starbucks-house"
          />

          <SummaryCard
            label="À accomplir"
            count={countUnfinished}
            accent="bg-starbucks-accent"
          />

          <SummaryCard
            label="Terminées"
            count={countFinished}
            accent="bg-starbucks"
          />
        </section>

        {/* MAIN CONTENT */}
        <section className="sb-card p-5 sm:p-6 md:p-8">

          {/* SECTION TITLE */}
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-2xl font-semibold tracking-display text-starbucks-house">
                Mes tâches
              </h2>

              <p className="mt-1 text-ink-soft">
                Un petit pas à la fois.
              </p>
            </div>

            <motion.button
              variants={buttonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              type="button"
              onClick={deleteAllFinishedTasks}
              disabled={countFinished === 0}
              className="sb-button border-danger text-danger hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Supprimer les terminées
            </motion.button>
          </div>

          {/* ADD TASK */}
          <div className="my-5 rounded-card bg-ceramic p-4 sm:p-5">
            <h3 className="font-semibold text-starbucks-house">
              Ajouter une tâche
            </h3>

            <UncontrolledInput
              task="task"
              placeholder="Ex. : Préparer le projet"
              buttonText="Ajouter +"
              onSubmit={handleTaskSubmit}
            />
          </div>

          {/* FILTERS */}
          <div className="mb-5">
            <p className="mb-3 font-semibold text-ink-soft">
              Afficher
            </p>

            <div className="flex flex-wrap gap-2">
              {filters.map((item) => {
                const isActive = filter === item.id;

                return (
                  <motion.button
                    variants={buttonVariants}
                    initial="rest"
                    whileHover="hover"
                    whileTap="tap"
                    key={item.id}
                    type="button"
                    onClick={() => setFilterTask(item.id)}
                    aria-pressed={isActive}
                    className={`sb-button ${isActive
                      ? "sb-button-primary"
                      : "sb-button-outline"
                      }`}
                  >
                    {item.label}
                    <span
                      className={`ml-1 ${isActive ? "opacity-80" : "opacity-70"
                        }`}
                    >
                      {item.count}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* TASK LIST */}
          <ul className="space-y-3">
            {visibleTasks.length === 0 ? (
              <li className="rounded-card bg-ceramic px-5 py-10 text-center">
                <p className="text-lg font-semibold text-starbucks-house">
                  {filter === "finished"
                    ? "Aucune tâche terminée"
                    : filter === "unfinished"
                      ? "Tout est accompli !"
                      : "Votre liste est vide"}
                </p>

                <p className="mt-2 text-ink-soft">
                  Ajoutez une tâche pour commencer.
                </p>
              </li>
            ) : (
              visibleTasks.map((task) => (
                <li
                  key={task.id}
                  className={`rounded-card border border-black/5 p-4 transition-colors sm:p-5 ${task.finished
                    ? "bg-starbucks-light/50"
                    : "bg-surface"
                    }`}
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start">

                    {/* STATUS AND TASK DETAILS */}
                    <div className="flex min-w-0 flex-1 gap-3">
                      <span
                        aria-label={
                          task.finished ? "Terminée" : "À faire"
                        }
                        className="mt-1 text-lg"
                      >
                        {task.finished ? "🟢" : "⚪"}
                      </span>

                      <div className="min-w-0 flex-1">
                        <h3
                          className={`text-lg font-semibold ${task.finished
                            ? "text-starbucks-house/70 line-through"
                            : "text-starbucks-house"
                            }`}
                        >
                          {task.title}
                        </h3>

                        <p className="mb-1 mt-3 text-xs font-semibold uppercase tracking-loose text-ink-soft">
                          Description
                        </p>

                        <p className="whitespace-pre-wrap leading-relaxed text-ink-soft">
                          {task.description || "Aucune description"}
                        </p>
                      </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="flex flex-wrap gap-2 sm:justify-end">
                      <motion.button
                        variants={buttonVariants}
                        initial="rest"
                        whileHover="hover"
                        whileTap="tap"
                        type="button"
                        onClick={() => toggleTask(task.id)}
                        aria-pressed={task.finished}
                        className="sb-button sb-button-outline"
                      >
                        {task.finished ? "Réactiver" : "Terminer"}
                      </motion.button>

                      <motion.button
                        variants={buttonVariants}
                        initial="rest"
                        whileHover="hover"
                        whileTap="tap"
                        type="button"
                        onClick={() => deleteTask(task.id)}
                        aria-label={`Supprimer ${task.title}`}
                        className="sb-button border-danger text-danger hover:bg-red-50"
                      >
                        Supprimer
                      </motion.button>
                    </div>
                  </div>
                </li>
              ))
            )}
          </ul>

          {/* FOOTER */}
          <footer className="mt-6 border-t border-black/10 pt-4">
            <p className=" text-ink-soft">
              {countFinished} tâche(s) terminée(s) sur {countTotal}.
            </p>
          </footer>
        </section>

        {/* DARK GREEN FEATURE BAND */}
        <section className="sb-section-dark mt-8 rounded-card p-6 sm:p-8">
          <h2 className="text-2xl font-semibold tracking-display">
            Chaque tâche compte.
          </h2>

          <p className="mt-2 max-w-xl">
            Gardez le rythme : avancez à votre façon et célébrez
            chaque étape accomplie.
          </p>
        </section>
      </div>
    </main>
  );
}

export default App;