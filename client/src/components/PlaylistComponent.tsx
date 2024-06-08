import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Components
import PlaylistTrack from "./PlaylistTrackMobile";

// Types
import type { Playlist, Track } from "../types";

interface PlaylistProps {
  playlist: Playlist;
  handlePlaylistDelete?: (id: string) => void;
}

const Playlist = ({ playlist, handlePlaylistDelete }: PlaylistProps) => {
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
      <div className='container-sm mx-auto mt-6 p-3'>
        {playlist.songs.length > 0
          ? playlist.songs.map((track: Track, index: number) => {
              return (
                <div>
                  <PlaylistTrack key={index} track={track} />
                  <hr />
                </div>
              );
            })
          : null}
      </div>
    </>
  );
};

export default Playlist;
