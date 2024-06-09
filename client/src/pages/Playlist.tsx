import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetPlaylistMutation } from "../slices/playlistApiSlice";

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
  console.log("PLAYLIST ID", id);

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
      <PlaylistComponent playlist={playlist} />
    </section>
  );
};

export default PlaylistPage;
