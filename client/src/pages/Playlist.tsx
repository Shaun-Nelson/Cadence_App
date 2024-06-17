import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetPlaylistMutation } from "../slices/playlistApiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

//Components
import PlaylistComponent from "../components/PlaylistComponent";
//Types
import type { Playlist } from "../types";

const PlaylistPage = () => {
  const [playlist, setPlaylist] = useState<Playlist>({
    id: "",
    name: "",
    description: "",
    link: "",
    songs: [],
  });
  const { id } = useParams<{ id: string }>();

  const [getPlaylist] = useGetPlaylistMutation();

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const playlist = await getPlaylist(id).unwrap();
        setPlaylist(playlist);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPlaylist();
  }, [id, getPlaylist]);

  return (
    <section>
      <div className='flex flex-col'>
        <Link to='/playlists' className='mt-4'>
          <FontAwesomeIcon
            icon={faArrowLeft}
            className='h-8 text-primaryDark dark:text-primaryLight'
          />
        </Link>
        <PlaylistComponent playlist={playlist} />
      </div>
    </section>
  );
};

export default PlaylistPage;
