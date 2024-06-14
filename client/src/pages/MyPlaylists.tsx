import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  useGetPlaylistsMutation,
  useDeletePlaylistMutation,
  useSaveSpotifyPlaylistMutation,
} from "../slices/playlistApiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import { toast } from "react-toastify";

//Types
import type { Playlist, Track } from "../types";

const MyPlaylists = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  const [getPlaylists, { isLoading }] = useGetPlaylistsMutation();
  const [saveSpotifyPlaylist] = useSaveSpotifyPlaylistMutation();
  const [deletePlaylist] = useDeletePlaylistMutation();

  const getData = async () => {
    try {
      const data = await getPlaylists({}).unwrap();

      if (!data) {
        setPlaylists([]);
        return (
          <h2 className='font-semibold text-primaryDarl dark:text-primaryLight'>
            No playlists found
          </h2>
        );
      }
      setPlaylists(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to get playlists");
    }
  };

  const handlePlaylistDelete = async (id: string) => {
    try {
      await deletePlaylist({ id }).unwrap();
      await getData();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete playlist");
    }
  };

  const handleSpotfiySave = async (
    playlistName: string,
    playlistDescription: string,
    results: Track[]
  ) => {
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

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className='contaier mx-auto mt-12'>
      <div className='flex flex-col h-screen'>
        {isLoading ? (
          <div className='flex justify-center items-center mt-24'>
            <FontAwesomeIcon
              className='spinner text-primaryDark dark:text-primaryLight'
              icon={faSpinner}
              spin
            />
          </div>
        ) : (
          <table className='w-11/12 table-auto border-collapse mt-8 mx-auto rounded-xl overflow-hidden shadow p-8 text-primaryDark dark:text-primaryLight border-primaryDark dark:border-primaryLight border-opacity-50 transition hover:shadow-lg active:shadow-inner hover:border-opacity-100 active:border-opacity-100'>
            <thead>
              <tr className=''>
                <th className='text-center'>Name</th>
                <th className='text-center'>Description</th>
                <th className='text-center'>Save to Spotify</th>
                <th className='text-center'>Delete</th>
              </tr>
            </thead>
            {playlists.length > 0 ? (
              playlists.map((playlist, index) => {
                return (
                  <tr key={index} className='p-4'>
                    <td className='text-left'>
                      <Link
                        to={`/playlists/${playlist.id}`}
                        className='link dark:text-blue-400 dark:hover:text-blue-600'
                      >
                        {playlist.name}
                      </Link>
                    </td>
                    <td>
                      <p className='text-primaryDark dark:text-primaryLight'>
                        {playlist.description}
                      </p>
                    </td>
                    <td className=''>
                      <FontAwesomeIcon
                        className='h-8 text-green-500 hover:text-green-700 transition active:scale-50 active:text-green-700 hover:scale-125 cursor-pointer'
                        icon={faSpotify}
                        onClick={() =>
                          handleSpotfiySave(
                            playlist.name,
                            playlist.description,
                            playlist.songs
                          )
                        }
                        title='Save playlist to Spotify account'
                      />
                    </td>
                    <td className='text-center'>
                      <FontAwesomeIcon
                        onClick={() => handlePlaylistDelete(playlist.id)}
                        icon={faTrash}
                        className='h-8 cursor-pointer text-red-600 hover:text-red-400 hover:scale-125 active:scale-50 transition'
                      />
                    </td>
                  </tr>
                );
              })
            ) : (
              <h2 className='font-semibold text-primaryDark dark:text-primaryLight'>
                No playlists found
              </h2>
            )}
          </table>
        )}
      </div>
    </div>
  );
};
export default MyPlaylists;
