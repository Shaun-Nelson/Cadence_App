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
        <>
          <div className='flex justify-center items-center'>
            <form className='flex' onSubmit={(e) => handleSubmit(e)}>
              <label htmlFor='playlistName' className='sr-only'>
                Playlist Name
              </label>
              <input
                className='w-2/5 lg:w-full ml-2 mr-1 lg:mr-2 p-2 text-sm border border-current border-opacity-50 rounded focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition cursor-pointer'
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
                className='w-1/2 lg:w-full p-2 text-sm border border-current border-opacity-50 rounded focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition cursor-pointer'
                type='text'
                placeholder={descriptionPlaceholder}
                name={playlistDescription}
                id='playlistDescription'
                alt='Playlist Description'
                onChange={(e) => setPlaylistDescription(e.target.value)}
              />
              <div className='flex items-center ml-4'>
                <button
                  name='localSaveBtn'
                  type='submit'
                  onClick={() => setSubmitAction("localSave")}
                >
                  <FontAwesomeIcon
                    className={
                      error
                        ? "h-8 text-red-600 hover:text-red-800 transition active:scale-50 hover:scale-125 cursor-pointer"
                        : "h-8 transition hover:text-green-700 hover:scale-125 focus:scale-75 active:text-green-700 active:scale-50 cursor-pointer"
                    }
                    icon={faFloppyDisk}
                    title='Save playlist to local user account'
                  />
                </button>
                <button
                  name='spotifySaveBtn'
                  type='submit'
                  onClick={() => setSubmitAction("spotifySave")}
                >
                  <FontAwesomeIcon
                    className={
                      error
                        ? "h-8 mx-4 text-red-600 hover:text-red-800 transition active:scale-50 hover:scale-125 cursor-pointer"
                        : "h-8 mx-4 hover:text-green-700 transition active:scale-50 active:text-green-700 hover:scale-125 cursor-pointer"
                    }
                    icon={faSpotify}
                    title='Save playlist to Spotify account'
                  />
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default PlaylistButtons;
