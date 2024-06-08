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
  const [error, setError] = useState<string>("");

  const { results } = useSelector((state: RootState) => state.results);
  const [createPlaylist, { isError }] = useCreatePlaylistMutation();
  const [saveSpotifyPlaylist] = useSaveSpotifyPlaylistMutation();

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

  const handleSpotfiySave = async () => {
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
        <div className='flex justify-center'>
          <form className='flex lg:w-1/4'>
            <input
              className='w-2/5 lg:w-full ml-2 lg:mr-2 p-2 border border-current border-opacity-50 rounded'
              type='text'
              placeholder='Playlist Name'
              required
              name={playlistName}
              id='playlistName'
              onChange={(e) => setPlaylistName(e.target.value)}
            />
            <input
              className='w-1/2 lg:w-full p-2 border border-current border-opacity-50 rounded'
              type='text'
              placeholder='Playlist Description'
              name={playlistDescription}
              id='playlistDescription'
              onChange={(e) => setPlaylistDescription(e.target.value)}
            />
          </form>
          <div className='flex items-center mr-4 lg:ml-8'>
            <FontAwesomeIcon
              className={
                error
                  ? "h-8 text-red-600 hover:text-red-800 transition cursor-pointer"
                  : "h-8 hover:text-green-600 transition cursor-pointer"
              }
              icon={faFloppyDisk}
              onClick={handleLocalSave}
              title='Save playlist to local user account'
            />
            <FontAwesomeIcon
              className={
                error
                  ? "h-8 mx-4 text-red-600 hover:text-red-800 transition cursor-pointer"
                  : "h-8 mx-4 hover:text-green-600 transition cursor-pointer"
              }
              icon={faSpotify}
              onClick={handleSpotfiySave}
              title='Save playlist to Spotify account'
            />
          </div>
        </div>
      )}
    </>
  );
};

export default PlaylistButtons;
