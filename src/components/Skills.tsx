const Skills = () => {
  const skillCategories = [
    {
      title: "Programming Languages",
      skills: ["Python", "C/C++/C#", "Java", "GraphQL", "SQL", "JavaScript", "TypeScript", "HTML/CSS"]
    },
    {
      title: "Frameworks",
      skills: ["Backend (Spring, Flask, Node.js)", "Frontend (React.js, Next.js, Tailwind CSS, WPF)", "ML (PyTorch, TensorFlow)", "Arduino", "SPSS Statistics"]
    },
    {
      title: "Database",
      skills: ["Postgres", "MongoDB", "Firebase", "Supabase"]
    },
    {
      title: "Machine Learning",
      skills: ["Supervised & Unsupervised Learning", "Advanced Learning Algorithms", "Reinforcement Learning"]
    },
    {
      title: "Technologies",
      skills: ["AMD cloud", "Git", "Windows", "Linux", "Docker", "Jupyter Notebook", "Microsoft Visual Studio", "Eclipse"]
    }
  ];

  return (
    <section id="skills" className="py-20 bg-gray-50">
      <div className="container px-6">
        <div className="text-center mb-12 animate-fade-up">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Skills & Expertise</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Technologies and tools I work with
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div
              key={category.title}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-300 hover:scale-[1.02] animate-fade-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{category.title}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-full transition-all duration-300 hover:bg-primary hover:text-white"
                    style={{ animationDelay: `${(index * 150) + (skillIndex * 50)}ms` }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;