import { useState } from "react";
import { useDispatch } from "react-redux";
import { setResults } from "../slices/resultsSlice";
import { useGetAiDataMutation } from "../slices/thirdPartyApiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

//Components
import SearchResults from "./SearchResults";

const Searchbar = () => {
  const [search, setSearch] = useState("");
  const [playlistLength, setPlaylistLength] = useState(10);

  const dispatch = useDispatch();

  const [getAiData, { isLoading }] = useGetAiDataMutation();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    getAndSetResults();
  };

  const handleClick = async () => {
    getAndSetResults();
  };

  const getAndSetResults = async () => {
    try {
      const res = await getAiData({
        input: search,
        length: playlistLength,
      }).unwrap();
      dispatch(setResults(res));
    } catch (error) {
      console.error(error);
      toast.error(
        "Error generating playlist: OpenAI Service Unavailable" +
          (error as Error).name,
        {
          position: "top-center",
        }
      );
    }
  };

  const genertateOptions = () => {
    const options = [];
    for (let i = 10; i <= 50; i += 10) {
      options.push(<option value={i}>{i}</option>);
    }
    return options;
  };

  return (
    <>
      <div className='flex-container-search'>
        <form className='searchbar' onSubmit={handleSubmit}>
          <input
            className='search-input'
            type='text'
            value={search}
            onChange={handleSearch}
            placeholder='Generate a playlist based on your prompt.'
          />
          <FontAwesomeIcon
            className='search-icon'
            icon={faMagnifyingGlass}
            onClick={handleClick}
          />
        </form>
        <form className='playlist-length-select'>
          <label>
            Playlist Length:
            <select
              name='length'
              className='playlist-length'
              value={playlistLength}
              onChange={(e) => setPlaylistLength(parseInt(e.target.value))}
            >
              {genertateOptions().map((option) => option)}
            </select>
          </label>
        </form>
      </div>
      <SearchResults loading={isLoading} />
    </>
  );
};

export default Searchbar;
