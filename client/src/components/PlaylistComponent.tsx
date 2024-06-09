import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCookies } from "react-cookie";

// Components
import PlaylistTrack from "./PlaylistTrack";
import SpotifyPlayer from "./SpotifyPlayer";

// Types
import type { Playlist, Track } from "../types";

interface PlaylistProps {
  playlist: Playlist;
  handlePlaylistDelete?: (id: string) => void;
}

const Playlist = ({ playlist, handlePlaylistDelete }: PlaylistProps) => {
  const [cookies] = useCookies(["refresh_token"]);
  return (
    <>
      {handlePlaylistDelete && (
        <div>
          <h2>{playlist.name}</h2>
          <p>{playlist.description}</p>
          <a href={playlist.link} target='_blank' rel='noreferrer'>
            Spotify Playlist
          </a>
          <FontAwesomeIcon
            onClick={() => handlePlaylistDelete(playlist.id)}
            icon={faTrash}
          />
        </div>
      )}
      <div className='container lg:w-1/3 mx-auto mt-6 p-3'>
        {cookies.refresh_token && playlist.songs.length > 0 ? (
          <div className='pt-4 pb-10'>
            <hr className='mb-10' />
            <SpotifyPlayer />
            <hr className='mt-10' />
          </div>
        ) : (
          <span className='font-semibold mb-4'>
            (Login to Spotify to play full songs)
          </span>
        )}
        {playlist.songs.length > 0
          ? playlist.songs.map((track: Track, index: number) => {
              return (
                <div>
                  <PlaylistTrack key={index} track={track} />
                  {index != playlist.songs.length - 1 && <hr />}
                </div>
              );
            })
          : null}
      </div>
    </>
  );
};

export default Playlist;
