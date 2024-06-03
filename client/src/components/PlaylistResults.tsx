import { useSelector } from "react-redux";
import { RootState } from "../store";
// Components
import PlaylistComponent from "./PlaylistComponent";
// Types
import type { Playlist } from "../types";

const PlaylistResults = () => {
  const { results } = useSelector((state: RootState) => state.results);
  const playlist: Playlist = {
    id: "",
    name: "",
    description: "",
    link: "",
    songs: results,
  };

  return (
    <>{results?.length > 0 && <PlaylistComponent playlist={playlist} />}</>
  );
};

export default PlaylistResults;
