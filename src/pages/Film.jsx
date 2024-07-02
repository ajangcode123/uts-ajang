import { useState, useEffect } from "react";
import { Info, Edit, Trash, Plus, Heart } from "lucide-react";

const Film = () => {
  const defaultMovies = [
    {
      id: 1,
      title: "Inception",
      image:
        "https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p7825626_p_v8_ae.jpg",
      releaseYear: 2010,
      genre: "Sci-Fi",
      duration: "148",
      synopsis:
        "Seorang pencuri yang mencuri rahasia perusahaan melalui penggunaan teknologi berbagi mimpi diberi tugas sebaliknya yaitu menanamkan ide ke dalam pikiran seorang C.E.O..",
      liked: false,
    },
    {
      id: 2,
      title: "The Dark Knight",
      image:
        "https://images.moviesanywhere.com/bd47f9b7d090170d79b3085804075d41/c6140695-a35f-46e2-adb7-45ed829fc0c0.jpg",
      releaseYear: 2008,
      genre: "Action",
      duration: "152",
      synopsis:
        "When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham.",
      liked: false,
    },
    {
      id: 3,
      title: "Interstellar",
      image:
        "https://m.media-amazon.com/images/I/91JnoM0khKL._AC_UF894,1000_QL80_.jpg",
      releaseYear: 2014,
      genre: "Sci-Fi",
      duration: "169",
      synopsis:
        "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
      liked: false,
    },
    {
      id: 4,
      title: "Parasite",
      image:
        "https://m.media-amazon.com/images/M/MV5BYTIzY2QzY2YtZTk3Mi00ZGViLWJhMTQtN2ZjYzMwM2E3MTQ1XkEyXkFqcGdeQXVyMTEzMTI1Mjk3._V1_.jpg",
      releaseYear: 2019,
      genre: "Drama",
      duration: "132",
      synopsis:
        "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
      liked: false,
    },
  ];

  const [movies, setMovies] = useState([]);
  const [filter, setFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMovie, setCurrentMovie] = useState({
    id: "",
    title: "",
    image: "",
    releaseYear: "",
    genre: "",
    duration: "",
    synopsis: "",
    liked: false,
  });
  const [isEdit, setIsEdit] = useState(false);
  const [sortBy, setSortBy] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const storedMovies =
      JSON.parse(localStorage.getItem("movies")) || defaultMovies;
    setMovies(storedMovies);
    if (storedMovies.length === 0) {
      localStorage.setItem("movies", JSON.stringify(defaultMovies));
    }
  }, []);

  const handleAddMovie = () => {
    setIsEdit(false);
    setCurrentMovie({
      id: "",
      title: "",
      image: "",
      releaseYear: "",
      genre: "",
      duration: "",
      synopsis: "",
      liked: false,
    });
    setIsModalOpen(true);
  };

  const handleEditMovie = (id) => {
    const movieToEdit = movies.find((movie) => movie.id === id);
    setCurrentMovie(movieToEdit);
    setIsEdit(true);
    setIsModalOpen(true);
  };

  const handleDeleteMovie = (id) => {
    const updatedMovies = movies.filter((movie) => movie.id !== id);
    setMovies(updatedMovies);
    localStorage.setItem("movies", JSON.stringify(updatedMovies));
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = () => {
    const updatedMovies = isEdit
      ? movies.map((movie) =>
          movie.id === currentMovie.id ? currentMovie : movie
        )
      : [...movies, { ...currentMovie, id: Date.now() }];

    setMovies(updatedMovies);
    localStorage.setItem("movies", JSON.stringify(updatedMovies));
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentMovie({ ...currentMovie, [name]: value });
  };

  const handleSortChange = (event) => {
    const { value } = event.target;
    setSortBy(value);
  };

  const handleLikeMovie = (id) => {
    const updatedMovies = movies.map((movie) =>
      movie.id === id ? { ...movie, liked: !movie.liked } : movie
    );
    setMovies(updatedMovies);
    localStorage.setItem("movies", JSON.stringify(updatedMovies));
  };

  const sortedMovies = [...movies].sort((a, b) => {
    const compareValue =
      sortBy === "title"
        ? a.title.localeCompare(b.title)
        : a.releaseYear - b.releaseYear;
    return sortOrder === "asc" ? compareValue : -compareValue;
  });

  const filteredMovies = sortedMovies.filter(
    (movie) =>
      (filter ? movie.genre === filter : true) &&
      (searchQuery
        ? movie.title.toLowerCase().includes(searchQuery.toLowerCase())
        : true)
  );

  return (
    <div
      className="p-6 bg-cover bg-center min-h-screen flex flex-col"
      style={{ backgroundImage: "url('bg.jpg')" }}
    >
      <h1 className="text-3xl font-bold mb-6 text-center text-white">
        Daftar Film
      </h1>
      <div className="flex flex-wrap justify-between items-center mb-6">
        <div className="flex items-center mb-4 md:mb-0">
          <label className="mr-2 text-white">Filter by genre:</label>
          <select
            onChange={handleFilterChange}
            className="border p-2 rounded mr-4"
          >
            <option value="">All</option>
            <option value="Action">Action</option>
            <option value="Comedy">Comedy</option>
            <option value="Drama">Drama</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Horror">Horror</option>
            <option value="Romance">Romance</option>
            <option value="Sci-Fi">Sci-Fi</option>
            <option value="Thriller">Thriller</option>
          </select>
          <label className="mr-2 text-white">Sort by:</label>
          <select
            value={sortBy}
            onChange={handleSortChange}
            className="border p-2 rounded mr-2"
          >
            <option value="title">Title</option>
            <option value="releaseYear">Release Year</option>
          </select>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
        <div className="flex items-center mb-4 md:mb-0">
          <label className="mr-2 text-white">Search:</label>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            className="border p-2 rounded mr-4"
            placeholder="Search movies..."
          />
          <button
            onClick={handleAddMovie}
            className="bg-red-500 text-white p-2 rounded hover:bg-red-600 flex items-center"
          >
            <Plus className="mr-2" /> Add Movie
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {filteredMovies.map((movie) => (
    <div
      className="bg-white border rounded-lg overflow-hidden shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl w-full"
      key={movie.id}
    >
      <div className="bg-gray-100 p-4 h-full flex flex-col justify-between">
        <div className="mb-4">
          <img
            src={movie.image}
            alt={movie.title}
            className="w-full h-48 object-cover mb-4"
          />
          <h2 className="text-xl font-bold mb-2">{movie.title}</h2>
          <p className="text-gray-700">
            Release Year: {movie.releaseYear}
          </p>
        </div>
              <div className="flex justify-center space-x-4 mt-4">
                <button
                  onClick={() =>
                    alert(
                      `Title: ${movie.title}\nGenre: ${movie.genre}\nDuration: ${movie.duration} Min\nSynopsis: ${movie.synopsis}`
                    )
                  }
                  className="text-blue-500 hover:text-blue-600"
                >
                  <Info />
                </button>
                <button
                  onClick={() => handleEditMovie(movie.id)}
                  className="text-yellow-500 hover:text-yellow-600"
                >
                  <Edit />
                </button>
                <button
                  onClick={() => handleDeleteMovie(movie.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  <Trash />
                </button>
                <button
                  onClick={() => handleLikeMovie(movie.id)}
                  className={`${
                    movie.liked ? "text-red-500 " : "text-grey"
                  } hover:text-red-600 fill-red`}
                >
                  <Heart/>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96 max-h-full overflow-y-auto">
            <h2 className="text-2xl mb-4 text-red-800">
              {isEdit ? "Edit Movie" : "Add Movie"}
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="max-h-96 overflow-y-auto"
            >
              <label className="block mb-2 text-red-800">Title:</label>
              <input
                type="text"
                name="title"
                value={currentMovie.title}
                onChange={handleChange}
                className="border p-2 rounded w-full mb-4"
                required
              />
              <label className="block mb-2 text-red-800">Release Year:</label>
              <input
                type="text"
                name="releaseYear"
                value={currentMovie.releaseYear}
                onChange={handleChange}
                className="border p-2 rounded w-full mb-4"
                required
              />
              <label className="block mb-2 text-red-800">Genre:</label>
              <select
                name="genre"
                value={currentMovie.genre}
                onChange={handleChange}
                className="border p-2 rounded w-full mb-4"
                required
              >
                <option value="">Select Genre</option>
                <option value="Action">Action</option>
                <option value="Comedy">Comedy</option>
                <option value="Drama">Drama</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Horror">Horror</option>
                <option value="Romance">Romance</option>
                <option value="Sci-Fi">Sci-Fi</option>
                <option value="Thriller">Thriller</option>
              </select>
              <label className="block mb-2 text-red-800">Image URL:</label>
              <input
                type="text"
                name="image"
                value={currentMovie.image}
                onChange={handleChange}
                className="border p-2 rounded w-full mb-4"
                required
              />
              <label className="block mb-2 text-red-800">Duration:</label>
              <input
                type="text"
                name="duration"
                value={currentMovie.duration}
                onChange={handleChange}
                className="border p-2 rounded w-full mb-4"
                required
              />
              <label className="block mb-2 text-red-800">Synopsis:</label>
              <textarea
                name="synopsis"
                value={currentMovie.synopsis}
                onChange={handleChange}
                className="border p-2 rounded w-full mb-4"
                required
                style={{ maxHeight: "150px" }}
              ></textarea>
              <div className="flex justify-end space-x-4">
                <button
                  type="submit"
                  className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                >
                  {isEdit ? "Save Changes" : "Add Movie"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Film;
