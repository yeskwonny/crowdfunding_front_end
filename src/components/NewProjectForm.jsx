function NewProjectForm() {
  return (
    <div>
      <form>
        <div className="movie-basic">
          <label htmlFor="title">Title</label>
          <input type="text" id="title"></input>
          <label htmlFor="director">Director</label>
          <input type="text" id="director"></input>
        </div>
        <div className="movie-detail">
          <label htmlFor="generes">Generes</label>
          <input type="generes" id="generes"></input>
          <label htmlFor="synopsis">Movie Synopsis</label>
          <input type="text" id="synopsis"></input>
        </div>
        <div className="movie-target">
          <label htmlFor="target">Your target</label>
          <input type="number" id="target"></input>
          <label htmlFor="target-date">target date</label>
          <input type="date" id="targetDate"></input>
        </div>
        <button>Create a project</button>
      </form>
    </div>
  );
}

export default NewProjectForm;
