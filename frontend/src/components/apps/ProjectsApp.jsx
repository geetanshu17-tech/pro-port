
import { useEffect, useState } from 'react';

const ProjectsApp = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/projects`);

        if (!response.ok) {
          throw new Error('Failed to load projects.');
        }

        const data = await response.json();
        setProjects(data);
      } catch (err) {
        setError(err.message || 'Could not load projects.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="min-h-full box-border p-6 text-[#202b3c]">
      {/* Header */}
      <header className="mb-6 flex items-center justify-between gap-5">
        <div>
          <p className="mb-2 text-[10px] font-bold tracking-[1.8px] text-slate-500">
            PORTFOLIO <span className="px-1 text-blue-600">/</span> PROJECTS
          </p>

          <h2 className="text-3xl font-semibold tracking-tight">
            Selected work<span className="text-blue-600">.</span>
          </h2>

          <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-500">
            A collection of things I've built and the technologies behind them.
          </p>
        </div>

        <div className="flex shrink-0 flex-col items-end">
          <span className="text-3xl font-semibold tabular-nums">
            {String(projects.length).padStart(2, '0')}
          </span>
          <span className="mt-1 text-[9px] tracking-[1.5px] text-slate-400">
            PROJECTS
          </span>
        </div>
      </header>

      {/* Toolbar */}
      <div className="mb-5 flex items-center justify-between border-y border-slate-200 py-3">
        <span className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-slate-600">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
          ALL PROJECTS
        </span>

        <span className="text-[9px] tracking-wider text-slate-400">
          SORTED BY <strong>ORDER</strong>
        </span>
      </div>

      {/* Loading, error, and empty states */}
      {loading && (
        <p className="py-6 text-sm text-slate-500">Loading projects...</p>
      )}

      {error && (
        <p className="rounded border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </p>
      )}

      {!loading && !error && projects.length === 0 && (
        <div className="py-12 text-center text-slate-500">
          <p className="text-lg font-medium">Nothing here yet</p>
          <p className="mt-2 text-sm">
            Projects will appear here once they're added.
          </p>
        </div>
      )}

      {/* Project cards */}
      {!loading && !error && projects.length > 0 && (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,255px),1fr))] items-start gap-5">
          {projects.map((project, index) => (
            <article
              key={project._id}
              className="group min-w-0 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-md"
            >
              {/* Image or placeholder */}
              <div className="relative h-36 overflow-hidden bg-slate-100">
                {project.imageUrl ? (
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="relative flex h-full items-center justify-center overflow-hidden bg-slate-100">
                    <div
                      className="absolute inset-0 opacity-40"
                      style={{
                        backgroundImage:
                          'linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(90deg, #cbd5e1 1px, transparent 1px)',
                        backgroundSize: '22px 22px',
                      }}
                    />

                    <div className="relative flex flex-col items-center gap-2">
                      <div className="grid h-12 w-12 place-items-center rounded-xl border border-white bg-white/80 text-2xl text-slate-600 shadow-sm">
                        ↗
                      </div>

                      <span className="text-[9px] font-bold tracking-[1.7px] text-slate-500">
                        PROJECT / {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                  </div>
                )}

                {project.featured && (
                  <span className="absolute left-3 top-3 rounded border border-white/80 bg-white/90 px-2 py-1.5 text-[9px] font-bold tracking-wider text-slate-700">
                    ✳ FEATURED
                  </span>
                )}
              </div>

              {/* Project information */}
              <div className="p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[9px] font-bold tracking-widest text-slate-400">
                    DEVELOPMENT
                  </span>

                  <span className="text-[10px] tabular-nums text-slate-400">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <h3 className="mb-2 break-words text-lg font-semibold tracking-tight text-slate-800">
                  {project.title}
                </h3>

                <p className="mb-5 min-h-[61px] text-xs leading-7 text-slate-500">
                  {project.description}
                </p>

                {/* Technology badges */}
                <div className="border-t border-slate-100 pt-3">
                  <p className="mb-2.5 text-[9px] font-bold tracking-widest text-slate-400">
                    BUILT WITH
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.techStack?.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex origin-center cursor-default items-center rounded border border-slate-200 bg-slate-50 px-2 py-1.5 text-[10px] font-semibold text-slate-600 transition-all duration-200 ease-out hover:z-10 hover:scale-110 hover:border-slate-400 hover:bg-slate-100 hover:text-slate-900 hover:shadow-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Optional project links */}
                {(project.githubUrl || project.liveUrl) && (
                  <div className="mt-4 flex flex-wrap gap-4 border-t border-slate-100 pt-3">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 transition-colors hover:text-blue-600"
                      >
                        GitHub <span>↗</span>
                      </a>
                    )}

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 transition-colors hover:text-blue-600"
                      >
                        Live demo <span>↗</span>
                      </a>
                    )}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Footer */}
      <footer className="mt-7 flex flex-wrap justify-between gap-3 border-t border-slate-200 pt-4 text-[9px] font-semibold tracking-wider text-slate-400">
        <span>END OF COLLECTION</span>
        <span>BUILT WITH CURIOSITY</span>
      </footer>
    </div>
  );
};

export default ProjectsApp;
