import { useState, useEffect } from "react";
import { useGetPlaylistsMutation } from "../slices/playlistApiSlice";
import { useDeletePlaylistMutation } from "../slices/playlistApiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

//Components
import PlaylistComponent from "../components/PlaylistComponent";

//Types
import type { Playlist } from "../types";

const MyPlaylists = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  const [getPlaylists, { isLoading }] = useGetPlaylistsMutation();

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
            <PlaylistComponent
              key={index}
              playlist={playlist}
              handlePlaylistDelete={handlePlaylistDelete}
            />
          );
        })
      ) : (
        <h2 className='font-bold mt-12'>No playlists found</h2>
      )}
    </div>
  );
};

export default MyPlaylists;
