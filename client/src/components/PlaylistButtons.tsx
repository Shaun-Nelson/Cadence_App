import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  useCreatePlaylistMutation,
  useSaveSpotifyPlaylistMutation,
} from "../slices/playlistApiSlice";
import { RootState } from "../store";
import { toast } from "react-toastify";

const PlaylistButtons = () => {
  const [playlistName, setPlaylistName] = useState<string>("");
  const [playlistDescription, setPlaylistDescription] = useState<string>("");
  const namePlaceholder = "Playlist Name";
  const descriptionPlaceholder = "Playlist Description";
  const [error, setError] = useState<string>("");
  const [submitAction, setSubmitAction] = useState<string>("");

  const { results } = useSelector((state: RootState) => state.results);
  const [createPlaylist, { isError }] = useCreatePlaylistMutation();
  const [saveSpotifyPlaylist] = useSaveSpotifyPlaylistMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (submitAction === "localSave") {
      await handleLocalSave();
    } else if (submitAction === "spotifySave") {
      await handleSpotifySave();
    }
  };

  const handleLocalSave = async () => {
    try {
      const response = await createPlaylist({
        name: playlistName,
        description: playlistDescription,
        songs: results,
      });

      if (response.error) {
        setError("Error saving playlist. Please try again.");
        toast.error("Error saving playlist. Please try again.");
        return;
      }

      if (isError) {
        setError("Please log in to save playlist.");
        toast.error("Please log in to save playlist.");
        return;
      } else {
        setError("");
        toast.success("Playlist saved!");
      }
    } catch (err) {
      console.error(err);
      toast.error(error);
    }
  };

  const handleSpotifySave = async () => {
    try {
      await saveSpotifyPlaylist({
        name: playlistName,
        description: playlistDescription,
        songs: results,
      }).unwrap();
      toast.success("Playlist saved to Spotify!");
    } catch (error) {
      console.error(error);
      toast.error(
        "Error saving playlist to Spotify. Please connect via User Profile."
      );
    }
  };

  return (
    <>
      {results.length > 0 && (
        <div className='container mx-auto px-3 my-10'>
          <div className='flex justify-center'>
            <div className='flex flex-col p-6 w-fit bg-light-100 dark:bg-primaryDark border shadow-md rounded hover:shadow-lg dark:shadow-xl hover:dark:shadow-2xl active:shadow-inner border-opacity-50 active:border-opacity-100 transition'>
              <div className='flex justify-center items-center'>
                <form
                  className='flex flex-col'
                  onSubmit={(e) => handleSubmit(e)}
                >
                  <h3 className='text-xl mb-4 font-semibold text-slate-500 dark:text-slate-400'>
                    Save Playlist
                  </h3>
                  <div className='flex'>
                    <label htmlFor='playlistName' className='sr-only'>
                      Playlist Name
                    </label>
                    <input
                      className='w-1/2 mr-1 p-2 text-sm card-inner'
                      type='text'
                      placeholder={namePlaceholder}
                      required
                      name={playlistName}
                      id='playlistName'
                      alt='Playlist Name'
                      onChange={(e) => setPlaylistName(e.target.value)}
                    />
                    <label htmlFor='playlistDescription' className='sr-only'>
                      Playlist Description
                    </label>
                    <input
                      className='w-1/2 p-2 text-sm card-inner'
                      type='text'
                      placeholder={descriptionPlaceholder}
                      name={playlistDescription}
                      id='playlistDescription'
                      alt='Playlist Description'
                      onChange={(e) => setPlaylistDescription(e.target.value)}
                    />
                  </div>
                  <div className='flex mt-1'>
                    <div className='card-btn w-1/2 mr-1'>
                      <button
                        name='localSaveBtn'
                        type='submit'
                        onClick={() => setSubmitAction("localSave")}
                        className={
                          error
                            ? "text-red-600 hover:text-red-800 transition active:scale-50 hover:scale-125 cursor-pointer"
                            : "text-slate-400 lg:hover:text-slate-600 lg:dark:hover:text-slate-200 active:text-slate-600 dark:active:text-slate-200  active:scale-50 transition cursor-pointer"
                        }
                      >
                        <FontAwesomeIcon
                          icon={faFloppyDisk}
                          title='Save playlist to local user account'
                          className='cursor-pointer mr-2'
                        />
                        My Playlists
                      </button>
                    </div>
                    <div className='card-btn w-1/2'>
                      <button
                        name='spotifySaveBtn'
                        type='submit'
                        onClick={() => setSubmitAction("spotifySave")}
                        className={
                          error
                            ? "text-red-600 hover:text-red-800 transition active:scale-50 hover:scale-125 cursor-pointer"
                            : "text-slate-400 transition active:scale-50 lg:hover:text-slate-600 lg:dark:hover:text-slate-200 active:text-slate-600 dark:active:text-slate-200 cursor-pointer"
                        }
                      >
                        <FontAwesomeIcon
                          icon={faSpotify}
                          title='Save playlist to Spotify account'
                          className='cursor-pointer mr-2'
                        />
                        Save to Spotify
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PlaylistButtons;
