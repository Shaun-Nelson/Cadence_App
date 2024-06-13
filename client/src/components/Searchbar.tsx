import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setResults } from "../slices/resultsSlice";
import { useGetAiDataMutation } from "../slices/thirdPartyApiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { RootState } from "../store";

//Components
import SearchResults from "./SearchResults";

//Types
import type { Track } from "../types";

const generateOptionsConfig = {
  MIN_LENGTH: 10,
  MAX_LENGTH: 50,
  STEP: 10,
};

interface GenerateOptionsConfig {
  MIN_LENGTH: number;
  MAX_LENGTH: number;
  STEP: number;
}

const genertateOptions = (config: GenerateOptionsConfig): JSX.Element[] => {
  const { MIN_LENGTH, MAX_LENGTH, STEP } = config;
  const options: JSX.Element[] = [];
  for (let i = MIN_LENGTH; i <= MAX_LENGTH; i += STEP) {
    options.push(
      <option key={i} value={i} className='bg-transparent'>
        {i}
      </option>
    );
  }
  return options;
};

const Searchbar = () => {
  const [search, setSearch] = useState<string>("");
  const [playlistLength, setPlaylistLength] = useState<number>(
    generateOptionsConfig.MIN_LENGTH
  );
  const [options] = useState<JSX.Element[]>(
    genertateOptions(generateOptionsConfig)
  );

  const dispatch = useDispatch();
  const { results } = useSelector((state: RootState) => state.results);
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
    if (isLoading) return;
    try {
      const res: Track[] = await getAiData({
        input: search,
        length: playlistLength,
      }).unwrap();
      dispatch(setResults(res));
    } catch (error) {
      console.error(error);
      toast.error("Error generating playlist: AI Service Unavailable");
    }
  };

  useEffect(() => {
    setResults(results ?? []);
  }, [results]);

  return (
    <>
      <main className='flex flex-col items-center pt-16 h-screen w-screen bg-primaryLight dark:bg-primaryDark'>
        <form
          className='flex items-center justify-around p-2 mx-10 rounded border border-primaryDark dark:border:primaryLight border-opacity-50 shadow-md w-11/12 lg:w-1/2'
          onSubmit={handleSubmit}
        >
          <input
            className='w-11/12 p-2 text-sm bg-transparent border-none focus:outline-none focus:ring-2 focus:border-transparent focus:ring-secondayDark dark:focus:ring-secondaryLight transition cursor-pointer'
            type='text'
            value={search}
            onChange={handleSearch}
            placeholder='Generate a playlist based on your prompt.'
          />
          <FontAwesomeIcon
            className='cursor-pointer transition hover:text-secondaryDark hover:scale-125 active:scale-50'
            icon={faMagnifyingGlass}
            onClick={handleClick}
          />
        </form>
        <form className='mt-6'>
          <label>
            Playlist Length:
            <select
              name='length'
              className='ml-2'
              value={playlistLength}
              onChange={(e) => setPlaylistLength(parseInt(e.target.value))}
            >
              {options.map((option) => option)}
            </select>
          </label>
        </form>
        <SearchResults loading={isLoading} />
      </main>
    </>
  );
};

export default Searchbar;
