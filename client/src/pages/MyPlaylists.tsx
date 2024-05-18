import { useState, useEffect } from "react";
import { useGetPlaylistsMutation } from "../slices/playlistApiSlice";
import { useDeletePlaylistMutation } from "../slices/playlistApiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

//Components
import Playlist from "../components/Playlist";

type Track = {
  title: string;
  image: string;
  link: string;
  artists: [];
  duration: string;
  previewUrl: string;
  externalUrl: string;
};

type PlaylistType = {
  name: string;
  description: string;
  link: string;
  tracks: Track[];
  username: string;
};

const MyPlaylists = () => {
  const [playlists, setPlaylists] = useState<PlaylistType[]>([]);

  const [getPlaylists, { isLoading }] = useGetPlaylistsMutation();

  const [deletePlaylist] = useDeletePlaylistMutation();

  const getData = async () => {
    try {
      const data = await getPlaylists({}).unwrap();
      setPlaylists(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to get playlists");
    }
  };

  const handlePlaylistDelete = async (name: string) => {
    try {
      await deletePlaylist({ name }).unwrap();
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
          <FontAwesomeIcon
            className='spinner'
            icon={faSpinner}
            spin
            size='3x'
          />
        </div>
      ) : playlists.length > 0 ? (
        playlists.map((playlist, index) => {
          return (
            <Playlist
              key={index}
              playlist={playlist}
              handlePlaylistDelete={handlePlaylistDelete}
            />
          );
        })
      ) : (
        <h2>No playlists found</h2>
      )}
    </div>
  );
};

export default MyPlaylists;
