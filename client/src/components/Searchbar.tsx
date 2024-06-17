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

enum PlaylistLengthConfig {
  MIN_LENGTH = 10,
  MAX_LENGTH = 75,
  STEP = 25,
}

const Searchbar = () => {
  const [search, setSearch] = useState<string>("");
  const [playlistLength, setPlaylistLength] = useState<number>(
    PlaylistLengthConfig.MIN_LENGTH
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
      <section className='flex flex-col items-center pt-16 h-full bg-light-200 dark:bg-dark-600'>
        <form
          className='flex items-center justify-between rounded-full border border-primaryDark dark:border-primaryLight border-opacity-50 shadow-inner w-full lg:w-3/5'
          onSubmit={handleSubmit}
        >
          <input
            className='w-full mx-2 p-2 text-sm dark:text-primaryLight bg-transparent border-none focus:outline-none transition cursor-pointer'
            type='text'
            value={search}
            onChange={handleSearch}
            placeholder='Generate a playlist based on your prompt.'
          />
          <button
            className='shadow-md rounded-r-full active:shadow-inner p-4 bg-primaryLight dark:bg-primaryDark'
            onClick={handleClick}
          >
            <FontAwesomeIcon
              className='ml-1 cursor-pointer transition text-primaryDark hover:text-secondaryDark dark:text-primaryLight dark:hover:text-secondaryLight lg:hover:scale-125 active:scale-50'
              icon={faMagnifyingGlass}
              size='xl'
            />
          </button>
        </form>
        <form className='mt-4'>
          <label className='text-slate-600 dark:text-slate-300'>
            Playlist Length:
            <select
              name='length'
              className='ml-2 text-slate-400 bg-transparent cursor-pointer'
              value={playlistLength}
              onChange={(e) => setPlaylistLength(parseInt(e.target.value))}
            >
              <option className='text-primaryDark dark:text-primaryLight bg-primaryLight dark:bg-primaryDark cursor-pointer'>
                10
              </option>
              <option className='text-primaryDark dark:text-primaryLight bg-primaryLight dark:bg-primaryDark cursor-pointer'>
                25
              </option>
              <option className='text-primaryDark dark:text-primaryLight bg-primaryLight dark:bg-primaryDark cursor-pointer'>
                50
              </option>
              <option className='text-primaryDark dark:text-primaryLight bg-primaryLight dark:bg-primaryDark cursor-pointer'>
                75
              </option>
            </select>
          </label>
        </form>
      </section>
      <SearchResults loading={isLoading} />
    </>
  );
};

export default Searchbar;
