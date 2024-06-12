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
        return <h2>No playlists found</h2>;
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
    <div className='flex-container-column '>
      {isLoading ? (
        <div className='flex-container-spinner'>
          <FontAwesomeIcon className='spinner' icon={faSpinner} spin />
        </div>
      ) : playlists.length > 0 ? (
        playlists.map((playlist, index) => {
          return (
            <ol className='container mt-8 list-disc' key={index}>
              <div key={playlist.id}>
                <Link to={`/playlists/${playlist.id}`} className='inline mr-4'>
                  {playlist.name}
                </Link>
                <FontAwesomeIcon
                  className='h-6 mx-4 text-green-500 hover:text-green-700 transition active:scale-50 active:text-green-700 hover:scale-125 cursor-pointer'
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
                <FontAwesomeIcon
                  onClick={() => handlePlaylistDelete(playlist.id)}
                  icon={faTrash}
                  className='h-6 mx-4 cursor-pointer text-red-600 hover:text-red-400 hover:scale-125 active:scale-50 transition'
                />
                <p>{playlist.description}</p>
              </div>
            </ol>
          );
        })
      ) : (
        <h2>No playlists found</h2>
      )}
    </div>
  );
};

export default MyPlaylists;
