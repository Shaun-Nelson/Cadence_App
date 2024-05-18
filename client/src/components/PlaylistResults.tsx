import { useSelector } from "react-redux";
import { RootState } from "../store";
// Components
import Playlist from "./Playlist";

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
};

const PlaylistResults = () => {
  const { results } = useSelector((state: RootState) => state.results);
  const playlist: PlaylistType = {
    name: "",
    description: "",
    link: "",
    tracks: results,
  };

  return <>{results?.length > 0 && <Playlist playlist={playlist} />}</>;
};

export default PlaylistResults;
